#!/usr/bin/env bash
# Gera o app de iPhone e iPad, deixa a Apple assinar na nuvem e envia para o App Store Connect (TestFlight).
#   bash scripts/ios-enviar.sh            precisa de ASC_KEY_ID e ASC_ISSUER_ID, e de OV_TEAM_ID, OV_APP_ID e
#                                         ASC_KEY_PATH, que o "node scripts/apple.mjs preparar" já deixa prontos
#   bash scripts/ios-enviar.sh conferir   só compila para o simulador, sem chaves (confere se o app compila)
set -euo pipefail
cd "$(dirname "$0")/../ios/App"

VERSION=$(node -p "require('../../config.json').version")
BUILD_NUMBER=${BUILD_NUMBER:-1}
OUT="${RUNNER_TEMP:-/tmp}/ovelhinha-ios"
LOG="$OUT/xcodebuild.log"
mkdir -p "$OUT"

# transforma os erros mais comuns da Apple em avisos em português
explain() {
  local log="$1"
  grep -q "Maximum number of certificates" "$log" && echo "::error::Sua conta da Apple chegou ao limite de certificados de distribuição. Em developer.apple.com > Certificates, revogue um certificado antigo do tipo Distribution e rode de novo."
  grep -qiE "Cloud signing permission|not permitted to|insufficient|FORBIDDEN" "$log" && echo "::error::A chave de API não tem permissão para assinar. Ela precisa do acesso Admin (App Store Connect > Usuários e acesso > Integrações)."
  grep -qiE "No profiles for|No Accounts|requires a provisioning profile" "$log" && echo "::error::A Apple não conseguiu criar o perfil de assinatura. Confira se o ID app.ovelhinha.historias está registrado e se a chave tem acesso Admin."
  grep -qiE "bundle version must be higher|has already been used|DUPLICATE" "$log" && echo "::error::Esse número de versão já foi enviado. Rode o processo de novo: o número sobe sozinho."
  grep -qiE "agreement|PLA Update" "$log" && echo "::error::Falta aceitar um contrato no App Store Connect. Entre em Contratos, aceite e rode de novo."
  return 0
}

# xcodebuild com registro; se a plataforma iOS não estiver instalada no Mac da nuvem, baixa e tenta de novo
xb() {
  if xcodebuild "$@" >"$LOG" 2>&1; then tail -n 5 "$LOG"; return 0; fi
  if grep -q "is not installed" "$LOG"; then
    echo "Baixando a plataforma iOS do Xcode..."
    xcodebuild -downloadPlatform iOS
    if xcodebuild "$@" >"$LOG" 2>&1; then tail -n 5 "$LOG"; return 0; fi
  fi
  tail -n 80 "$LOG"; explain "$LOG"; return 1
}

if [ "${1:-}" = "conferir" ]; then
  xb -project App.xcodeproj -scheme App -configuration Debug -sdk iphonesimulator \
     -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
  echo "O app compilou para o simulador."
  exit 0
fi

: "${ASC_KEY_ID:?Falta o segredo ASC_KEY_ID}"
: "${ASC_ISSUER_ID:?Falta o segredo ASC_ISSUER_ID}"
: "${ASC_KEY_PATH:?Rode antes: node scripts/apple.mjs preparar}"
: "${OV_TEAM_ID:?Rode antes: node scripts/apple.mjs preparar}"
AUTH=(-allowProvisioningUpdates -authenticationKeyPath "$ASC_KEY_PATH" -authenticationKeyID "$ASC_KEY_ID" -authenticationKeyIssuerID "$ASC_ISSUER_ID")

echo "1/3 Montando o app (versão $VERSION, build $BUILD_NUMBER)..."
xb -project App.xcodeproj -scheme App -configuration Release -destination 'generic/platform=iOS' \
   -archivePath "$OUT/App.xcarchive" archive CODE_SIGNING_ALLOWED=NO \
   MARKETING_VERSION="$VERSION" CURRENT_PROJECT_VERSION="$BUILD_NUMBER" DEVELOPMENT_TEAM="$OV_TEAM_ID"

options() { # $1 = nome do arquivo, $2 = upload | export
  cat >"$OUT/$1.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>method</key><string>app-store-connect</string>
  <key>destination</key><string>$2</string>
  <key>teamID</key><string>$OV_TEAM_ID</string>
  <key>signingStyle</key><string>automatic</string>
  <key>uploadSymbols</key><true/>
  <key>manageAppVersionAndBuildNumber</key><false/>
</dict></plist>
PLIST
}

echo "2/3 A Apple assina o app na nuvem e ele é enviado..."
options upload upload
if xb -exportArchive -archivePath "$OUT/App.xcarchive" -exportOptionsPlist "$OUT/upload.plist" -exportPath "$OUT/upload" "${AUTH[@]}"; then
  echo "3/3 Enviado! Em 20 a 40 minutos a versão $VERSION ($BUILD_NUMBER) aparece no TestFlight." | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}"
  exit 0
fi

echo "O envio direto não deu certo; gerando o arquivo .ipa para enviar pelo altool..."
options ipa export
xb -exportArchive -archivePath "$OUT/App.xcarchive" -exportOptionsPlist "$OUT/ipa.plist" -exportPath "$OUT/ipa" "${AUTH[@]}"
IPA=$(find "$OUT/ipa" -maxdepth 1 -name '*.ipa' | head -n 1)
[ -n "$IPA" ] || { echo "::error::O arquivo .ipa não foi gerado."; exit 1; }
if ! xcrun altool --upload-app --type ios --file "$IPA" --apiKey "$ASC_KEY_ID" --apiIssuer "$ASC_ISSUER_ID" ${OV_APP_ID:+--apple-id "$OV_APP_ID"} >"$OUT/altool.log" 2>&1 \
   || ! grep -qiE "UPLOAD SUCCEEDED|No errors uploading" "$OUT/altool.log"; then
  cat "$OUT/altool.log"; explain "$OUT/altool.log"; exit 1
fi
echo "3/3 Enviado! Em 20 a 40 minutos a versão $VERSION ($BUILD_NUMBER) aparece no TestFlight." | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}"
