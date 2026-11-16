package app.ovelhinha.historias;

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Primeiro o Capacitor troca o tema do arranque pelo tema da app (sem barra de título).
        super.onCreate(savedInstanceState);
        // Só depois: ecrã de ponta a ponta também nas versões antigas do Android.
        // (Chamado antes do super.onCreate, a janela ficava com o tema do arranque e aparecia
        // uma barra «Ovelhinha» com a imagem de abertura no topo.)
        EdgeToEdge.enable(this);
        if (getSupportActionBar() != null) getSupportActionBar().hide();
        // A app gira livremente: em pé mostra uma página, deitada mostra o livro aberto.
        // O tamanho de letra do sistema não muda o desenho das páginas (a app já ajusta a letra ao ecrã).
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().getSettings().setTextZoom(100);
        }
    }
}
