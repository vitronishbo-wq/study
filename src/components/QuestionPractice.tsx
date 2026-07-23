import React, { useState } from 'react';
import { ExamQuestion } from '../types/minint';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface QuestionPracticeProps {
  questions: ExamQuestion[];
  theme: 'light' | 'dark' | 'sepia';
  articleTitle: string;
  onSaveScore?: (correct: number, total: number) => void;
}

export const QuestionPractice: React.FC<QuestionPracticeProps> = ({
  questions,
  theme,
  articleTitle,
  onSaveScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-neutral-500">
        Nenhuma questão de exame cadastrada para este conceito neste momento.
      </div>
    );
  }

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    // Auto show explanation after selecting
    setShowExplanations(prev => ({ ...prev, [qId]: true }));

    if (onSaveScore) {
      const updatedAnswers = { ...selectedAnswers, [qId]: optionIdx };
      let correctCount = 0;
      questions.forEach(q => {
        if (updatedAnswers[q.id] === q.correctAnswer) correctCount++;
      });
      onSaveScore(correctCount, questions.length);
    }
  };

  const toggleExplanation = (qId: string) => {
    setShowExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      <div className="border-b pb-3 border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Treino para Exame de Concurso
        </span>
        <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
          Questões Práticas • {articleTitle}
        </h2>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctAnswer;
          const showExp = showExplanations[q.id];

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border space-y-4 transition-all ${
                isDark
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : isSepia
                  ? 'bg-[#f6ebd7] border-[#ded0b1]'
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-neutral-800 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    Q{qIdx + 1}
                  </span>
                  <div>
                    <p className="text-sm md:text-base font-semibold leading-snug text-neutral-900 dark:text-neutral-100">
                      {q.question}
                    </p>
                    {q.examContext && (
                      <span className="inline-block mt-1 text-[11px] font-mono text-neutral-500">
                        📌 {q.examContext}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctAnswer === optIdx;

                  let optionStyle = isDark
                    ? 'bg-neutral-950/40 border-neutral-800 hover:bg-neutral-800/50 text-neutral-300'
                    : isSepia
                    ? 'bg-[#faf2e3] border-[#e2d5b7] hover:bg-[#eae0ca] text-[#3d2f1f]'
                    : 'bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-800';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 dark:bg-emerald-950/70 dark:border-emerald-700 dark:text-emerald-200 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-300 text-rose-950 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Show Answer / Explanation Toggle */}
              <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-between">
                <button
                  onClick={() => toggleExplanation(q.id)}
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {showExp ? 'Ocultar Resposta e Fundamentação' : 'Mostrar Resposta Comentada'}
                </button>

                {isAnswered && (
                  <span
                    className={`text-xs font-semibold ${
                      isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {isCorrect ? '✓ Resposta Correta' : '✗ Resposta Incorreta'}
                  </span>
                )}
              </div>

              {/* Explanation Box */}
              {showExp && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                    isDark
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      : isSepia
                      ? 'bg-[#efea3f]/10 border-[#d0c1a0] text-[#3d2f1f]'
                      : 'bg-amber-50/60 border-amber-200 text-neutral-900'
                  }`}
                >
                  <span className="font-bold text-amber-800 dark:text-amber-400 block">
                    Fundamentação Legal e Comentário:
                  </span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
