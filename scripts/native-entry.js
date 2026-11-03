// Ponte entre o app e o aparelho (só existe na versão de iPhone/Android).
// O esbuild junta tudo em dist/native/js/native.js; o motor dos livros usa window.OvNative.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NativePurchases } from '@capgo/native-purchases';

if (Capacitor.isNativePlatform()) {
  window.OvNative = {
    platform: Capacitor.getPlatform(),
    App, Haptics, ImpactStyle, SplashScreen, StatusBar, Style, NativePurchases
  };
}
