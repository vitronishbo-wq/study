import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ALL_MODULES, getAllArticlesInModule } from '../data';
import { UserProgress } from '../types/minint';
import {
  X,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Brain,
  Layers,
  HelpCircle,
  BarChart2,
  Sparkles,
  Target
} from 'lucide-react';

interface StudyStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  theme: 'light' | 'dark' | 'sepia';
  onSelectModule?: (moduleId: string) => void;
}

const MODULE_COLORS: Record<string, string> = {
  constituição: '#3b82f6', // Blue
  minint: '#10b981',      // Emerald
  policia: '#f59e0b',     // Amber
  historia: '#8b5cf6',    // Purple
  cultura_geral: '#ec4899' // Pink
};

export const StudyStatsModal: React.FC<StudyStatsModalProps> = ({
  isOpen,
  onClose,
  progress,
  theme,
  onSelectModule
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Calculate statistics across all modules
  const statsData = useMemo(() => {
    let globalTotalArticles = 0;
    let globalStudiedArticles = 0;
    let totalQuizCorrect = 0;
    let totalQuizQuestions = 0;
    let totalQuizzesAttempted = 0;

    // Calculate Quiz Scores from progress.quizScores
    if (progress.quizScores) {
      Object.values(progress.quizScores).forEach((q: any) => {
        if (q && typeof q.correct === 'number' && typeof q.total === 'number' && q.total > 0) {
          totalQuizCorrect += q.correct;
          totalQuizQuestions += q.total;
          totalQuizzesAttempted += 1;
        }
      });
    }

    const quizAccuracyRate =
      totalQuizQuestions > 0 ? Math.round((totalQuizCorrect / totalQuizQuestions) * 100) : 0;

    const moduleBreakdown = ALL_MODULES.map(mod => {
      const articles = getAllArticlesInModule(mod);
      const total = articles.length;
      const studied = articles.filter(a => progress.studiedArticleIds.includes(a.id)).length;
      const percentage = total > 0 ? Math.round((studied / total) * 100) : 0;

      // Calculate Quiz accuracy for this specific module
      let modQuizCorrect = 0;
      let modQuizTotal = 0;
      let modQuizAttempts = 0;

      articles.forEach(art => {
        const qScore = progress.quizScores?.[art.id];
        if (qScore && qScore.total > 0) {
          modQuizCorrect += qScore.correct;
          modQuizTotal += qScore.total;
          modQuizAttempts += 1;
        }
      });

      const modQuizAccuracy =
        modQuizTotal > 0 ? Math.round((modQuizCorrect / modQuizTotal) * 100) : null;

      globalTotalArticles += total;
      globalStudiedArticles += studied;

      return {
        id: mod.id,
        title: mod.title,
        shortTitle: mod.shortTitle,
        total,
        studied,
        pending: total - studied,
        percentage,
        color: MODULE_COLORS[mod.id] || '#f59e0b',
        modQuizCorrect,
        modQuizTotal,
        modQuizAttempts,
        modQuizAccuracy
      };
    });

    const globalPercentage =
      globalTotalArticles > 0 ? Math.round((globalStudiedArticles / globalTotalArticles) * 100) : 0;

    // Donut Chart 1: Concluídos vs Pendentes
    const readingDonutData = [
      { name: 'Tópicos Lidos', value: globalStudiedArticles, color: '#10b981' },
      { name: 'A Ler / Pendentes', value: globalTotalArticles - globalStudiedArticles, color: isDark ? '#334155' : '#cbd5e1' }
    ];

    // Donut Chart 2: Taxa de Acerto Quizes (Acertos vs Erros)
    const quizDonutData = [
      { name: 'Respostas Correctas', value: totalQuizCorrect, color: '#10b981' },
      {
        name: 'Incorreções',
        value: Math.max(0, totalQuizQuestions - totalQuizCorrect),
        color: totalQuizQuestions === 0 ? (isDark ? '#334155' : '#e2e8f0') : '#ef4444'
      }
    ];

    // Module Reading Progress Donut (Slices per module lidos)
    const moduleDonutData = moduleBreakdown.map(m => ({
      name: m.shortTitle,
      value: m.studied,
      total: m.total,
      color: m.color
    }));

    return {
      globalTotalArticles,
      globalStudiedArticles,
      globalPercentage,
      totalQuizCorrect,
      totalQuizQuestions,
      totalQuizzesAttempted,
      quizAccuracyRate,
      moduleBreakdown,
      readingDonutData,
      quizDonutData,
      moduleDonutData
    };
  }, [progress, isDark]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="study-stats-modal-container"
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 transition-all ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100 shadow-black/80'
            : isSepia
            ? 'bg-[#f7f0df] border-[#dfd2b5] text-[#3d2f1f]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-bold">Painel de Estatísticas de Estudo</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Desempenho Concurso PNA
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Acompanhamento em tempo real de leitura dos diplomas e acertos nos testes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-stats-modal"
            className="p-2 rounded-xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Key Metrics Banner (KPIs) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* KPI 1: Progresso Global */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : isSepia ? 'bg-[#f0e4cc] border-[#ded0b1]' : 'bg-amber-50/60 border-amber-200/80'
          }`}>
            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Progresso Global</span>
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-800 dark:text-amber-300">
                {statsData.globalPercentage}%
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {statsData.globalStudiedArticles} de {statsData.globalTotalArticles} tópicos lidos
              </p>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${statsData.globalPercentage}%` }}
              />
            </div>
          </div>

          {/* KPI 2: Taxa de Acerto nos Quizes */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : isSepia ? 'bg-[#f0e4cc] border-[#ded0b1]' : 'bg-emerald-50/60 border-emerald-200/80'
          }`}>
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Taxa de Acerto</span>
              <Target className="w-4 h-4" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                {statsData.totalQuizQuestions > 0 ? `${statsData.quizAccuracyRate}%` : 'N/A'}
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {statsData.totalQuizCorrect} de {statsData.totalQuizQuestions} respostas certas
              </p>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${statsData.quizAccuracyRate}%` }}
              />
            </div>
          </div>

          {/* KPI 3: Quizes Realizados */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : isSepia ? 'bg-[#f0e4cc] border-[#ded0b1]' : 'bg-blue-50/60 border-blue-200/80'
          }`}>
            <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Quizes Feitos</span>
              <Brain className="w-4 h-4" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-blue-600 dark:text-blue-400">
                {statsData.totalQuizzesAttempted}
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Testes e questionários concluídos
              </p>
            </div>
            <div className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Validados com IA
            </div>
          </div>

          {/* KPI 4: Conclusão Geral do Plano */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/60 border-neutral-800' : isSepia ? 'bg-[#f0e4cc] border-[#ded0b1]' : 'bg-purple-50/60 border-purple-200/80'
          }`}>
            <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Estado de Leitura</span>
              <Award className="w-4 h-4" />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-purple-600 dark:text-purple-400">
                {statsData.globalTotalArticles - statsData.globalStudiedArticles}
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Tópicos pendentes para estudar
              </p>
            </div>
            <div className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {statsData.globalStudiedArticles} Lidos
            </div>
          </div>
        </div>

        {/* Main Charts Row: 2 Gráficos de Rosca (Donut Charts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Donut Chart 1: Progresso de Leitura */}
          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/40 border-neutral-800' : isSepia ? 'bg-[#f3e8d2] border-[#dfd2b5]' : 'bg-neutral-50/80 border-neutral-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  Gráfico de Rosca: Progresso de Leitura
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Proporção de artigos concluídos vs pendentes
                </p>
              </div>
            </div>

            {/* Recharts Donut Chart */}
            <div className="h-56 relative flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData.readingDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statsData.readingDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={isDark ? '#171717' : '#ffffff'} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#171717' : '#ffffff',
                      borderColor: isDark ? '#404040' : '#e5e5e5',
                      borderRadius: '12px',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Inner Center Overlay Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {statsData.globalPercentage}%
                </span>
                <span className="text-[10px] font-bold uppercase text-neutral-400">Concluído</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs font-medium pt-2 border-t border-neutral-200/50 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Lidos ({statsData.globalStudiedArticles})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <span>Pendentes ({statsData.globalTotalArticles - statsData.globalStudiedArticles})</span>
              </div>
            </div>
          </div>

          {/* Donut Chart 2: Taxa de Acerto nos Quizes */}
          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950/40 border-neutral-800' : isSepia ? 'bg-[#f3e8d2] border-[#dfd2b5]' : 'bg-neutral-50/80 border-neutral-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  Gráfico de Rosca: Acertos nos Quizes
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Respostas certas vs incorretas registradas
                </p>
              </div>
            </div>

            {/* Recharts Donut Chart */}
            <div className="h-56 relative flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData.quizDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statsData.quizDonutData.map((entry, index) => (
                      <Cell key={`quiz-cell-${index}`} fill={entry.color} stroke={isDark ? '#171717' : '#ffffff'} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#171717' : '#ffffff',
                      borderColor: isDark ? '#404040' : '#e5e5e5',
                      borderRadius: '12px',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Inner Center Overlay Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {statsData.totalQuizQuestions > 0 ? `${statsData.quizAccuracyRate}%` : '0%'}
                </span>
                <span className="text-[10px] font-bold uppercase text-neutral-400">Precisão</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs font-medium pt-2 border-t border-neutral-200/50 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Acertos ({statsData.totalQuizCorrect})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>Incorreções ({Math.max(0, statsData.totalQuizQuestions - statsData.totalQuizCorrect)})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Bar Chart: Progresso por Módulo */}
        <div className={`p-5 rounded-3xl border mb-8 ${
          isDark ? 'bg-neutral-950/40 border-neutral-800' : isSepia ? 'bg-[#f3e8d2] border-[#dfd2b5]' : 'bg-neutral-50/80 border-neutral-200'
        }`}>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              Comparativo de Leitura por Módulo
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Número de tópicos lidos em cada um dos 5 módulos do programa.
            </p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData.moduleBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#262626' : '#e5e5e5'} vertical={false} />
                <XAxis
                  dataKey="shortTitle"
                  tick={{ fill: isDark ? '#a3a3a3' : '#525252', fontSize: 11 }}
                  axisLine={{ stroke: isDark ? '#404040' : '#d4d4d4' }}
                />
                <YAxis
                  tick={{ fill: isDark ? '#a3a3a3' : '#525252', fontSize: 11 }}
                  axisLine={{ stroke: isDark ? '#404040' : '#d4d4d4' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#171717' : '#ffffff',
                    borderColor: isDark ? '#404040' : '#e5e5e5',
                    borderRadius: '12px',
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: any) => [
                    `${value} tópicos`,
                    name === 'studied' ? 'Lidos' : 'Total'
                  ]}
                />
                <Bar dataKey="studied" name="Lidos" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="total" name="Total do Módulo" fill={isDark ? '#334155' : '#cbd5e1'} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Per-Module Table Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            Detalhamento por Módulo e Taxa de Acerto de Quiz
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {statsData.moduleBreakdown.map(mod => (
              <div
                key={mod.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark
                    ? 'bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700'
                    : isSepia
                    ? 'bg-[#f6ebd7] border-[#ded0b1]'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                }`}
              >
                {/* Module Title & Progress Ring */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white flex-shrink-0"
                    style={{ backgroundColor: mod.color }}
                  >
                    {mod.percentage}%
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {mod.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {mod.studied} de {mod.total} tópicos lidos ({mod.percentage}%)
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Quiz Accuracy Badge */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Quiz Score Badge */}
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Acerto Quizes</span>
                    <span className={`text-xs font-mono font-bold ${
                      mod.modQuizAccuracy === null
                        ? 'text-neutral-400'
                        : mod.modQuizAccuracy >= 70
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {mod.modQuizAccuracy !== null ? `${mod.modQuizAccuracy}% (${mod.modQuizCorrect}/${mod.modQuizTotal})` : 'Sem testes'}
                    </span>
                  </div>

                  {/* Navigation Button */}
                  {onSelectModule && (
                    <button
                      onClick={() => {
                        onSelectModule(mod.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all text-neutral-700 dark:text-neutral-200 flex-shrink-0 cursor-pointer"
                    >
                      Estudar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
