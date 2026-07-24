/**
 * Progressive Web App Service Worker Registration Helper
 */

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ [PWA] Service Worker registrado com sucesso:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('🔄 [PWA] Nova versão disponível. Atualize a página para obter os conteúdos mais recentes.');
                  } else {
                    console.log('⚡ [PWA] Aplicação pronta para navegação Offline!');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('⚠️ [PWA] Falha ao registrar Service Worker:', error);
        });
    });
  }
}
