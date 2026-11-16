package app.ovelhinha.historias;

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Ecrã de ponta a ponta também nas versões antigas do Android (o Android 15+ já o faz sozinho).
        // A app gira livremente: em pé mostra uma página, deitada mostra o livro aberto.
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        // O tamanho de letra do sistema não muda o desenho das páginas: a app já ajusta a letra
        // ao ecrã, e com o zoom do Android os títulos das capas saíam para fora.
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().getSettings().setTextZoom(100);
        }
    }
}
