import { ALL_MODULES } from '../data';
import { ModuleId, ConceptArticle, DiplomaModule } from '../types/minint';

export interface IndexedSearchResult {
  id: string;
  moduleId: ModuleId;
  moduleShortTitle: string;
  moduleTitle: string;
  chapterTitle: string;
  sectionTitle?: string;
  articleId: string;
  code: string;
  title: string;
  definition?: string;
  simpleExplanation?: string;
  legalText?: string;
  examAlert?: string;
  importantPoints?: string[];
  score: number;
}

export interface IndexDocument {
  id: string;
  moduleId: ModuleId;
  moduleShortTitle: string;
  moduleTitle: string;
  chapterTitle: string;
  sectionTitle?: string;
  articleId: string;
  code: string;
  title: string;
  definition: string;
  simpleExplanation: string;
  legalText: string;
  examAlert: string;
  importantPoints: string[];
  normalizedCode: string;
  normalizedTitle: string;
  normalizedFullText: string;
  codeDigits: string[];
}

const DB_NAME = 'AcademiaCarreirasSearchDB';
const DB_VERSION = 1;
const STORE_NAME = 'search_articles';

// Helper to normalize text (remove accents, lowercase)
export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

let dbPromise: Promise<IDBDatabase> | null = null;
let isIndexedInMemory = false;
let inMemoryDocs: IndexDocument[] = [];

/**
 * Helper to build IndexDocument from an article
 */

function buildIndexDocument(
  mod: DiplomaModule,
  chapTitle: string,
  secTitle: string | undefined,
  art: ConceptArticle
): IndexDocument {
  const normCode = normalizeText(art.code || '');
  const normTitle = normalizeText(art.title || '');
  const normDef = normalizeText(art.definition || '');
  const normExpl = normalizeText(art.simpleExplanation || '');
  const normLegal = normalizeText(art.legalText || '');
  const normAlert = normalizeText(art.examAlert || '');
  const normPoints = (art.importantPoints || []).map(p => normalizeText(p)).join(' ');
  const normModShort = normalizeText(mod.shortTitle || '');
  const normModTitle = normalizeText(mod.title || '');
  const normChap = normalizeText(chapTitle || '');
  const normSec = secTitle ? normalizeText(secTitle) : '';

  const normalizedFullText = `${normCode} ${normTitle} ${normModShort} ${normModTitle} ${normChap} ${normSec} ${normExpl} ${normDef} ${normLegal} ${normAlert} ${normPoints}`;
  const codeDigits = normCode.match(/\d+/g) || [];

  return {
    id: `${mod.id}_${art.id}`,
    moduleId: mod.id,
    moduleShortTitle: mod.shortTitle,
    moduleTitle: mod.title,
    chapterTitle: chapTitle,
    sectionTitle: secTitle,
    articleId: art.id,
    code: art.code,
    title: art.title,
    definition: art.definition || '',
    simpleExplanation: art.simpleExplanation || '',
    legalText: art.legalText || '',
    examAlert: art.examAlert || '',
    importantPoints: art.importantPoints || [],
    normalizedCode: normCode,
    normalizedTitle: normTitle,
    normalizedFullText,
    codeDigits
  };
}

/**
 * Build total memory list of all documents from ALL_MODULES
 */
function getAllKnowledgeDocuments(): IndexDocument[] {
  const docs: IndexDocument[] = [];
  ALL_MODULES.forEach(mod => {
    mod.chapters.forEach(chap => {
      if (chap.articles) {
        chap.articles.forEach(art => {
          docs.push(buildIndexDocument(mod, chap.title, undefined, art));
        });
      }
      if (chap.sections) {
        chap.sections.forEach(sec => {
          sec.articles.forEach(art => {
            docs.push(buildIndexDocument(mod, chap.title, sec.title, art));
          });
        });
      }
    });
  });
  return docs;
}

export interface IndexStatusInfo {
  isIndexed: boolean;
  indexedCount: number;
  totalCount: number;
  dbType: 'indexeddb' | 'memory';
  lastUpdated: string;
  version: string;
  versionCode: string;
  lastSyncFormatted: string;
  lastSyncTimestamp: number;
  storageSizeEstimate: string;
  status: 'synced' | 'syncing' | 'error';
}

const KNOWLEDGEBASE_VERSION = 'v2.5.0 - Angola Concursos 2026';
const KNOWLEDGEBASE_VERSION_CODE = '2.5.0';
const SYNC_TIMESTAMP_KEY = 'knowledgebase_indexeddb_last_sync_timestamp';

/**
 * Get current indexing & sync status
 */
export async function getSearchDatabaseInfo(): Promise<IndexStatusInfo> {
  const totalCount = getAllKnowledgeDocuments().length;
  const storedTimestamp = typeof window !== 'undefined' ? localStorage.getItem(SYNC_TIMESTAMP_KEY) : null;
  const ts = storedTimestamp ? parseInt(storedTimestamp, 10) : Date.now();
  const dateObj = new Date(ts);
  const formattedDate = `${dateObj.toLocaleDateString('pt-AO')} às ${dateObj.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}`;

  try {
    const db = await initSearchDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.count();
      req.onsuccess = () => {
        const count = req.result;
        resolve({
          isIndexed: count === totalCount && count > 0,
          indexedCount: count,
          totalCount,
          dbType: 'indexeddb',
          lastUpdated: dateObj.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
          version: KNOWLEDGEBASE_VERSION,
          versionCode: KNOWLEDGEBASE_VERSION_CODE,
          lastSyncFormatted: formattedDate,
          lastSyncTimestamp: ts,
          storageSizeEstimate: `${(count * 2.1 / 1024 + 0.4).toFixed(1)} MB`,
          status: 'synced'
        });
      };
      req.onerror = () => {
        resolve({
          isIndexed: true,
          indexedCount: totalCount,
          totalCount,
          dbType: 'memory',
          lastUpdated: 'Memória Cache',
          version: KNOWLEDGEBASE_VERSION,
          versionCode: KNOWLEDGEBASE_VERSION_CODE,
          lastSyncFormatted: formattedDate,
          lastSyncTimestamp: ts,
          storageSizeEstimate: '~1.2 MB',
          status: 'synced'
        });
      };
    });
  } catch (e) {
    return {
      isIndexed: true,
      indexedCount: totalCount,
      totalCount,
      dbType: 'memory',
      lastUpdated: 'Memória Fallback',
      version: KNOWLEDGEBASE_VERSION,
      versionCode: KNOWLEDGEBASE_VERSION_CODE,
      lastSyncFormatted: formattedDate,
      lastSyncTimestamp: ts,
      storageSizeEstimate: '~1.2 MB',
      status: 'synced'
    };
  }
}

/**
 * Force manual re-indexing of all articles in IndexedDB
 */
export async function forceReindexDatabase(): Promise<IndexStatusInfo> {
  const docs = getAllKnowledgeDocuments();
  const now = Date.now();
  if (typeof window !== 'undefined') {
    localStorage.setItem(SYNC_TIMESTAMP_KEY, now.toString());
  }

  const dateObj = new Date(now);
  const formattedDate = `${dateObj.toLocaleDateString('pt-AO')} às ${dateObj.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}`;

  try {
    const db = await initSearchDatabase();
    await reindexAllDocuments(db, docs);
    return {
      isIndexed: true,
      indexedCount: docs.length,
      totalCount: docs.length,
      dbType: 'indexeddb',
      lastUpdated: dateObj.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
      version: KNOWLEDGEBASE_VERSION,
      versionCode: KNOWLEDGEBASE_VERSION_CODE,
      lastSyncFormatted: formattedDate,
      lastSyncTimestamp: now,
      storageSizeEstimate: `${(docs.length * 2.1 / 1024 + 0.4).toFixed(1)} MB`,
      status: 'synced'
    };
  } catch (e) {
    return {
      isIndexed: true,
      indexedCount: docs.length,
      totalCount: docs.length,
      dbType: 'memory',
      lastUpdated: 'Memória Fallback',
      version: KNOWLEDGEBASE_VERSION,
      versionCode: KNOWLEDGEBASE_VERSION_CODE,
      lastSyncFormatted: formattedDate,
      lastSyncTimestamp: now,
      storageSizeEstimate: '~1.2 MB',
      status: 'synced'
    };
  }
}

/**
 * Initialize IndexedDB database
 */
export function initSearchDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  inMemoryDocs = getAllKnowledgeDocuments();

  if (typeof window === 'undefined' || !window.indexedDB) {
    isIndexedInMemory = true;
    return Promise.reject(new Error('IndexedDB not supported in environment'));
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('moduleId', 'moduleId', { unique: false });
        store.createIndex('normalizedCode', 'normalizedCode', { unique: false });
      }
    };

    request.onsuccess = async (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      try {
        // Verify index freshness
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const countReq = store.count();

        countReq.onsuccess = () => {
          if (countReq.result !== inMemoryDocs.length) {
            // Re-index all docs
            reindexAllDocuments(db, inMemoryDocs).then(() => resolve(db)).catch(() => resolve(db));
          } else {
            resolve(db);
          }
        };

        countReq.onerror = () => resolve(db);
      } catch (err) {
        resolve(db);
      }
    };

    request.onerror = (err) => {
      isIndexedInMemory = true;
      reject(err);
    };
  });

  return dbPromise;
}

/**
 * Populate or replace all documents in IndexedDB
 */
async function reindexAllDocuments(db: IDBDatabase, docs: IndexDocument[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();

    docs.forEach(doc => {
      store.put(doc);
    });

    tx.oncomplete = () => {
      resolve();
    };

    tx.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * Execute fuzzy search across indexed database
 */
export async function searchIndexedDB(query: string, maxResults = 30): Promise<IndexedSearchResult[]> {
  const rawTrimmed = query.trim();
  if (!rawTrimmed) return [];

  const normQuery = normalizeText(rawTrimmed);
  const queryDigits = normQuery.replace(/[^0-9]/g, '');
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);

  let docsToSearch: IndexDocument[] = [];

  try {
    const db = await initSearchDatabase();
    docsToSearch = await new Promise<IndexDocument[]>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        resolve(req.result && req.result.length > 0 ? req.result : inMemoryDocs);
      };
      req.onerror = () => {
        resolve(inMemoryDocs);
      };
    });
  } catch (e) {
    docsToSearch = inMemoryDocs.length > 0 ? inMemoryDocs : getAllKnowledgeDocuments();
  }

  const results: IndexedSearchResult[] = [];

  docsToSearch.forEach(doc => {
    let score = 0;

    // 1. ARTICLE CODE NUMERIC MATCHING
    if (queryDigits && doc.codeDigits && doc.codeDigits.length > 0) {
      if (doc.codeDigits.includes(queryDigits)) {
        if (doc.codeDigits[0] === queryDigits) {
          score += 3500;
        } else {
          score += 2600;
        }
      } else if (doc.codeDigits.some(d => d.startsWith(queryDigits))) {
        score += 1400;
      }
    }

    // 2. CODE TEXT MATCHING
    if (doc.normalizedCode === normQuery) {
      score += 4000;
    } else if (doc.normalizedCode.startsWith(normQuery)) {
      score += 2200;
    } else if (doc.normalizedCode.includes(normQuery)) {
      score += 1500;
    }

    // 3. TITLE MATCHING
    if (doc.normalizedTitle === normQuery) {
      score += 2000;
    } else if (doc.normalizedTitle.startsWith(normQuery)) {
      score += 1200;
    } else if (doc.normalizedTitle.includes(normQuery)) {
      score += 850;
    }

    // 4. EXPLANATION & DEFINITION
    if (doc.simpleExplanation && normalizeText(doc.simpleExplanation).includes(normQuery)) score += 400;
    if (doc.definition && normalizeText(doc.definition).includes(normQuery)) score += 350;

    // 5. LEGAL TEXT & ALERTS
    if (doc.examAlert && normalizeText(doc.examAlert).includes(normQuery)) score += 250;
    if (doc.legalText && normalizeText(doc.legalText).includes(normQuery)) score += 150;

    // 6. MULTI-TOKEN FUZZY RELEVANCE
    if (queryTokens.length > 0) {
      let matchedCount = 0;
      queryTokens.forEach(tok => {
        if (doc.normalizedFullText.includes(tok)) matchedCount++;
      });

      if (matchedCount === queryTokens.length) {
        score += 600 + (matchedCount * 100);
      } else if (matchedCount > 0) {
        score += matchedCount * 90;
      } else {
        score = 0;
      }
    }

    if (score > 0) {
      results.push({
        id: doc.id,
        moduleId: doc.moduleId,
        moduleShortTitle: doc.moduleShortTitle,
        moduleTitle: doc.moduleTitle,
        chapterTitle: doc.chapterTitle,
        sectionTitle: doc.sectionTitle,
        articleId: doc.articleId,
        code: doc.code,
        title: doc.title,
        definition: doc.definition,
        simpleExplanation: doc.simpleExplanation,
        legalText: doc.legalText,
        examAlert: doc.examAlert,
        importantPoints: doc.importantPoints,
        score
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, maxResults);
}
