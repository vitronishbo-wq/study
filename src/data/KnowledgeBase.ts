import { DiplomaModule, ConceptArticle, Chapter, Section } from '../types/minint';
import { ALL_MODULES } from './index';

export interface KnowledgeBaseMetadata {
  receivedDocumentsCount: number;
  incorporatedDocumentsCount: number;
  pendingDocumentsCount: number;
  discardedContentCount: number;
  structuredChaptersCount: number;
  structuredArticlesCount: number;
  lastUpdated: string;
}

export interface DocumentEntry {
  id: string;
  title: string;
  shortTitle: string;
  hierarchyLabel: string;
  hierarchyLevel: number;
  officialSource: string;
  status: 'incorporado' | 'pendente';
  chaptersCount: number;
  articlesCount: number;
  chapters: Chapter[];
}

// Compute total statistics
const calculateStats = (modules: DiplomaModule[]): KnowledgeBaseMetadata => {
  let chaptersCount = 0;
  let articlesCount = 0;

  modules.forEach(mod => {
    chaptersCount += mod.chapters.length;
    mod.chapters.forEach(chap => {
      if (chap.articles) {
        articlesCount += chap.articles.length;
      }
      if (chap.sections) {
        chap.sections.forEach(sec => {
          articlesCount += sec.articles.length;
        });
      }
    });
  });

  return {
    receivedDocumentsCount: 5,
    incorporatedDocumentsCount: 5,
    pendingDocumentsCount: 0,
    discardedContentCount: 0,
    structuredChaptersCount: chaptersCount,
    structuredArticlesCount: articlesCount,
    lastUpdated: '2026-07-24'
  };
};

export const KNOWLEDGE_BASE_METADATA: KnowledgeBaseMetadata = calculateStats(ALL_MODULES);

export const KnowledgeBase: {
  metadata: KnowledgeBaseMetadata;
  documents: DocumentEntry[];
  getAllArticles: () => ConceptArticle[];
  searchArticles: (query: string) => ConceptArticle[];
} = {
  metadata: KNOWLEDGE_BASE_METADATA,
  documents: ALL_MODULES.map(mod => {
    let articlesCount = 0;
    mod.chapters.forEach(c => {
      if (c.articles) articlesCount += c.articles.length;
      if (c.sections) {
        c.sections.forEach(s => {
          articlesCount += s.articles.length;
        });
      }
    });

    return {
      id: mod.id,
      title: mod.title,
      shortTitle: mod.shortTitle,
      hierarchyLabel: mod.hierarchyLabel,
      hierarchyLevel: mod.hierarchyLevel,
      officialSource: getOfficialSource(mod.id),
      status: 'incorporado',
      chaptersCount: mod.chapters.length,
      articlesCount,
      chapters: mod.chapters
    };
  }),

  getAllArticles: () => {
    const articles: ConceptArticle[] = [];
    ALL_MODULES.forEach(mod => {
      mod.chapters.forEach(chap => {
        if (chap.articles) {
          articles.push(...chap.articles);
        }
        if (chap.sections) {
          chap.sections.forEach(sec => {
            articles.push(...sec.articles);
          });
        }
      });
    });
    return articles;
  },

  searchArticles: (query: string) => {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    return KnowledgeBase.getAllArticles().filter(art =>
      art.code.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.definition.toLowerCase().includes(q) ||
      art.simpleExplanation.toLowerCase().includes(q) ||
      (art.legalText && art.legalText.toLowerCase().includes(q))
    );
  }
};

function getOfficialSource(id: string): string {
  switch (id) {
    case 'constituição':
      return 'Diário da República n.º 23, I Série de 5 de Fevereiro de 2010 (Constituição da República de Angola)';
    case 'minint':
      return 'Estatuto Orgânico do Ministério do Interior de Angola (MININT)';
    case 'policia':
      return 'Decreto Presidencial n.º 152/19 de 15 de Maio - Estatuto Orgânico da Polícia Nacional de Angola';
    case 'historia':
      return 'História da República de Angola e Independência Nacional (11 de Novembro de 1975)';
    case 'cultura_geral':
      return 'Constituição e Legislação do Poder Executivo da República de Angola';
    default:
      return 'Base de Dados Oficial';
  }
}

export default KnowledgeBase;
