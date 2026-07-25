import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MODULES, getAllArticlesInModule } from '../data';

import { ALL_CONCURSOS } from '../data/concursos';
import { ModuleId, UserProgress, MinistryConcurso } from '../types/minint';
import { KnowledgeBase } from '../data/KnowledgeBase';
import { searchIndexedDB, IndexedSearchResult } from '../lib/indexedDbSearch';
import { SyncManagementView } from './SyncManagementView';
import { JOBEXPRESS_URL } from '../lib/vitronisAuth';
import { useVitronisAuth } from '../hooks/useVitronisAuth';
import { JobExpressLink } from './JobExpressLink';

import { CentralRepository } from '../data/CentralRepository';
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
  Globe
} from 'lucide-react';

interface HomePortalProps {
  onSelectModule: (moduleId: ModuleId, articleId?: string) => void;
  progress: UserProgress;
  theme: 'light' | 'dark' | 'sepia';
  onOpenQuickFind: () => void;
  onOpenStatsModal: () => void;
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
  onOpenStatsModal
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const [activeTab, setActiveTab] = useState<'inicio' | 'biblioteca' | 'concursos' | 'simulados' | 'progresso' | 'perfil' | 'definicoes'>('inicio');
  const [selectedMinistry, setSelectedMinistry] = useState<MinistryConcurso>(ALL_CONCURSOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IndexedSearchResult[]>([]);
  const [showJobExpressModal, setShowJobExpressModal] = useState(false);

  const { user, isAuthenticated, login, logout } = useVitronisAuth();

  // Navegação para JobExpress com rastreio de engajamento
  const handleNavigateJobExpress = (source: string = 'home_portal_banner') => {
    const targetUrl = JOBEXPRESS_URL;

    // Rastreio discreto de cliques para análise de engajamento na plataforma
    try {
      const existing = JSON.parse(localStorage.getItem('jobexpress_engagement_analytics') || '[]');
      existing.push({
        event: 'jobexpress_partner_click',
        source,
        url: targetUrl,
        timestamp: Date.now(),
        dateISO: new Date().toISOString()
      });
      localStorage.setItem('jobexpress_engagement_analytics', JSON.stringify(existing.slice(-100)));
    } catch (e) {
      // Ignorar erros de localStorage
    }

    // Abrir instantaneamente em nova aba com atributos de segurança
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

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

  // Total calculation for stats
  const totalArticles = useMemo(() => KnowledgeBase.getAllArticles().length, []);
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
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Plataforma Permanente
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
              Academia das Carreiras Públicas
            </h1>
            <p className="text-base md:text-xl text-amber-200/90 font-medium mt-2">
              Prepare-se gratuitamente para concursos públicos em Angola.
            </p>
          </div>

          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            Sua biblioteca digital única para o Ministério do Interior, Educação, Saúde, Administração Pública e Governos Locais. Pesquise diplomas, estude por capítulos e pratique com simulados.
          </p>

          {/* Quick Search Bar */}
          <div className="relative pt-2 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar concurso, diploma legal, artigo ou tema de cultura geral..."
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
                  Resultados da Pesquisa na IndexedDB ({searchResults.length})
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

      {/* 2. NAVIGATION TABS (MENU PRINCIPAL REORGANIZADO) */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('inicio')}
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
          onClick={() => setActiveTab('biblioteca')}
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
          onClick={() => setActiveTab('concursos')}
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
          onClick={() => setActiveTab('simulados')}
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
          onClick={() => setActiveTab('progresso')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'progresso'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Meu Progresso</span>
        </button>

        <button
          onClick={() => setActiveTab('perfil')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'perfil'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Perfil</span>
        </button>

        <button
          onClick={() => setActiveTab('definicoes')}
          className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'definicoes'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Sincronização & Definições</span>
        </button>
      </div>


      {/* 3. TAB: INÍCIO (PORTAL INICIAL) */}
      {activeTab === 'inicio' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/60 to-neutral-950 border border-amber-500/30 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Portal Oficial das Carreiras Públicas em Angola
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                Prepare-se com Segurança, Legislação Oficial & Exercícios Práticos
              </h2>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Acesse o repositório centralizado de leis, normas da CRA 2010/2021, Regulamento de Carreiras da PNA, DPA 21 Províncias e simulados focados nos exames de acesso.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('concursos')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Ver Concursos Abertos</span>
                </button>
                <button
                  onClick={() => setActiveTab('biblioteca')}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center gap-2 border border-neutral-700 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Explorar Biblioteca Única</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo de Dados do Repositório Centralizado */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 dark:text-neutral-400">
                Artigos & Legislação
              </span>
              <div className="text-xl md:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                {CentralRepository.legislacao.length}
              </div>
              <p className="text-[11px] text-neutral-500">Normalizados e explicados</p>
            </div>

            <div className="p-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 dark:text-neutral-400">
                Documentos & Diários
              </span>
              <div className="text-xl md:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                {CentralRepository.documentos.length}
              </div>
              <p className="text-[11px] text-neutral-500">Editais e Leis em PDF</p>
            </div>

            <div className="p-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 dark:text-neutral-400">
                Banco de Questões
              </span>
              <div className="text-xl md:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                {CentralRepository.simulados.length}
              </div>
              <p className="text-[11px] text-neutral-500">Perguntas com gabarito</p>
            </div>

            <div className="p-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 dark:text-neutral-400">
                Módulos de Estudo
              </span>
              <div className="text-xl md:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                {ALL_MODULES.length}
              </div>
              <p className="text-[11px] text-neutral-500">Organizados por prioridade</p>
            </div>
          </div>

          {/* Acesso Rápido aos Módulos de Estudo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-serif flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Módulos de Preparação Obrigatória</span>
              </h3>
              <button
                onClick={() => setActiveTab('biblioteca')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_MODULES.slice(0, 6).map(mod => (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className="p-4 rounded-2xl border bg-white dark:bg-neutral-900 hover:border-amber-500/50 border-neutral-200 dark:border-neutral-800 text-left transition-all hover:shadow-md cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 block">
                      {mod.hierarchyLabel}
                    </span>
                    <h4 className="text-sm font-bold group-hover:text-amber-500 transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB: MEU PROGRESSO */}
      {activeTab === 'progresso' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-amber-500" />
                <span>Desempenho & Progresso de Estudo</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Acompanhamento detalhado do seu avanço nos módulos da legislação pública.
              </p>
            </div>
            <button
              onClick={onOpenStatsModal}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Painel Detalhado</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-500">Artigos Lido & Estudados</span>
              <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {progress.studiedArticleIds.length}
              </div>
              <p className="text-xs text-neutral-500">Artigos marcados como concluídos</p>
            </div>

            <div className="p-5 rounded-3xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-500">Artigos Favoritados</span>
              <div className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">
                {progress.bookmarkedArticleIds.length}
              </div>
              <p className="text-xs text-neutral-500">Guares salvos para revisão rápida</p>
            </div>

            <div className="p-5 rounded-3xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-500">Simulados Realizados</span>
              <div className="text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                {Object.keys(progress.quizScores).length}
              </div>
              <p className="text-xs text-neutral-500">Testes de fixação de conhecimento</p>
            </div>
          </div>

          {/* Módulos com Barra de Progresso */}
          <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-base font-bold font-serif">Avanço Por Módulo de Estudo</h3>
            <div className="space-y-3">
              {ALL_MODULES.map(mod => {
                const articles = getAllArticlesInModule(mod);
                const studied = articles.filter(a => progress.studiedArticleIds.includes(a.id)).length;

                const pct = articles.length > 0 ? Math.round((studied / articles.length) * 100) : 0;

                return (
                  <div key={mod.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{mod.title}</span>
                      <span className="font-mono text-amber-500 font-bold">{pct}% ({studied}/{articles.length})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB: PERFIL DO CANDIDATO */}
      {activeTab === 'perfil' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-amber-500" />
              <span>Perfil do Candidato & Integração SSO</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Gerencie a sua conta de acesso unificada e preferências de estudo na Academia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cartão de Estado da Conta SSO */}
            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    {isAuthenticated ? user?.name : 'Candidato Visitante'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {isAuthenticated ? user?.email : 'Acesso Local Sem Autenticação'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Provedor de Identidade:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">JobExpress Angola SSO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Estado de Validação:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ativo
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="w-full py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Encerrar Sessão</span>
                  </button>
                ) : (
                  <button
                    onClick={() => login()}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Entrar via JobExpress SSO</span>
                  </button>
                )}
              </div>
            </div>

            {/* Acesso Direto às Configurações e Sincronização */}
            <div className="p-6 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-500">
                  <Database className="w-5 h-5" />
                  <h3 className="text-base font-bold font-serif">Banco de Dados Offline & Ajustes</h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Consulte os dados indexados em IndexedDB para estudo 100% offline sem consumir dados móveis.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('definicoes')}
                className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-amber-400 hover:bg-neutral-800 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Gerir Definições & Sincronização</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 1: CONCURSOS POR MINISTÉRIO */}
      {activeTab === 'concursos' && (

        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif">Concursos Públicos em Destaque</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Selecione o Ministério para ver os diplomas e temas específicos exigidos na prova.
              </p>
            </div>
            <span className="hidden sm:inline text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
              6 Carreiras Organizadas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_CONCURSOS.map((conc) => {
              const isSelected = selectedMinistry.id === conc.id;
              return (
                <div
                  key={conc.id}
                  onClick={() => setSelectedMinistry(conc)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                      : isDark
                      ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      : isSepia
                      ? 'bg-[#f4ead5] border-[#ded0b1] hover:border-[#c4b18c]'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                        {ICON_MAP[conc.iconName] || <Building2 className="w-5 h-5 text-amber-500" />}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px]">
                        {conc.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold font-serif">{conc.ministryName}</h3>
                      <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400">
                        {conc.shortName}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">
                      {conc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Tópicos Exigidos:
                    </span>
                    <ul className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
                      {conc.keyTopics.slice(0, 2).map((top, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="truncate">{top}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open first module associated with this contest
                        onSelectModule(conc.moduleIds[0]);
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Estudar Este Concurso</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TAB 2: BIBLIOTECA ÚNICA */}
      {activeTab === 'biblioteca' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif">Biblioteca Única e Reutilizável</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Todos os diplomas, leis e matérias organizadas numa única fonte permanente de conhecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_MODULES.map((mod) => {
              const totalArts = mod.chapters.reduce((acc, chap) => {
                let count = (chap.articles || []).length;
                if (chap.sections) {
                  chap.sections.forEach(s => count += s.articles.length);
                }
                return acc + count;
              }, 0);

              const studiedInMod = progress.studiedArticleIds.filter(id =>
                mod.chapters.some(c =>
                  (c.articles || []).some(a => a.id === id) ||
                  (c.sections || []).some(s => s.articles.some(a => a.id === id))
                )
              ).length;

              const pct = totalArts > 0 ? Math.round((studiedInMod / totalArts) * 100) : 0;

              return (
                <div
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-4 hover:shadow-lg ${
                    isDark
                      ? 'bg-neutral-900/80 border-neutral-800 hover:border-amber-500/50'
                      : isSepia
                      ? 'bg-[#f4ead5] border-[#ded0b1] hover:border-[#c4b18c]'
                      : 'bg-white border-neutral-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      {pct}% Concluído
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-serif">{mod.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                      {mod.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{totalArts} artigos indexados</span>
                      <span>{studiedInMod} estudados</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <span>Abrir Módulo de Leitura</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Repositório Único de Documentos & Legislação em PDF */}
          <div className="p-6 rounded-3xl border bg-neutral-900 text-white border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-amber-400 flex items-center gap-2">
                  <FolderDown className="w-5 h-5 text-amber-400" />
                  <span>Repositório de Documentos & Diários da República</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Acesso aos ficheiros e legislação na íntegra para download e leitura offline.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold hidden sm:inline">
                {CentralRepository.documentos.length} Documentos Unificados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CentralRepository.documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">
                      {doc.category}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-200 line-clamp-1">{doc.title}</h4>
                    <p className="text-[10px] text-neutral-400 font-mono">{doc.type.toUpperCase()} • {doc.sizeFormatted} • Atualizado em {doc.lastUpdated}</p>
                  </div>
                  <a
                    href={doc.downloadUrl || JOBEXPRESS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all flex-shrink-0 cursor-pointer"
                    title="Baixar Ficheiro / Consultar Documento"
                  >
                    <FolderDown className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* 5. TAB 3: SIMULADOS & EXERCÍCIOS */}
      {activeTab === 'simulados' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/20 font-bold text-xs uppercase tracking-wider">
                Simulador Inteligente
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif">SmartQuiz IA & Exames Anteriores</h2>
              <p className="text-xs md:text-sm opacity-90 max-w-xl">
                Testes adaptativos de pegadinhas, casos práticos e legislação. Avalie seu conhecimento antes da prova oficial do concurso.
              </p>
            </div>

            <button
              onClick={() => onSelectModule('constituição')}
              className="px-6 py-3 rounded-2xl bg-white text-neutral-950 font-bold text-sm shadow-2xl hover:bg-neutral-100 transition-all cursor-pointer flex-shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Iniciar Simulado Agora</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Flame className="w-5 h-5" />
                <span>Casos Práticos de Polícia & Função Pública</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Questões formuladas no padrão do Instituto Nacional de Gestão de Bolsas de Estudo (INAGBE) e Ministério do Interior.
              </p>
              <button
                onClick={() => onSelectModule('policia')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline"
              >
                Praticar Módulo Policial ›
              </button>
            </div>

            <div className="p-5 rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                <Layers className="w-5 h-5" />
                <span>Flashcards de Memorização Rápida</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Cartões interativos de repetição espaçada com datas de efemérides, artigos constitucionais e limites das 21 províncias.
              </p>
              <button
                onClick={() => onSelectModule('cultura_geral')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline"
              >
                Ver Flashcards DPA ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: VISÃO & FASES DO ECOSSISTEMA */}
      {activeTab === 'fases' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif">Evolução do Ecossistema de Carreiras</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Transformando a preparação em oportunidade profissional contínua para o cidadão angolano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FASE 1 */}
            <div className="p-6 rounded-3xl border bg-amber-500/10 border-amber-500/40 space-y-3 relative overflow-hidden">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-black text-[10px] uppercase">
                Fase 1 (Atual)
              </span>
              <h3 className="text-lg font-bold font-serif">Preparação Gratuita para Concursos</h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Plataforma com foco nos concursos ativos de Segurança, Educação, Saúde e Administração Pública de Angola.
              </p>
            </div>

            {/* FASE 2 */}
            <div className="p-6 rounded-3xl border bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 space-y-3">
              <span className="px-3 py-1 rounded-full bg-neutral-300 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-[10px] uppercase">
                Fase 2 (Em Expansão)
              </span>
              <h3 className="text-lg font-bold font-serif">Biblioteca Permanente da Administração</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Repositório oficial de leis, regulamentos, manuais e guias práticos sobre a Função Pública em Angola.
              </p>
            </div>

            {/* FASE 3 */}
            <div className="p-6 rounded-3xl border bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 space-y-3">
              <span className="px-3 py-1 rounded-full bg-neutral-300 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-[10px] uppercase">
                Fase 3 (Visão Futura)
              </span>
              <h3 className="text-lg font-bold font-serif">Aprendizagem Contínua & Oportunidades</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Cursos rápidos, certificados digitais e integração direta com a **JobExpress Angola** para vagas no mercado de trabalho.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 5: DEFINIÇÕES & SINCRONIZAÇÃO */}
      {activeTab === 'definicoes' && (
        <SyncManagementView theme={theme} />
      )}

      {/* 7. ⭐ DESTAQUE ECOSSISTEMA JOBEXPRESS ANGOLA */}
      <section className="p-6 md:p-8 rounded-3xl border bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border-amber-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              ⭐ Parceiro Oficial
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              Desenvolvido pela JobExpress Angola
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-serif text-white">
            JobExpress Angola — Oportunidades no Mercado de Trabalho
          </h3>

          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
            Enquanto se prepara para o concurso público, descubra também oportunidades de emprego, prestação de serviços e biscates no mercado de trabalho em Angola.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
          <JobExpressLink
            source="home_portal_banner"
            campaign="portal_banner_cta"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-bold text-xs md:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-neutral-950" />
            <span>Conhecer Gratuitamente</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-950 ml-0.5" />
          </JobExpressLink>

          <button
            onClick={() => setShowJobExpressModal(true)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 border border-neutral-700 transition-all cursor-pointer"
          >
            <span>Saber Mais</span>
          </button>
        </div>
      </section>

      {/* 8. FOOTER INSTITUCIONAL */}
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

      {/* 9. MODAL INFORMATIVO JOBEXPRESS */}
      {showJobExpressModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-5 text-neutral-100 shadow-2xl relative">
            <button
              onClick={() => setShowJobExpressModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-amber-400">JobExpress Angola</h3>
                <p className="text-xs text-neutral-400">Mercado de Trabalho, Emprego e Serviços</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              A <strong>JobExpress Angola</strong> é a plataforma parceira que conecta candidatos a vagas de emprego, prestação de serviços independentes e oportunidades profissionais em todo o território nacional.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <span className="font-bold text-amber-300 block">Como ajuda a sua carreira?</span>
              <ul className="space-y-1.5 text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Encontre trabalhos temporários enquanto aguarda o resultado dos exames.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Cadastre o seu perfil profissional e portfólio de serviços.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Receba notificações diretas de recrutadores.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowJobExpressModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold"
              >
                Voltar aos Estudos
              </button>
              <JobExpressLink
                source="home_portal_modal"
                campaign="portal_modal_cta"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Visitar JobExpress</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </JobExpressLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
