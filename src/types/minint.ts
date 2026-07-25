export type ModuleId =
  | 'constituição'
  | 'minint'
  | 'policia'
  | 'historia'
  | 'cultura_geral'
  | 'educacao'
  | 'portugues'
  | 'matematica'
  | 'informatica'
  | 'etica'
  | 'administracao_publica'
  | 'legislacao'
  | 'raciocinio_logico';

export interface MinistryConcurso {
  id: string;
  ministryName: string;
  shortName: string;
  iconName: string;
  badge: string;
  description: string;
  targetCareers: string[];
  moduleIds: ModuleId[];
  keyTopics: string[];
}

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

// ----------------------------------------------------------------------------
// 15. ESTRUTURA E ARQUITETURA PARA EVOLUÇÃO FUTURA
// (Cursos, Certificados, Vídeos, Aulas, Documentos, Novos Concursos)
// ----------------------------------------------------------------------------

export interface VideoLesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  summary: string;
  instructorName?: string;
  articleRefId?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  instructor: string;
  durationHours: number;
  lessons: VideoLesson[];
  certificateEligible: boolean;
  coverImage?: string;
}

export interface Certificate {
  id: string;
  code: string;
  title: string;
  recipientName: string;
  issueDate: string;
  hoursCount: number;
  validationUrl: string;
}

export interface DocumentFile {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'diario_republica' | 'edital' | 'guia';
  sizeFormatted: string;
  category: string;
  downloadUrl?: string;
  lastUpdated: string;
}

export interface ConcursoEntry {
  id: string;
  ministryName: string;
  title: string;
  positionsCount: number;
  educationLevel: 'Ensino Médio' | 'Licenciatura' | 'Mestrado' | 'Todos';
  status: 'Aberto' | 'Previsto' | 'Em Fase de Exames' | 'Encerrado';
  noticeUrl?: string;
  updatedAt: string;
}

export interface CentralRepositoryData {
  legislacao: ConceptArticle[];
  documentos: DocumentFile[];
  materiais: DiplomaModule[];
  perguntasRespostas: { id: string; question: string; answer: string; module: string }[];
  simulados: SmartQuizQuestion[];
  cursos: Course[];
  certificados: Certificate[];
  concursos: ConcursoEntry[];
}

