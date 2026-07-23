import React from 'react';
import { ConceptArticle } from '../types/minint';
import { AlertTriangle, CheckCircle2, Bookmark } from 'lucide-react';

interface SummaryViewProps {
  article: ConceptArticle;
  theme: 'light' | 'dark' | 'sepia';
  isStudied: boolean;
  onToggleStudied: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  article,
  theme,
  isStudied,
  onToggleStudied,
  isBookmarked,
  onToggleBookmark
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Article Code & Title */}
      <div className="border-b pb-4 border-neutral-200 dark:border-neutral-800 flex items-start justify-between">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {article.code} • Resumo Focado
          </span>
          <h1 className="text-2xl font-serif font-bold mt-1 text-neutral-900 dark:text-neutral-100">
            {article.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remover dos Favoritos' : 'Guardar nos Favoritos'}
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : 'border-neutral-300 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onToggleStudied}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isStudied
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                : 'border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isStudied ? 'Estudado' : 'Marcar Estudado'}
          </button>
        </div>
      </div>

      {/* Core Definition Summary */}
      <div
        className={`p-4 rounded-xl border ${
          isDark
            ? 'bg-neutral-900/60 border-neutral-800 text-neutral-200'
            : isSepia
            ? 'bg-[#f5ebd6] border-[#dfd2b5] text-[#3d2f1f]'
            : 'bg-neutral-50 border-neutral-200 text-neutral-800'
        }`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
          Síntese Concisa
        </span>
        <p className="text-sm font-medium leading-relaxed">{article.definition}</p>
      </div>

      {/* Important Points Bullet Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Pontos-Chave para Memorização
        </h3>
        <ul className="space-y-2">
          {article.importantPoints.map((pt, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-lg border flex items-start gap-3 text-sm leading-relaxed ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300'
                  : isSepia
                  ? 'bg-[#faf3e3] border-[#e6d8b8] text-[#423323]'
                  : 'bg-white border-neutral-200 text-neutral-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exam Alert if available */}
      {article.examAlert && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            isDark
              ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-0.5">Atenção para Exame de Concurso:</span>
            {article.examAlert}
          </div>
        </div>
      )}
    </div>
  );
};
