import React, { useState, useMemo } from 'react';
import { ALL_MODULES } from '../data';
import { DiplomaModule, ConceptArticle, ModuleId } from '../types/minint';
import { ChevronRight, ChevronDown, Check, Search, X, Layers, Globe } from 'lucide-react';

interface ExplorerProps {
  moduleData: DiplomaModule;
  activeArticleId: string | null;
  onSelectArticle: (articleId: string) => void;
  onSelectModule?: (moduleId: ModuleId) => void;
  studiedArticleIds: string[];
  theme: 'light' | 'dark' | 'sepia';
}

export const Explorer: React.FC<ExplorerProps> = ({
  moduleData,
  activeArticleId,
  onSelectArticle,
  onSelectModule,
  studiedArticleIds,
  theme
}) => {
  // "Tudo nasce fechado. O utilizador decide o que abrir."
  const [openChapterIds, setOpenChapterIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'current' | 'global'>('global');

  const toggleChapter = (chapterId: string) => {
    setOpenChapterIds(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Helper function to test if an article matches the query
  const matchesArticle = (art: ConceptArticle): boolean => {
    if (!cleanQuery) return true;
    return (
      art.code.toLowerCase().includes(cleanQuery) ||
      art.title.toLowerCase().includes(cleanQuery) ||
      art.definition.toLowerCase().includes(cleanQuery) ||
      art.simpleExplanation.toLowerCase().includes(cleanQuery) ||
      (art.legalText && art.legalText.toLowerCase().includes(cleanQuery)) ||
      art.importantPoints.some(p => p.toLowerCase().includes(cleanQuery)) ||
      (art.examAlert && art.examAlert.toLowerCase().includes(cleanQuery))
    );
  };

  // Filter modules/chapters/sections/articles according to search scope and query
  const filteredModules = useMemo(() => {
    const targetModules = searchScope === 'global' ? ALL_MODULES : [moduleData];

    if (!cleanQuery) {
      return targetModules;
    }

    return targetModules
      .map(mod => {
        const matchingChapters = mod.chapters
          .map(chapter => {
            const matchingDirectArticles = (chapter.articles || []).filter(matchesArticle);

            const matchingSections = (chapter.sections || [])
              .map(sec => ({
                ...sec,
                articles: sec.articles.filter(matchesArticle)
              }))
              .filter(sec => sec.articles.length > 0 || sec.title.toLowerCase().includes(cleanQuery));

            const hasMatchingArticles =
              matchingDirectArticles.length > 0 ||
              matchingSections.some(s => s.articles.length > 0);

            const chapterTitleMatches = chapter.title.toLowerCase().includes(cleanQuery);

            if (hasMatchingArticles || chapterTitleMatches) {
              return {
                ...chapter,
                articles: chapterTitleMatches ? chapter.articles || [] : matchingDirectArticles,
                sections: chapterTitleMatches ? chapter.sections || [] : matchingSections
              };
            }
            return null;
          })
          .filter(Boolean) as DiplomaModule['chapters'];

        if (matchingChapters.length > 0) {
          return {
            ...mod,
            chapters: matchingChapters
          };
        }
        return null;
      })
      .filter(Boolean) as DiplomaModule[];
  }, [cleanQuery, searchScope, moduleData]);

  // Total count of matching articles found
  const totalMatchesCount = useMemo(() => {
    if (!cleanQuery) return 0;
    let count = 0;
    filteredModules.forEach(mod => {
      mod.chapters.forEach(chap => {
        if (chap.articles) {
          count += chap.articles.filter(matchesArticle).length;
        }
        if (chap.sections) {
          chap.sections.forEach(sec => {
            count += sec.articles.filter(matchesArticle).length;
          });
        }
      });
    });
    return count;
  }, [filteredModules, cleanQuery]);

  const handleArticleClick = (targetModuleId: ModuleId, articleId: string) => {
    if (targetModuleId !== moduleData.id && onSelectModule) {
      onSelectModule(targetModuleId);
    }
    onSelectArticle(articleId);
  };

  return (
    <div
      id="explorer-container"
      className={`w-72 md:w-80 flex-shrink-0 border-r flex flex-col h-full overflow-hidden select-none transition-colors duration-150 ${
        isDark
          ? 'bg-neutral-920 border-neutral-800 text-neutral-300'
          : isSepia
          ? 'bg-[#f0e8d5] border-[#dfd2b3] text-[#4a3b2c]'
          : 'bg-neutral-100/70 border-neutral-200 text-neutral-800'
      }`}
    >
      {/* Explorer Header & Global Search Field */}
      <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            Explorador de Conteúdo
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
            {cleanQuery ? `${totalMatchesCount} resultados` : `${moduleData.chapters.length} Capítulos`}
          </span>
        </div>

        {/* Search input field */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-neutral-400" />
          <input
            id="explorer-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por artigo, lei ou palavra-chave..."
            className={`w-full pl-8 pr-7 py-1.5 text-xs rounded-md border outline-none transition-all ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:border-amber-500'
                : isSepia
                ? 'bg-[#f7f1e1] border-[#d8caaa] text-[#3d2f1f] placeholder-[#8c785c] focus:border-[#a88d60]'
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500'
            }`}
          />
          {searchQuery && (
            <button
              id="btn-clear-search"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
              title="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scope Toggle: Current Module vs Global (All Modules) */}
        <div className="flex items-center bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5 rounded-lg text-[10px] font-medium">
          <button
            onClick={() => setSearchScope('global')}
            className={`flex-1 py-1 rounded-md flex items-center justify-center gap-1 transition-all ${
              searchScope === 'global'
                ? isDark
                  ? 'bg-neutral-900 text-amber-400 font-bold shadow-xs'
                  : 'bg-white text-neutral-900 font-bold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Busca Global (5 Módulos)</span>
          </button>
          <button
            onClick={() => setSearchScope('current')}
            className={`flex-1 py-1 rounded-md flex items-center justify-center gap-1 transition-all ${
              searchScope === 'current'
                ? isDark
                  ? 'bg-neutral-900 text-amber-400 font-bold shadow-xs'
                  : 'bg-white text-neutral-900 font-bold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Módulo Atual</span>
          </button>
        </div>
      </div>

      {/* Hierarchical Content Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {filteredModules.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <Search className="w-6 h-6 mx-auto text-neutral-400 opacity-50" />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Nenhum artigo encontrado para <span className="font-semibold text-amber-600 dark:text-amber-400">"{searchQuery}"</span>.
            </p>
          </div>
        ) : (
          filteredModules.map(mod => {
            const isDifferentModule = mod.id !== moduleData.id;

            return (
              <div key={mod.id} className="space-y-1">
                {/* Module Badge header when displaying multiple modules or global search */}
                {(searchScope === 'global' || isDifferentModule) && (
                  <div className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400 flex items-center justify-between border-b border-amber-500/20 mb-1.5">
                    <span className="truncate">{mod.title}</span>
                    <span className="text-[9px] font-mono opacity-80">{mod.shortTitle}</span>
                  </div>
                )}

                {/* Chapter hierarchy */}
                {mod.chapters.map(chapter => {
                  const isOpen = openChapterIds.has(chapter.id) || cleanQuery.length > 0;

                  // Helper renderer for article button respecting hierarchy
                  const renderArticleItem = (art: ConceptArticle) => {
                    const isSelected = art.id === activeArticleId && mod.id === moduleData.id;
                    const isStudied = studiedArticleIds.includes(art.id);

                    return (
                      <button
                        key={art.id}
                        id={`explorer-article-${art.id}`}
                        onClick={() => handleArticleClick(mod.id, art.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between gap-2 transition-all ${
                          isSelected
                            ? isDark
                              ? 'bg-amber-950/70 text-amber-300 font-medium border-l-2 border-amber-400 pl-2'
                              : isSepia
                              ? 'bg-[#e4d8b8] text-[#2c1f10] font-medium border-l-2 border-[#8c6b3f] pl-2'
                              : 'bg-neutral-900 text-white font-medium border-l-2 border-amber-500 pl-2'
                            : isDark
                            ? 'hover:bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
                            : isSepia
                            ? 'hover:bg-[#e8dec7] text-[#5e4e3b]'
                            : 'hover:bg-neutral-200/60 text-neutral-700'
                        }`}
                      >
                        <div className="truncate flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-semibold text-amber-600 dark:text-amber-400 opacity-90 flex-shrink-0">
                            {art.code}
                          </span>
                          <span className="truncate">{art.title}</span>
                        </div>
                        {isStudied && (
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  };

                  return (
                    <div key={chapter.id} className="rounded-md overflow-hidden">
                      {/* Chapter Title */}
                      <button
                        id={`explorer-chapter-${chapter.id}`}
                        onClick={() => toggleChapter(chapter.id)}
                        className={`w-full text-left px-2.5 py-1.5 text-xs font-semibold flex items-center justify-between rounded-md transition-colors ${
                          isOpen
                            ? isDark
                              ? 'text-neutral-100 bg-neutral-800/40'
                              : isSepia
                              ? 'text-[#362718] bg-[#e6dcc5]'
                              : 'text-neutral-900 bg-neutral-200/50'
                            : isDark
                            ? 'text-neutral-400 hover:bg-neutral-800/30'
                            : isSepia
                            ? 'text-[#5c4a35] hover:bg-[#eae0c8]'
                            : 'text-neutral-600 hover:bg-neutral-200/40'
                        }`}
                      >
                        <span className="truncate pr-2">{chapter.title}</span>
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                        )}
                      </button>

                      {/* Collapsible Section & Article List */}
                      {isOpen && (
                        <div className="pl-2 mt-1 space-y-1 border-l border-neutral-300 dark:border-neutral-800 ml-3 py-1">
                          {/* Direct Articles */}
                          {chapter.articles && chapter.articles.map(renderArticleItem)}

                          {/* Sections */}
                          {chapter.sections &&
                            chapter.sections.map(section => (
                              <div key={section.id} className="space-y-1 my-1">
                                <div className="text-[10px] font-semibold uppercase tracking-wider px-2 text-neutral-400 dark:text-neutral-500 mt-1">
                                  {section.title}
                                </div>
                                <div className="pl-1 space-y-0.5">
                                  {section.articles.map(renderArticleItem)}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

