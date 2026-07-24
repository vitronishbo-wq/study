/**
 * Progressive Web App & Service Worker Registration Helper
 * Gerencia a lógica de Cache Storage e integração Workbox para a KnowledgeBase e assets offline.
 */

import { KnowledgeBase } from './data/KnowledgeBase';

export const CACHE_NAME_KNOWLEDGE_BASE = 'kb-data-v1';
export const CACHE_NAME_ASSETS = 'minint-prep-v2';

/**
 * Pré-carrega e persiste todos os dados estruturados da KnowledgeBase no Cache Storage
 * utilizando a estratégia Stale-While-Revalidate do Workbox/Cache API.
 */
export async function preCacheKnowledgeBase(): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open(CACHE_NAME_KNOWLEDGE_BASE);
    const articles = KnowledgeBase.getAllArticles();
    const payload = {
      timestamp: new Date().toISOString(),
      metadata: KnowledgeBase.metadata,
      documentsCount: KnowledgeBase.documents.length,
      articlesCount: articles.length,
      articles: articles,
    };

    const response = new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

    await cache.put('/api/knowledge-base.json', response);
    console.log(`📦 [Workbox/Cache] ${articles.length} artigos da KnowledgeBase pré-carregados no Cache Storage (Stale-While-Revalidate).`);
    return true;
  } catch (err) {
    console.warn('⚠️ [Cache Storage] Erro ao pré-carregar KnowledgeBase:', err);
    return false;
  }
}

/**
 * Regista o Service Worker e inicializa a estratégia de sincronização em segundo plano
 */
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      // 1. Guardar a KnowledgeBase no Cache Storage local para acesso offline imediato
      await preCacheKnowledgeBase();

      // 2. Registo do Service Worker com suporte Workbox
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ [PWA Workbox] Service Worker registrado com sucesso:', registration.scope);

          // Verificar atualizações de versão em background
          if (registration.update) {
            registration.update();
          }

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('🔄 [Workbox PWA] Nova versão disponível. Atualize a página.');
                  } else {
                    console.log('⚡ [Workbox PWA] Aplicação e KnowledgeBase 100% prontas para utilização Offline!');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('⚠️ [PWA Workbox] Falha ao registrar Service Worker:', error);
        });
    });
  }
}

