import { useState, useEffect } from 'react';
import { UserProgress } from '../types/minint';

const STORAGE_KEY = 'minint_study_platform_v1';

const INITIAL_STATE: UserProgress = {
  studiedArticleIds: [],
  bookmarkedArticleIds: [],
  notesByArticleId: {},
  quizScores: {},
  fontSize: 'md',
  fontFamily: 'sans',
  theme: 'light'
};

export function useStudyState() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load study state from localStorage', e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to persist study state to localStorage', e);
    }
  }, [progress]);

  const toggleStudied = (articleId: string) => {
    setProgress(prev => {
      const isStudied = prev.studiedArticleIds.includes(articleId);
      const updated = isStudied
        ? prev.studiedArticleIds.filter(id => id !== articleId)
        : [...prev.studiedArticleIds, articleId];
      return { ...prev, studiedArticleIds: updated };
    });
  };

  const toggleBookmark = (articleId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedArticleIds.includes(articleId);
      const updated = isBookmarked
        ? prev.bookmarkedArticleIds.filter(id => id !== articleId)
        : [...prev.bookmarkedArticleIds, articleId];
      return { ...prev, bookmarkedArticleIds: updated };
    });
  };

  const setFontSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    setProgress(prev => ({ ...prev, fontSize: size }));
  };

  const setFontFamily = (family: 'sans' | 'serif' | 'mono') => {
    setProgress(prev => ({ ...prev, fontFamily: family }));
  };

  const setTheme = (theme: 'light' | 'dark' | 'sepia') => {
    setProgress(prev => ({ ...prev, theme }));
  };

  const saveQuizScore = (quizKey: string, correct: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizKey]: {
          correct,
          total,
          date: new Date().toISOString()
        }
      }
    }));
  };

  const saveNote = (articleId: string, noteText: string) => {
    setProgress(prev => {
      const updatedNotes = { ...prev.notesByArticleId };
      if (!noteText.trim()) {
        delete updatedNotes[articleId];
      } else {
        updatedNotes[articleId] = noteText;
      }
      return { ...prev, notesByArticleId: updatedNotes };
    });
  };

  return {
    progress,
    toggleStudied,
    toggleBookmark,
    setFontSize,
    setFontFamily,
    setTheme,
    saveQuizScore,
    saveNote
  };
}
