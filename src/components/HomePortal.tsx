import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MODULES, getAllArticlesInModule, findArticleById } from '../data';
import { ALL_CONCURSOS } from '../data/concursos';
import { ModuleId, UserProgress, MinistryConcurso, ConceptArticle } from '../types/minint';
import { KnowledgeBase } from '../data/KnowledgeBase';
import { searchIndexedDB, IndexedSearchResult, forceReindexDatabase } from '../lib/indexedDbSearch';
import { SyncManagementView } from './SyncManagementView';
import { JOBEXPRESS_URL } from '../lib/vitronisAuth';
import { useVitronisAuth } from '../hooks/useVitronisAuth';
import { JobExpressLink } from './JobExpressLink';

import {
  CentralRepository,
  CENTRAL_DOCUMENTS,
  CENTRAL_GLOSSARY,
  CENTRAL_FAQ,
  GlossaryTerm,
  CandidateFAQ
} from '../data/CentralRepository';

import {
  Search,
  BookOpen,
  Building2,
  Shield,
  GraduationCap,
  HeartPulse,
  MapPin,
  Scale,
  Award,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  Flame,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Settings,
  Database,
  Home,
  User as UserIcon,
  BarChart2,
  FileText,
  Video,
  FileCode,
  LogIn,
  LogOut,
  FolderDown,
  BookMarked,
  ShieldAlert,
  History,
  Bookmark,
  RefreshCw,
  Zap,
  Check,
  X,
  FileCheck,
  AlertCircle,
  Brain
} from 'lucide-react';

interface HomePortalProps {
  onSelectModule: (moduleId: ModuleId, articleId?: string) => void;
  progress: UserProgress;
  theme: 'light' | 'dark' | 'sepia';
  onOpenQuickFind: () => void;
  onOpenStatsModal: () => void;
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5 text-amber-500" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-blue-500" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-emerald-500" />,
  Building2: <Building2 className="w-5 h-5 text-purple-500" />,
  MapPin: <MapPin className="w-5 h-5 text-red-500" />,
  Scale: <Scale className="w-5 h-5 text-indigo-500" />
};

export const HomePortal: React.FC<HomePortalProps> = ({
  onSelectModule,
  progress,
  theme,
  onOpenQuickFind,
  onOpenStatsModal,
  activeTab: activeTabProp,
  onSelectTab: onSelectTabProp
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const [activeTabState, setActiveTabState] = useState<string>('inicio');

  // Sync with prop if provided
  useEffect(() => {
    if (activeTabProp) {
      setActiveTabState(activeTabProp);
    }
  }, [activeTabProp]);

  const activeTab = activeTabProp || activeTabState;

  const handleTabChange = (tabId: string) => {
    setActiveTabState(tabId);
    if (onSelectTabProp) {
      onSelectTabProp(tabId);
    }
  };

  const [selectedMinistry, setSelectedMinistry] = useState<MinistryConcurso>(ALL_CONCURSOS[0]);
  const [concursoModalOpen, setConcursoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IndexedSearchResult[]>([]);
  const [showJobExpressModal, setShowJobExpressModal] = useState(false);

  // Library Sub-Filter state
  const [libraryFilter, setLibraryFilter] = useState<string>('todos');
  const [librarySearch, setLibrarySearch] = useState<string>('');

  // Interactive Quiz Engine State inside Simulados tab
  const [activeQuizMode, setActiveQuizMode] = useState<'rapido' | 'completo' | 'disciplina' | 'inteligente' | null>(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const { user, isAuthenticated, login, logout } = useVitronisAuth();

  // Search IndexedDB live
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    let isMounted = true;
    searchIndexedDB(searchQuery, 6).then(results => {
      if (isMounted) {
        setSearchResults(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  // All Articles in Repository
  const allArticlesList = useMemo(() => {
    const list: ConceptArticle[] = [];
    ALL_MODULES.forEach(mod => {
      list.push(...getAllArticlesInModule(mod));
    });
    return list;
  }, []);

  // Bookmarked Articles
  const bookmarkedArticles = useMemo(() => {
    return allArticlesList.filter(a => progress.bookmarkedArticleIds.includes(a.id));
  }, [allArticlesList, progress.bookmarkedArticleIds]);

  // Studied Articles
  const studiedArticles = useMemo(() => {
    return allArticlesList.filter(a => progress.studiedArticleIds.includes(a.id));
  }, [allArticlesList, progress.studiedArticleIds]);

  // Quiz Questions Pool for Simulados
  const quizPool = useMemo(() => {
    return CentralRepository.simulados;
  }, []);

  const totalArticles = allArticlesList.length;
  const studiedCount = progress.studiedArticleIds.length;
  const overallPercentage = totalArticles > 0 ? Math.round((studiedCount / totalArticles) * 100) : 0;

  return (
    <div
      className={`flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-8 space-y-8 select-none transition-colors duration-150 ${
        isDark
          ? 'bg-neutral-950 text-neutral-100'
          : isSepia
          ? 'bg-[#faf4e8] text-[#3b2d1d]'
          : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* 1. BRAND HERO HEADER */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-br from-amber-900/90 via-neutral-900 to-amber-950 text-white shadow-2xl overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Plataforma Oficial
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-xs font-semibold">
              100% Gratuita & Offline
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Angola 2026
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              Academia das Carreiras Públicas & Legislação
            </h1>
            <p className="text-base md:text-xl text-amber-200/90 font-medium mt-2">
              Prepare-se gratuitamente para concursos públicos em Angola com legislação na íntegra, glossário e simulados.
            </p>
          </div>

          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            Sua biblioteca digital completa para o Ministério do Interior, Educação, Saúde, Justiça, Administração Pública (MAPTSS) e Governos Locais (21 Províncias).
          </p>

          {/* Quick Search Bar */}
          <div className="relative pt-2 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar concurso, diploma legal, artigo, termo ou simulado..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-500/40 text-white placeholder-neutral-400 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 shadow-inner"
              />
              <button
                onClick={onOpenQuickFind}
                className="absolute right-2 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Ctrl+K</span>
              </button>
            </div>

            {/* Live Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-neutral-900 border border-amber-500/30 shadow-2xl p-3 z-50 space-y-2 max-h-80 overflow-y-auto animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block px-2">
                  Resultados da Pesquisa na KnowledgeBase ({searchResults.length})
                </span>
                {searchResults.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onSelectModule(res.moduleId, res.articleId);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-800 transition-all flex items-start justify-between gap-3 text-xs border border-neutral-800 hover:border-amber-500/40 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-mono font-bold">
                        <span>{res.moduleShortTitle}</span>
                        <span>•</span>
                        <span className="truncate">{res.chapterTitle}</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400 block">{res.code}</span>
                      <span className="font-semibold text-neutral-100 block">{res.title}</span>
                      <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{res.simpleExplanation || res.definition}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS (MENU COMPLETO DAS 8 SECÇÕES) */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => handleTabChange('inicio')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'inicio'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Início</span>
        </button>

        <button
          onClick={() => handleTabChange('biblioteca')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'biblioteca'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca</span>
        </button>

        <button
          onClick={() => handleTabChange('concursos')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'concursos'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Concursos</span>
        </button>

        <button
          onClick={() => handleTabChange('simulados')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'simulados'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Simulados</span>
        </button>

        <button
          onClick={() => handleTabChange('favorites')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Favoritos ({bookmarkedArticles.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('history')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Histórico</span>
        </button>

        <button
          onClick={() => handleTabChange('downloads')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'downloads'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <FolderDown className="w-4 h-4" />
          <span>Downloads</span>
        </button>

        <button
          onClick={() => handleTabChange('perfil')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'perfil' || activeTab === 'progresso'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Perfil & Progresso</span>
        </button>

        <button
          onClick={() => handleTabChange('definicoes')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'definicoes'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Definições</span>
        </button>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. TAB: INÍCIO (PORTAL INICIAL COM PAINEL CENTRAL) */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'inicio' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Banner Principal */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/60 to-neutral-950 border border-amber-500/30 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Portal Oficial das Carreiras Públicas em Angola
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                Estude com Legislação Atualizada, Casos Práticos & Simulados
              </h2>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Repositório único com a Constituição da República (CRA 2010/2021), Regulamento de Carreiras da PNA, Nova DPA de 21 Províncias (Lei 14/24), LGT e Estatutos do MED e MINSA.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleTabChange('concursos')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Explorar Catálogo de Concursos</span>
                </button>
                <button
                  onClick={() => handleTabChange('biblioteca')}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center gap-2 border border-neutral-700 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Aceder à Biblioteca Digital</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo de Dados em Linha de Texto */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Artigos Explicados:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{totalArticles}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Documentos PDF:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{CENTRAL_DOCUMENTS.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Questões em Banco:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{CentralRepository.simulados.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Termos do Glossário:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{CENTRAL_GLOSSARY.length}</span>
            </div>
          </div>

          {/* Catálogo de Módulos Legais em Lista de Leitura Limpa */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold font-serif flex items-center gap-2 uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Índice de Módulos de Preparação para Leitura</span>
              </h3>
              <button
                onClick={() => handleTabChange('biblioteca')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Todos na Biblioteca</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {ALL_MODULES.map(mod => (
                <div
                  key={mod.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 px-2 rounded-lg transition-colors"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                        {mod.hierarchyLabel}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">• {mod.chapters.length} Capítulos</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectModule(mod.id)}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-center cursor-pointer transition-all flex-shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ler Módulo na Íntegra</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Destaque do Glossário e FAQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-serif flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Scale className="w-5 h-5" />
                  <span>Glossário Jurídico em Destaque</span>
                </h3>
                <button
                  onClick={() => handleTabChange('biblioteca')}
                  className="text-xs font-bold text-amber-500 hover:underline"
                >
                  Ver Glossário
                </button>
              </div>
              <div className="space-y-3">
                {CENTRAL_GLOSSARY.slice(0, 3).map(term => (
                  <div key={term.id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold font-mono text-amber-600 dark:text-amber-400">{term.term}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">{term.category}</span>
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300">{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-serif flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <HelpCircle className="w-5 h-5" />
                  <span>Perguntas Frequentes do Candidato</span>
                </h3>
                <button
                  onClick={() => handleTabChange('biblioteca')}
                  className="text-xs font-bold text-blue-500 hover:underline"
                >
                  Ver FAQ
                </button>
              </div>
              <div className="space-y-3">
                {CENTRAL_FAQ.slice(0, 3).map(faq => (
                  <div key={faq.id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">{faq.question}</span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 4. TAB: BIBLIOTECA DIGITAL COMPLETA */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'biblioteca' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-500" />
              <span>Biblioteca Digital de Preparação para Concursos Públicos</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Coleção unificada de diplomas legais, decretos presenciais, estatutos orgânicos, glossário e FAQ oficial de Angola.
            </p>
          </div>

          {/* Sub-Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'todos', label: 'Todos os Diplomas' },
              { id: 'constituição', label: 'Constituição (CRA)' },
              { id: 'administracao_publica', label: 'Adm. Pública & LGT' },
              { id: 'minint', label: 'MININT & PNA' },
              { id: 'saude_financas', label: 'MINSA, AGT & Justiça' },
              { id: 'educacao', label: 'MED & Educação' },
              { id: 'glossario', label: 'Glossário Jurídico' },
              { id: 'faq', label: 'Perguntas Frequentes (FAQ)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setLibraryFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  libraryFilter === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={librarySearch}
              onChange={e => setLibrarySearch(e.target.value)}
              placeholder="Filtrar por título de artigo, lei, diploma ou palavra-chave..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Content Views based on Filter */}
          {libraryFilter === 'glossario' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CENTRAL_GLOSSARY.filter(g =>
                !librarySearch ||
                g.term.toLowerCase().includes(librarySearch.toLowerCase()) ||
                g.definition.toLowerCase().includes(librarySearch.toLowerCase())
              ).map(term => (
                <div key={term.id} className="p-5 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">{term.term}</h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">{term.category}</span>
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{term.definition}</p>
                  <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-[11px] text-neutral-500 italic">
                    Exemplo: {term.example}
                  </div>
                </div>
              ))}
            </div>
          ) : libraryFilter === 'faq' ? (
            <div className="space-y-3">
              {CENTRAL_FAQ.filter(f =>
                !librarySearch ||
                f.question.toLowerCase().includes(librarySearch.toLowerCase()) ||
                f.answer.toLowerCase().includes(librarySearch.toLowerCase())
              ).map(faq => (
                <div key={faq.id} className="p-5 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-blue-500 uppercase">{faq.category}</span>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{faq.question}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
              {ALL_MODULES.filter(m => libraryFilter === 'todos' || m.id === libraryFilter).map(mod => {
                const articles = getAllArticlesInModule(mod);
                const filteredArts = articles.filter(a =>
                  !librarySearch ||
                  a.code.toLowerCase().includes(librarySearch.toLowerCase()) ||
                  a.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
                  a.definition.toLowerCase().includes(librarySearch.toLowerCase())
                );

                return (
                  <div
                    key={mod.id}
                    className="py-4 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 px-2 rounded-lg transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                            {mod.hierarchyLabel}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">• {filteredArts.length} Artigos Registados</span>
                        </div>
                        <h3 className="text-base font-bold font-serif text-neutral-900 dark:text-neutral-100 mt-0.5">{mod.title}</h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{mod.description}</p>
                      </div>

                      <button
                        onClick={() => onSelectModule(mod.id)}
                        className="py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer flex-shrink-0"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Abrir Módulo Completo</span>
                      </button>
                    </div>

                    {/* Linha dos Artigos Principais para Leitura Directa */}
                    {filteredArts.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {filteredArts.slice(0, 4).map(art => (
                          <button
                            key={art.id}
                            onClick={() => onSelectModule(mod.id, art.id)}
                            className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500/20 hover:text-amber-600 dark:hover:text-amber-300 text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="font-bold">{art.code}:</span>
                            <span className="truncate max-w-[200px]">{art.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Repositório em PDF de Diplomas da República */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-serif text-amber-400 flex items-center gap-2">
                  <FolderDown className="w-5 h-5" />
                  <span>Documentos e Diplomas Legais em PDF para Download</span>
                </h3>
                <p className="text-xs text-neutral-400">Leitura oficial em Diário da República e Editais de Abertura.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CENTRAL_DOCUMENTS.map(doc => (
                <div key={doc.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">{doc.category}</span>
                    <h4 className="text-xs font-bold text-neutral-200 line-clamp-1">{doc.title}</h4>
                    <p className="text-[10px] text-neutral-400 font-mono">{doc.type.toUpperCase()} • {doc.sizeFormatted} • {doc.lastUpdated}</p>
                  </div>
                  <a
                    href={doc.downloadUrl || JOBEXPRESS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all flex-shrink-0"
                    title="Baixar Ficheiro PDF"
                  >
                    <FolderDown className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 5. TAB: CATÁLOGO REAL DE CONCURSOS PÚBLICOS */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'concursos' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
                <Building2 className="w-6 h-6 text-amber-500" />
                <span>Catálogo Oficial de Concursos Públicos de Angola</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Consulte requisitos formais, disciplinas exigidas, legislação aplicável e simulados direcionados para cada concurso.
              </p>
            </div>
            <span className="hidden sm:inline text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              {ALL_CONCURSOS.length} Sectores Públicos Registados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_CONCURSOS.map(conc => {
              const isSelected = selectedMinistry.id === conc.id;

              return (
                <div
                  key={conc.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                      : isDark
                      ? 'bg-neutral-900 border-neutral-800'
                      : 'bg-white border-neutral-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                        {ICON_MAP[conc.iconName] || <Building2 className="w-6 h-6 text-amber-500" />}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px]">
                        {conc.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-serif">{conc.ministryName}</h3>
                      <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">{conc.shortName}</span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{conc.description}</p>

                    {/* Carreiras Abrangidas */}
                    <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block">Carreiras Alvo:</span>
                      <div className="flex flex-wrap gap-1">
                        {conc.targetCareers.map((car, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
                            {car}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tópicos e Legislação Exigida */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block">Tópicos da Prova:</span>
                      <ul className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
                        {conc.keyTopics.map((top, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                            <span className="truncate">{top}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                    <button
                      onClick={() => {
                        setSelectedMinistry(conc);
                        setConcursoModalOpen(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Ver Ficha Detalhada</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectModule(conc.moduleIds[0])}
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Estudar Módulo Específico</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Detalhado do Concurso */}
          {concursoModalOpen && selectedMinistry && (
            <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-5 text-neutral-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setConcursoModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                    {ICON_MAP[selectedMinistry.iconName] || <Building2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">{selectedMinistry.badge}</span>
                    <h3 className="text-xl font-bold font-serif">{selectedMinistry.ministryName}</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <h4 className="font-bold text-amber-400">Descrição e Finalidade do Concurso:</h4>
                    <p className="text-neutral-300 leading-relaxed">{selectedMinistry.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <h4 className="font-bold text-amber-400">Requisitos Formais:</h4>
                      <ul className="space-y-1 text-neutral-300 list-disc list-inside">
                        <li>Nacionalidade Angolana</li>
                        <li>Idade entre 18 e 35 anos (regime geral)</li>
                        <li>Habilitações literárias comprovadas</li>
                        <li>Cultura Geral de Angola & Nova DPA (Lei 14/24)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <h4 className="font-bold text-amber-400">Disciplinas Avaliadas:</h4>
                      <ul className="space-y-1 text-neutral-300 list-disc list-inside">
                        <li>Direito Constitucional & Função Pública</li>
                        <li>Legislação Específica do Ministério</li>
                        <li>Língua Portuguesa & Comunicação</li>
                        <li>Estatuto Ético e Deontológico</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <h4 className="font-bold text-amber-400">Módulos Recomendados na Academia:</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedMinistry.moduleIds.map(mId => (
                        <button
                          key={mId}
                          onClick={() => {
                            setConcursoModalOpen(false);
                            onSelectModule(mId);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 font-bold text-xs border border-amber-500/40 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Estudar {mId.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setConcursoModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    Concluído
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 6. TAB: SISTEMA COMPLETO DE SIMULADOS & EXERCÍCIOS */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'simulados' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-neutral-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-white/20 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Motor de Simulados & Exames
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif">Simulados Inteligentes & Banco de Questões</h2>
              <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
                Pratique com questões reais de exames anteriores de acesso ao MININT, MED, MINSA, AGT e Função Pública com explicações detalhadas por opção.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  setActiveQuizMode('rapido');
                  setQuizQuestionIndex(0);
                  setQuizSelectedOption(null);
                  setQuizIsAnswered(false);
                  setQuizScore(0);
                }}
                className="px-5 py-3 rounded-2xl bg-white text-neutral-950 font-bold text-xs shadow-2xl hover:bg-neutral-100 transition-all cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Simulado Rápido (10 Questões)</span>
              </button>
            </div>
          </div>

          {/* Interactive Quiz Solver Section */}
          {activeQuizMode && quizPool.length > 0 ? (
            <div className="p-6 md:p-8 rounded-3xl border bg-white dark:bg-neutral-900 border-amber-500/40 space-y-6 shadow-xl relative animate-fadeIn">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
                    Questão {quizQuestionIndex + 1} de {Math.min(quizPool.length, activeQuizMode === 'rapido' ? 10 : 25)}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 font-mono">
                    Pontuação: {quizScore} acertos
                  </span>
                </div>
                <button
                  onClick={() => setActiveQuizMode(null)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
                >
                  Sair do Simulado
                </button>
              </div>

              {/* Question Box */}
              {quizPool[quizQuestionIndex] && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-500 tracking-wider">
                    {quizPool[quizQuestionIndex].examTip || 'Questão de Exame Oficial'}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 font-serif leading-relaxed">
                    {quizPool[quizQuestionIndex].question}
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {quizPool[quizQuestionIndex].options.map((opt, optIdx) => {
                      const isCorrect = optIdx === quizPool[quizQuestionIndex].correctAnswer;
                      const isSelected = quizSelectedOption === optIdx;

                      let btnStyle = 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50';
                      if (quizIsAnswered) {
                        if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                        else if (isSelected) btnStyle = 'bg-red-500/20 border-red-500 text-red-800 dark:text-red-300 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizIsAnswered}
                          onClick={() => {
                            setQuizSelectedOption(optIdx);
                            setQuizIsAnswered(true);
                            if (isCorrect) setQuizScore(prev => prev + 1);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[11px] font-mono font-bold flex-shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 mt-0.5">{opt}</span>
                          {quizIsAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                          {quizIsAnswered && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after answer */}
                  {quizIsAnswered && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2 animate-fadeIn">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block font-serif">Explicação Fundamentada:</span>
                      <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        {quizPool[quizQuestionIndex].explanation}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            const maxQ = Math.min(quizPool.length, activeQuizMode === 'rapido' ? 10 : 25);
                            if (quizQuestionIndex + 1 < maxQ) {
                              setQuizQuestionIndex(prev => prev + 1);
                              setQuizSelectedOption(null);
                              setQuizIsAnswered(false);
                            } else {
                              alert(`Simulado Concluído! Você acertou ${quizScore} de ${maxQ} questões.`);
                              setActiveQuizMode(null);
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                        >
                          <span>Próxima Questão</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Zap className="w-5 h-5" />
                  <span>Simulado Rápido de Fixação</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">10 questões selecionadas aleatoriamente para teste rápido de 10 minutos.</p>
                <button
                  onClick={() => {
                    setActiveQuizMode('rapido');
                    setQuizQuestionIndex(0);
                    setQuizSelectedOption(null);
                    setQuizIsAnswered(false);
                    setQuizScore(0);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Iniciar Simulado Rápido
                </button>
              </div>

              <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Brain className="w-5 h-5" />
                  <span>Simulado Completo do Concurso</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Exame intensivo cobrindo Constituição, DPA 21 Províncias, LGT e Ética.</p>
                <button
                  onClick={() => {
                    setActiveQuizMode('completo');
                    setQuizQuestionIndex(0);
                    setQuizSelectedOption(null);
                    setQuizIsAnswered(false);
                    setQuizScore(0);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Iniciar Exame Completo
                </button>
              </div>

              <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <FileCheck className="w-5 h-5" />
                  <span>Prática por Módulo Legal</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Escolha o diploma legal específico (CRA, LGT ou MININT) para resolução guiada.</p>
                <button
                  onClick={() => onSelectModule('constituição')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Selecionar Módulo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 7. TAB: FAVORITOS E ANOTAÇÕES DO CANDIDATO */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'favorites' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-500" />
              <span>Artigos Favoritados & Anotações Salvas</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Seus artigos, capítulos e leis salvas para revisão rápida antes da prova.
            </p>
          </div>

          {bookmarkedArticles.length === 0 ? (
            <div className="p-8 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Nenhum artigo favoritado ainda</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Durante a leitura de qualquer módulo na Biblioteca, clique no ícone de marcador para salvar o artigo nesta secção.
              </p>
              <button
                onClick={() => handleTabChange('biblioteca')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Biblioteca Digital</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedArticles.map(art => (
                <div key={art.id} className="p-5 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">{art.code}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold">Salvo</span>
                  </div>
                  <h3 className="text-sm font-bold font-serif">{art.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{art.simpleExplanation || art.definition}</p>
                  <button
                    onClick={() => onSelectModule('constituição', art.id)}
                    className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Ler Artigo na Íntegra</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 8. TAB: HISTÓRICO DE LEITURA & ATIVIDADE */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <History className="w-6 h-6 text-amber-500" />
              <span>Histórico de Leitura & Atividade do Candidato</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Continue exatamente de onde parou nos seus últimos diplomas lidos e simulados resolvidos.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold font-serif text-neutral-800 dark:text-neutral-200">Últimos Artigos Concluídos ({studiedArticles.length})</h3>
            {studiedArticles.length === 0 ? (
              <div className="p-6 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 text-center text-xs text-neutral-500">
                Nenhum histórico registado. Comece a ler os módulos na biblioteca para acompanhar o progresso.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {studiedArticles.slice(-6).map(art => (
                  <div key={art.id} className="p-4 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                    <div className="truncate">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs block">{art.code}</span>
                      <h4 className="text-xs font-bold truncate">{art.title}</h4>
                    </div>
                    <button
                      onClick={() => onSelectModule('constituição', art.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-600 dark:text-amber-300 hover:text-neutral-950 font-bold text-xs flex-shrink-0 cursor-pointer"
                    >
                      Continuar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 9. TAB: DOWNLOADS & GESTÃO OFFLINE */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'downloads' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <FolderDown className="w-6 h-6 text-amber-500" />
              <span>Downloads & Gestão de Conteúdo Offline</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Todos os diplomas, leis e simulados estão armazenados na memória local (IndexedDB) para estudo sem internet.
            </p>
          </div>

          <SyncManagementView />
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 10. TAB: PERFIL E PAINEL DO ESTUDANTE */}
      {/* ------------------------------------------------------------------- */}
      {(activeTab === 'perfil' || activeTab === 'progresso') && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-amber-500" />
              <span>Painel do Candidato & Estatísticas de Desempenho</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Acompanhamento completo de dias consecutivos, tempo de estudo, taxa de acertos e certificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-500">
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">{isAuthenticated ? user?.name : 'Candidato Aprovado'}</h3>
                  <span className="text-xs text-neutral-500">{isAuthenticated ? user?.email : 'NIP: 2026-ANG-JOB'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status da Conta:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Ativa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Concurso Alvo:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">MININT / MAPTSS / MED</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block font-mono">Dias Consecutivos (Streak)</span>
              <div className="text-4xl font-black font-mono text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Flame className="w-8 h-8 text-amber-500 fill-amber-500" />
                <span>5 Dias</span>
              </div>
              <p className="text-xs text-neutral-500">Estudo diário ativado na plataforma</p>
            </div>

            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block font-mono">Progresso Geral</span>
              <div className="text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {overallPercentage}%
              </div>
              <p className="text-xs text-neutral-500">{studiedCount} de {totalArticles} artigos concluídos</p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 11. TAB: DEFINIÇÕES & CONFIGURAÇÕES */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'definicoes' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <Settings className="w-6 h-6 text-amber-500" />
              <span>Definições da Aplicação & Sincronização</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Personalize a aparência, tamanho de fonte, sincronização de cache e acessibilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold font-serif text-amber-600 dark:text-amber-400">Aparência e Leitura</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span>Tema Visual:</span>
                  <span className="font-bold font-mono text-amber-500 uppercase">{theme}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Idioma da Plataforma:</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">Português (Angola PT-AO)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Modo Offline:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Ativo (IndexedDB)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold font-serif text-amber-600 dark:text-amber-400">Armazenamento & Reindexação</h3>
              <p className="text-xs text-neutral-500">Caso adicione novos diplomas ou deseje limpar o cache local, reindexe a base de conhecimento.</p>
              <button
                onClick={async () => {
                  await forceReindexDatabase();
                  alert('KnowledgeBase reindexada com sucesso no IndexedDB!');
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Forçar Reindexação IndexedDB</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. FOOTER INSTITUCIONAL */}
      <footer className="mt-8 pt-6 pb-4 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-700 dark:text-neutral-300">
            Academia das Carreiras Públicas & Legislação
          </span>
          <span className="text-neutral-400">•</span>
          <span>República de Angola</span>
        </div>

        <div className="flex items-center gap-6">
          <JobExpressLink
            source="footer"
            utmSource="preparatorio"
            campaign="footer_partner_link"
          />
        </div>
      </footer>
    </div>
  );
};
