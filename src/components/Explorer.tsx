import React, { useState, useMemo } from 'react';
import { ALL_MODULES } from '../data';
import { DiplomaModule, ConceptArticle, ModuleId } from '../types/minint';
import {
  ChevronRight,
  ChevronDown,
  Check,
  Search,
  X,
  Layers,
  Globe,
  BookOpen,
  Shield,
  Scale,
  Building2,
  Sparkles,
  Bookmark,
  History,
  Folder,
  FolderOpen
} from 'lucide-react';

interface ExplorerProps {
  moduleData: DiplomaModule;
  activeArticleId: string | null;
  onSelectArticle: (articleId: string) => void;
  onSelectModule?: (moduleId: ModuleId) => void;
  studiedArticleIds: string[];
  theme: 'light' | 'dark' | 'sepia';
  onCloseExplorer?: () => void;
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

interface Compartment {
  id: string;
  title: string;
  icon: React.ReactNode;
  moduleIds: ModuleId[];
}

const COMPARTMENTS: Compartment[] = [
  {
    id: 'comp-constituição',
    title: '1. Norma Suprema de Angola',
    icon: <BookOpen className="w-4 h-4 text-amber-500" />,
    moduleIds: ['constituição']
  },
  {
    id: 'comp-seguranca',
    title: '2. Segurança Pública & Forças de Defesa',
    icon: <Shield className="w-4 h-4 text-amber-600" />,
    moduleIds: ['minint', 'policia']
  },
  {
    id: 'comp-legislacao',
    title: '3. Legislação, Estado & Função Pública',
    icon: <Scale className="w-4 h-4 text-indigo-500" />,
    moduleIds: ['administracao_publica', 'saude_financas', 'educacao', 'historia', 'cultura_geral']
  }
];

export const Explorer: React.FC<ExplorerProps> = ({
  moduleData,
  activeArticleId,
  onSelectArticle,
  onSelectModule,
  studiedArticleIds,
  theme,
  onCloseExplorer,
  activeTab,
  onSelectTab
}) => {
  // Compartment and chapter collapsible state
  const [openCompartmentIds, setOpenCompartmentIds] = useState<Set<string>>(
    new Set(['comp-constituição', 'comp-seguranca', 'comp-legislacao'])
  );
  const [openModuleIds, setOpenModuleIds] = useState<Set<string>>(new Set([moduleData.id]));
  const [openChapterIds, setOpenChapterIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const toggleCompartment = (comp: string) => {
    setOpenCompartmentIds(prev => {
      const next = new Set(prev);
      if (next.has(comp)) next.delete(comp);
      else next.add(comp);
      return next;
    });
  };

  const toggleModule = (modId: string) => {
    setOpenModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  const toggleChapter = (chapterId: string) => {
    setOpenChapterIds(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  const cleanQuery = searchQuery.trim().toLowerCase();

  const matchesArticle = (art: ConceptArticle): boolean => {
    if (!cleanQuery) return true;
    return (
      art.code.toLowerCase().includes(cleanQuery) ||
      art.title.toLowerCase().includes(cleanQuery) ||
      art.definition.toLowerCase().includes(cleanQuery) ||
      art.simpleExplanation.toLowerCase().includes(cleanQuery) ||
      (art.legalText && art.legalText.toLowerCase().includes(cleanQuery)) ||
      art.importantPoints.some(p => p.toLowerCase().includes(cleanQuery))
    );
  };

  const handleArticleClick = (targetModuleId: ModuleId, articleId: string) => {
    if (targetModuleId !== moduleData.id && onSelectModule) {
      onSelectModule(targetModuleId);
    }
    onSelectArticle(articleId);
    if (onCloseExplorer) {
      onCloseExplorer();
    }
  };

  const handleModuleClick = (targetModuleId: ModuleId) => {
    if (onSelectModule) {
      onSelectModule(targetModuleId);
    }
    toggleModule(targetModuleId);
  };

  return (
    <div
      id="explorer-container"
      className={`w-80 md:w-84 flex-shrink-0 border-r flex flex-col h-full overflow-hidden select-none transition-colors duration-150 ${
        isDark
          ? 'bg-neutral-920 border-neutral-800 text-neutral-300'
          : isSepia
          ? 'bg-[#f0e8d5] border-[#dfd2b3] text-[#4a3b2c]'
          : 'bg-neutral-100/80 border-neutral-200 text-neutral-800'
      }`}
    >
      {/* Header & Systematic Compartments Title */}
      <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-500" />
            Índice Sistemático
          </span>
          {onCloseExplorer && (
            <button
              id="btn-close-explorer"
              onClick={onCloseExplorer}
              title="Recolher Painel"
              className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Input Field */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-neutral-400" />
          <input
            id="explorer-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pesquisar artigos, leis ou normas..."
            className={`w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border outline-none transition-all ${
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
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Systematic Compartments Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* Functional Tabs Compartment: Concursos, Simulados, Favoritos */}
        <div className="p-2 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 block px-1 mb-1">
            Ferramentas & Recursos
          </span>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab && onSelectTab('concursos')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'concursos'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-amber-500/10 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Carreiras & Concursos</span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('simulados')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'simulados'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-amber-500/10 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exercícios & Simulados</span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('favorites')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-amber-500/10 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Artigos Favoritos</span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('history')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-amber-500/10 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <History className="w-3.5 h-3.5 text-amber-500" />
              <span>Histórico de Leitura</span>
            </button>
          </div>
        </div>

        {/* 3 Main Legal Compartments ("Cómodos Próprios") */}
        {COMPARTMENTS.map(comp => {
          const isCompOpen = openCompartmentIds.has(comp.id) || cleanQuery.length > 0;
          const compModules = ALL_MODULES.filter(m => comp.moduleIds.includes(m.id));

          if (compModules.length === 0) return null;

          return (
            <div key={comp.id} className="rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800">
              {/* Compartment Header */}
              <button
                onClick={() => toggleCompartment(comp.id)}
                className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                  isDark ? 'bg-neutral-900 text-neutral-100 hover:bg-neutral-850' : 'bg-neutral-200/60 text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {comp.icon}
                  <span className="truncate">{comp.title}</span>
                </div>
                {isCompOpen ? (
                  <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                )}
              </button>

              {/* Compartment Content: Modules list */}
              {isCompOpen && (
                <div className="p-1 space-y-1 bg-white/40 dark:bg-neutral-900/40">
                  {compModules.map(mod => {
                    const isModActive = mod.id === moduleData.id;
                    const isModOpen = openModuleIds.has(mod.id) || isModActive || cleanQuery.length > 0;

                    return (
                      <div key={mod.id} className="rounded-lg overflow-hidden">
                        {/* Module Item Header */}
                        <button
                          onClick={() => handleModuleClick(mod.id)}
                          className={`w-full text-left px-2.5 py-1.5 text-xs font-semibold flex items-center justify-between rounded-lg transition-all ${
                            isModActive
                              ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border-l-2 border-amber-500'
                              : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isModOpen ? (
                              <FolderOpen className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            ) : (
                              <Folder className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                            )}
                            <span className="truncate">{mod.shortTitle || mod.title}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isModOpen ? 'rotate-90' : ''}`} />
                        </button>

                        {/* Module Chapters & Articles Tree */}
                        {isModOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 border-l border-amber-500/30 ml-3 my-0.5">
                            {mod.chapters.map(chap => {
                              const isChapOpen = openChapterIds.has(chap.id) || cleanQuery.length > 0;

                              const renderArticle = (art: ConceptArticle) => {
                                if (!matchesArticle(art)) return null;

                                const isArtSelected = art.id === activeArticleId && mod.id === moduleData.id;
                                const isStudied = studiedArticleIds.includes(art.id);

                                return (
                                  <button
                                    key={art.id}
                                    onClick={() => handleArticleClick(mod.id, art.id)}
                                    className={`w-full text-left px-2 py-1 rounded-md text-[11px] flex items-center justify-between gap-1.5 transition-all cursor-pointer ${
                                      isArtSelected
                                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                                        : 'hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                    }`}
                                  >
                                    <div className="truncate flex items-center gap-1.5">
                                      <span className="font-mono text-[10px] font-bold text-amber-500 flex-shrink-0">
                                        {art.code}
                                      </span>
                                      <span className="truncate">{art.title}</span>
                                    </div>
                                    {isStudied && <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                                  </button>
                                );
                              };

                              return (
                                <div key={chap.id} className="space-y-0.5">
                                  <button
                                    onClick={() => toggleChapter(chap.id)}
                                    className="w-full text-left px-2 py-1 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center justify-between"
                                  >
                                    <span className="truncate pr-1">{chap.title}</span>
                                    <ChevronRight className={`w-3 h-3 text-neutral-400 transition-transform ${isChapOpen ? 'rotate-90' : ''}`} />
                                  </button>

                                  {isChapOpen && (
                                    <div className="pl-2 space-y-0.5 border-l border-neutral-300 dark:border-neutral-800 ml-1">
                                      {chap.articles?.map(renderArticle)}
                                      {chap.sections?.map(sec => (
                                        <div key={sec.id} className="space-y-0.5 my-1">
                                          <span className="text-[9px] uppercase font-bold text-neutral-400 block px-1">
                                            {sec.title}
                                          </span>
                                          {sec.articles.map(renderArticle)}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
