import { useState, useEffect, useCallback } from 'react';

export interface SavedFlashcard {
  id: string;
  front: string;
  back: string;
  articleCode: string;
  articleTitle?: string;
  tag?: string;
  createdAt: number;
}

const DECK_STORAGE_KEY = 'minint_flashcard_deck_v1';

export function useLocalFlashcards() {
  const [deck, setDeck] = useState<SavedFlashcard[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Erro ao carregar Deck do localStorage:', e);
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch (e) {
      console.warn('Erro ao salvar Deck no localStorage:', e);
    }
  }, [deck]);

  const addCard = useCallback((card: Omit<SavedFlashcard, 'createdAt'> & { createdAt?: number }) => {
    setDeck(prev => {
      if (prev.some(c => c.id === card.id || (c.front === card.front && c.articleCode === card.articleCode))) {
        return prev;
      }
      const newCard: SavedFlashcard = {
        ...card,
        createdAt: card.createdAt || Date.now()
      };
      return [newCard, ...prev];
    });
  }, []);

  const addMultipleCards = useCallback((cards: Array<Omit<SavedFlashcard, 'createdAt'> & { createdAt?: number }>) => {
    setDeck(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const existingKeySet = new Set(prev.map(c => `${c.articleCode}:::${c.front}`));

      const newToAdd: SavedFlashcard[] = [];
      cards.forEach(card => {
        const key = `${card.articleCode}:::${card.front}`;
        if (!existingIds.has(card.id) && !existingKeySet.has(key)) {
          existingIds.add(card.id);
          existingKeySet.add(key);
          newToAdd.push({
            ...card,
            createdAt: card.createdAt || Date.now()
          });
        }
      });

      return [...newToAdd, ...prev];
    });
  }, []);

  const removeCard = useCallback((cardId: string) => {
    setDeck(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const clearDeck = useCallback(() => {
    setDeck([]);
  }, []);

  const isSaved = useCallback((cardId: string, front?: string, articleCode?: string) => {
    return deck.some(c => c.id === cardId || (front && articleCode && c.front === front && c.articleCode === articleCode));
  }, [deck]);

  return {
    deck,
    addCard,
    addMultipleCards,
    removeCard,
    clearDeck,
    isSaved
  };
}
