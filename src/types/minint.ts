export type ModuleId = 'constituição' | 'minint' | 'policia' | 'historia' | 'cultura_geral';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  articleRef?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed option
  explanation: string;
  examContext?: string; // e.g., "Cobrado no Concurso MININT 2021"
}

export interface ConceptArticle {
  id: string;
  code: string; // e.g. "Artigo 1.º", "Artigo 12.º", "Tema 1"
  title: string;
  legalText?: string; // Texto na íntegra oficial
  definition: string;
  simpleExplanation: string;
  importantPoints: string[];
  examAlert?: string; // "Atenção para exame"
  keywords?: string[];
  relatedArticleIds?: string[];
  questions?: ExamQuestion[];
  flashcards?: Flashcard[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  articles: ConceptArticle[];
}

export interface Chapter {
  id: string;
  title: string;
  sections?: Section[];
  articles?: ConceptArticle[];
}

export interface DiplomaModule {
  id: ModuleId;
  title: string;
  shortTitle: string;
  iconName: string; // Lucide icon identifier
  hierarchyLabel: string; // e.g. "Prioridade Nível 1: Carta Magna"
  hierarchyLevel: number; // 1 to 6
  description: string;
  chapters: Chapter[];
}

export type StudyMode = 'reading' | 'summary' | 'flashcards' | 'questions' | 'quiz_ai';

export interface AiQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SmartQuizQuestion {
  id: string;
  scenarioType?: 'caso_pratico' | 'pegadinha_rasteira' | 'artigo_direto';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  distractorExplanations?: string[]; // Explanations why other options are wrong
  examTip?: string; // "Dica de Ouro de Concurso"
}

export interface UserProgress {
  studiedArticleIds: string[];
  bookmarkedArticleIds: string[];
  notesByArticleId: Record<string, string>;
  quizScores: Record<string, { total: number; correct: number; date: string }>;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  fontFamily: 'sans' | 'serif' | 'mono';
  theme: 'light' | 'dark' | 'sepia';
}
