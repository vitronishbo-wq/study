import { DiplomaModule, ModuleId, ConceptArticle, Chapter, Section } from '../types/minint';
import { constituicaoModule } from './modules/constituição';
import { minintModule } from './modules/minint';
import { policiaModule } from './modules/policia';
import { historiaModule } from './modules/historia';
import { culturaGeralModule } from './modules/cultura_geral';
import { educacaoModule } from './modules/educacao';

export const ALL_MODULES: DiplomaModule[] = [
  constituicaoModule,
  minintModule,
  policiaModule,
  historiaModule,
  culturaGeralModule,
  educacaoModule
];

export function getModuleById(id: ModuleId): DiplomaModule {
  const found = ALL_MODULES.find(m => m.id === id);
  return found || ALL_MODULES[0];
}

// Flatten all articles for a module
export function getAllArticlesInModule(moduleData: DiplomaModule): ConceptArticle[] {
  const articles: ConceptArticle[] = [];
  moduleData.chapters.forEach(chapter => {
    if (chapter.articles) {
      articles.push(...chapter.articles);
    }
    if (chapter.sections) {
      chapter.sections.forEach(sec => {
        articles.push(...sec.articles);
      });
    }
  });
  return articles;
}

// Find a specific article by ID
export function findArticleById(moduleData: DiplomaModule, articleId: string): {
  article: ConceptArticle;
  chapterTitle: string;
  chapter: Chapter;
  sectionTitle?: string;
} | null {
  for (const chapter of moduleData.chapters) {
    if (chapter.articles) {
      const match = chapter.articles.find(a => a.id === articleId);
      if (match) return { article: match, chapterTitle: chapter.title, chapter };
    }
    if (chapter.sections) {
      for (const sec of chapter.sections) {
        const match = sec.articles.find(a => a.id === articleId);
        if (match) {
          return { article: match, chapterTitle: chapter.title, chapter, sectionTitle: sec.title };
        }
      }
    }
  }
  return null;
}

// Search query across all modules
export function searchKnowledgeBase(query: string): {
  module: DiplomaModule;
  article: ConceptArticle;
  chapterTitle: string;
}[] {
  if (!query || query.trim().length < 2) return [];
  const cleanQ = query.toLowerCase().trim();
  const results: { module: DiplomaModule; article: ConceptArticle; chapterTitle: string }[] = [];

  ALL_MODULES.forEach(mod => {
    mod.chapters.forEach(chap => {
      const checkArticles = (arts: ConceptArticle[]) => {
        arts.forEach(art => {
          if (
            art.code.toLowerCase().includes(cleanQ) ||
            art.title.toLowerCase().includes(cleanQ) ||
            art.definition.toLowerCase().includes(cleanQ) ||
            art.simpleExplanation.toLowerCase().includes(cleanQ) ||
            (art.legalText && art.legalText.toLowerCase().includes(cleanQ))
          ) {
            results.push({ module: mod, article: art, chapterTitle: chap.title });
          }
        });
      };

      if (chap.articles) checkArticles(chap.articles);
      if (chap.sections) {
        chap.sections.forEach(sec => checkArticles(sec.articles));
      }
    });
  });

  return results;
}
