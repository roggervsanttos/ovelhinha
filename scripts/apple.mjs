// Prepara o envio para a Apple (usado pelo processo "iPhone e iPad" do GitHub Actions):
//   node scripts/apple.mjs preparar
// 1. confere os segredos ASC_KEY_ID, ASC_ISSUER_ID e ASC_KEY_P8 (e APPLE_TEAM_ID, se houver);
// 2. grava a chave .p8 onde o xcodebuild e o altool procuram;
// 3. registra o ID do app (app.ovelhinha.historias) na Apple, se ainda não existir;
// 4. confere se o app já foi criado no App Store Connect;
// 5. passa OV_TEAM_ID, OV_APP_ID e ASC_KEY_PATH para os próximos passos (GITHUB_ENV).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

const cfg = JSON.parse(fs.readFileSync(new URL('../config.json', import.meta.url), 'utf8'));
const BUNDLE = cfg.appId;
const API = process.env.ASC_API_URL || 'https://api.appstoreconnect.apple.com';

function fail(msg) { console.log(`::error::${msg}`); process.exit(1); }
const env = k => (process.env[k] || '').trim();

if (process.argv[2] !== 'preparar') {
  console.log('Uso: node scripts/apple.mjs preparar');
  process.exit(2);
}

/* ---------- 1. segredos ---------- */
const keyId = env('ASC_KEY_ID'), issuer = env('ASC_ISSUER_ID');
let p8 = (process.env.ASC_KEY_P8 || '').replace(/\\n/g, '\n').replace(/\r/g, '').trim();
if (!/^[A-Z0-9]{10}$/.test(keyId)) fail('O segredo ASC_KEY_ID deve ter 10 letras maiúsculas e números: é o Key ID da chave da Apple.');
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(issuer)) fail('O segredo ASC_ISSUER_ID deve ser o Issuer ID, no formato 1a2b3c4d-1234-5678-9abc-1234567890ab.');
if (!p8.includes('BEGIN PRIVATE KEY') || !p8.includes('END PRIVATE KEY')) fail('O segredo ASC_KEY_P8 deve ter o conteúdo inteiro do arquivo .p8, com as linhas BEGIN PRIVATE KEY e END PRIVATE KEY.');
let key;
try { key = crypto.createPrivateKey(p8); } catch (e) { fail('Não consegui ler a chave do segredo ASC_KEY_P8. Abra o arquivo .p8 num editor de texto e cole tudo de novo no segredo.'); }

/* ---------- 2. chave no lugar que o Xcode procura ---------- */
const dir = path.join(os.homedir(), '.appstoreconnect', 'private_keys');
fs.mkdirSync(dir, { recursive: true });
const keyPath = path.join(dir, `AuthKey_${keyId}.p8`);
fs.writeFileSync(keyPath, p8 + '\n', { mode: 0o600 });

/* ---------- conversa com a API do App Store Connect ---------- */
function token() {
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'ES256', kid: keyId, typ: 'JWT' });
  const body = b64({ iss: issuer, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' });
  const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key, dsaEncoding: 'ieee-p1363' }).toString('base64url');
  return `${head}.${body}.${sig}`;
}
async function api(method, p, body) {
  let r;
  try {
    r = await fetch(API + p, { method, headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  } catch (e) { fail(`Não consegui falar com a Apple (${e.message}). Rode o processo de novo daqui a pouco.`); }
  const txt = await r.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch (e) { }
  if (r.status === 401) fail('A Apple recusou a chave (erro 401). Confira os segredos ASC_KEY_ID, ASC_ISSUER_ID e ASC_KEY_P8: os três têm de ser da mesma chave.');
  if (r.status === 403) fail('A chave não tem permissão (erro 403). Crie a chave com acesso Admin e aceite os contratos pendentes no App Store Connect (Contratos).');
  if (!r.ok) {
    const why = data && data.errors ? data.errors.map(e => e.detail || e.title).join(' ') : txt.slice(0, 300);
    fail(`A Apple respondeu com o erro ${r.status}: ${why}`);
  }
  return data;
}

/* ---------- 3. ID do app ---------- */
const found = await api('GET', `/v1/bundleIds?filter[identifier]=${encodeURIComponent(BUNDLE)}&limit=20`);
let bundle = (found.data || []).find(b => b.attributes && b.attributes.identifier === BUNDLE);
if (!bundle) {
  console.log(`Registrando o ID ${BUNDLE} na Apple...`);
  bundle = (await api('POST', '/v1/bundleIds', { data: { type: 'bundleIds', attributes: { identifier: BUNDLE, name: cfg.appName, platform: 'IOS' } } })).data;
} else console.log(`O ID ${BUNDLE} já está registrado.`);

const team = env('APPLE_TEAM_ID') || (bundle.attributes && bundle.attributes.seedId) || '';
if (!/^[A-Z0-9]{10}$/.test(team)) fail('Não achei o Team ID da sua conta. Crie o segredo APPLE_TEAM_ID com o ID que aparece em developer.apple.com > Account > Membership.');

/* ---------- 4. o app no App Store Connect ---------- */
const apps = await api('GET', `/v1/apps?filter[bundleId]=${encodeURIComponent(BUNDLE)}&limit=5`);
const app = (apps.data || []).find(a => a.attributes && a.attributes.bundleId === BUNDLE);
if (!app) fail(`Falta criar o app no App Store Connect. Abra appstoreconnect.apple.com > Apps > + > Novo app: plataforma iOS, nome "${cfg.fullName}", idioma Português (Brasil), ID do pacote ${BUNDLE}, SKU ovelhinha. Depois rode este processo de novo.`);

/* ---------- 5. para os próximos passos ---------- */
const out = [`OV_TEAM_ID=${team}`, `OV_APP_ID=${app.id}`, `ASC_KEY_PATH=${keyPath}`];
if (process.env.GITHUB_ENV) fs.appendFileSync(process.env.GITHUB_ENV, out.join('\n') + '\n');
else console.log(out.join('\n'));
console.log(`Pronto: time ${team}, app ${app.id} (${app.attributes.name || cfg.fullName}).`);
