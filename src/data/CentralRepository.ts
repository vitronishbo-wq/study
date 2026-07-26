import { ALL_MODULES, getAllArticlesInModule } from './index';
import { ALL_CONCURSOS } from './concursos';
import {
  ConceptArticle,
  DocumentFile,
  DiplomaModule,
  SmartQuizQuestion,
  Course,
  Certificate,
  ConcursoEntry,
  CentralRepositoryData
} from '../types/minint';

/**
 * ----------------------------------------------------------------------------
 * 17. REPOSITÓRIO ÚNICO E CENTRALIZADO DE CONTEÚDOS
 * (Legislação, Documentos, Materiais, Perguntas, Respostas, Simulados)
 * ----------------------------------------------------------------------------
 */

// 1. Legislação Unificada
export function getCentralLegislation(): ConceptArticle[] {
  const allArticles: ConceptArticle[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    allArticles.push(...articles);
  });
  return allArticles;
}

// 2. Documentos Oficiais, Diários da República & Editais
export const CENTRAL_DOCUMENTS: DocumentFile[] = [
  {
    id: 'doc-cra-2010',
    title: 'Constituição da República de Angola (CRA 2010 com Revisão de 2021)',
    type: 'diario_republica',
    sizeFormatted: '2.4 MB',
    category: 'Direito Constitucional',
    lastUpdated: '2026-01-15'
  },
  {
    id: 'doc-estatuto-med-222-20',
    title: 'Decreto Presidencial n.º 222/20 — Estatuto Orgânico do Ministério da Educação (MED)',
    type: 'diario_republica',
    sizeFormatted: '1.9 MB',
    category: 'Legislação Educativa',
    lastUpdated: '2026-07-25'
  },
  {
    id: 'doc-dpa-21-prov',
    title: 'Lei n.º 14/24 — Nova Divisão Político-Administrativa de Angola (21 Províncias)',
    type: 'pdf',
    sizeFormatted: '3.1 MB',
    category: 'Administração Pública',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'doc-pago-carreiras',
    title: 'Lei n.º 26/22 — Lei Geral do Trabalho & Estatuto dos Funcionários Públicos',
    type: 'diario_republica',
    sizeFormatted: '2.9 MB',
    category: 'Direito Administrativo',
    lastUpdated: '2026-01-20'
  },
  {
    id: 'doc-estatuto-pna',
    title: 'Decreto Presidencial n.º 152/19 — Regulamento Geral da Polícia Nacional de Angola',
    type: 'diario_republica',
    sizeFormatted: '2.1 MB',
    category: 'Carreiras Policiais & MININT',
    lastUpdated: '2026-02-10'
  },
  {
    id: 'doc-cpa-angola',
    title: 'Decreto-Lei n.º 16/A/95 — Código do Procedimento Administrativo Angolano',
    type: 'diario_republica',
    sizeFormatted: '1.8 MB',
    category: 'Direito Administrativo',
    lastUpdated: '2026-04-12'
  },
  {
    id: 'doc-estatuto-minsa',
    title: 'Decreto Presidencial n.º 260/21 — Estatuto do Serviço Nacional de Saúde (MINSA)',
    type: 'pdf',
    sizeFormatted: '2.3 MB',
    category: 'Saúde Pública',
    lastUpdated: '2026-05-01'
  },
  {
    id: 'doc-cgt-agt',
    title: 'Lei n.º 21/14 — Código Geral Tributário e Regulamento da AGT',
    type: 'pdf',
    sizeFormatted: '3.5 MB',
    category: 'Fiscalidade & Finanças',
    lastUpdated: '2026-01-05'
  },
  {
    id: 'doc-edital-minint-2026',
    title: 'Edital de Abertura do Concurso Público MININT & PNA 2026',
    type: 'edital',
    sizeFormatted: '1.2 MB',
    category: 'Concursos Públicos',
    lastUpdated: '2026-05-12'
  },
  {
    id: 'doc-edital-med-2026',
    title: 'Edital do Concurso Público de Professores MED 2026',
    type: 'edital',
    sizeFormatted: '1.5 MB',
    category: 'Concursos Públicos',
    lastUpdated: '2026-06-20'
  }
];

// 2.1 Glossário Jurídico Oficial (Termos para Exames de Concurso)
export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Direito Constitucional' | 'Direito Administrativo' | 'Direito Penal' | 'Cultura Geral';
  definition: string;
  example: string;
}

export const CENTRAL_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'gl-01',
    term: 'Habeas Corpus',
    category: 'Direito Constitucional',
    definition: 'Garantia constitucional contra a prisão ou detenção ilegal ou arbitrária de qualquer cidadão.',
    example: 'Impetrado junto do Tribunal Supremo quando a prisão preventiva ultrapassa os prazos legais.'
  },
  {
    id: 'gl-02',
    term: 'Acto Administrativo',
    category: 'Direito Administrativo',
    definition: 'Decisão de um órgão da Administração Pública que produz efeitos jurídicos numa situação individual e concreta.',
    example: 'O despacho de nomeação de um funcionário aprovado em concurso público é um acto administrativo.'
  },
  {
    id: 'gl-03',
    term: 'Vício de Forma',
    category: 'Direito Administrativo',
    definition: 'Ilegalidade do acto administrativo resultante da omissão de formalidades essenciais exigidas por lei.',
    example: 'Falta de fundamentação escrita ou omissão de audiência prévia do interessado.'
  },
  {
    id: 'gl-04',
    term: 'Poder Discricionário',
    category: 'Direito Administrativo',
    definition: 'Margem de livre escolha concedida pela lei à Administração Pública para decidir segundo a oportunidade e conveniência.',
    example: 'Escolha da data de realização das provas entre os limites fixados no edital.'
  },
  {
    id: 'gl-05',
    term: 'Recurso Hierárquico',
    category: 'Direito Administrativo',
    definition: 'Pedido dirigido ao superior hierárquico do autor do acto para alterar ou anular uma decisão desfavorável.',
    example: 'Recurso apresentado ao Ministro do Interior contra decisão do Comandante Geral da PNA.'
  },
  {
    id: 'gl-06',
    term: 'Promulgação',
    category: 'Direito Constitucional',
    definition: 'Acto pelo qual o Presidente da República atesta a existência da lei e determina a sua publicação no Diário da República.',
    example: 'A promulgação do decreto presidencial pelo Chefe de Estado.'
  },
  {
    id: 'gl-07',
    term: 'Presunção de Inocência',
    category: 'Direito Penal',
    definition: 'Princípio segundo o qual todo o cidadão se presume inocente até ao trânsito em julgado da sentença condenatória.',
    example: 'Garantia consagrada no Artigo 67.º da Constituição da República de Angola.'
  },
  {
    id: 'gl-08',
    term: 'Autarquia Local',
    category: 'Direito Administrativo',
    definition: 'Pessoa colectiva territorial dotada de órgãos eleitos, autonomia administrativa e financeira para gerir os interesses locais.',
    example: 'Consagrada no Artigo 213.º da CRA para descentralização do poder do Estado.'
  },
  {
    id: 'gl-09',
    term: 'Desconcentração',
    category: 'Direito Administrativo',
    definition: 'Distribuição de competências entre diferentes órgãos da mesma pessoa colectiva (Estado).',
    example: 'Delegação de poderes do Governador Provincial ao Administrador Municipal.'
  },
  {
    id: 'gl-10',
    term: 'Nulidade do Acto',
    category: 'Direito Administrativo',
    definition: 'Forma mais grave de invalidez do acto administrativo que não produz quaisquer efeitos jurídicos desde a sua origem.',
    example: 'Acto praticado com usurpação de poder ou manifesta violação da Constituição.'
  }
];

// 2.2 Perguntas Frequentes (FAQ de Preparação para Concursos Públicos)
export interface CandidateFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const CENTRAL_FAQ: CandidateFAQ[] = [
  {
    id: 'faq-01',
    question: 'Como funciona o cálculo da nota final nos exames de concurso em Angola?',
    answer: 'Em regra, a prova escrita de conhecimentos vale 20 valores (mínimo de aprovação: 10 valores). Algumas carreiras adicionam prova prática, inspecção médica e avaliação documental.',
    category: 'Exames & Provas'
  },
  {
    id: 'faq-02',
    question: 'Qual a importância de estudar a nova Divisão Político-Administrativa (Lei 14/24)?',
    answer: 'A Lei n.º 14/24 instituiu 21 Províncias e 325 Municípios. É tema obrigatório e recorrente nas questões de Cultura Geral de todos os concursos públicos de 2026.',
    category: 'Cultura Geral'
  },
  {
    id: 'faq-03',
    question: 'Posso utilizar a aplicação totalmente offline sem internet?',
    answer: 'Sim! A plataforma sincroniza todos os diplomas legatários e simulados no IndexedDB do seu navegador, permitindo leitura e treino contínuo em qualquer lugar.',
    category: 'Plataforma & Offline'
  },
  {
    id: 'faq-04',
    question: 'Onde encontro o edital oficial de abertura e inscrições?',
    answer: 'Na aba Concursos e Downloads, dispomos dos editais oficiais em PDF e ligação directa ao portal JobExpress para candidaturas activas.',
    category: 'Concursos'
  }
];

// 3. Perguntas e Respostas Unificadas (QA Pairs)
export function getCentralQuestionsAndAnswers(): { id: string; question: string; answer: string; module: string }[] {
  const qaPairs: { id: string; question: string; answer: string; module: string }[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    articles.forEach(art => {
      if (art.questions && art.questions.length > 0) {
        art.questions.forEach(q => {
          qaPairs.push({
            id: q.id,
            question: q.question,
            answer: q.options[q.correctAnswer] + (q.explanation ? ` — Explicativo: ${q.explanation}` : ''),
            module: mod.title
          });
        });
      }
    });
  });
  return qaPairs;
}

// 4. Simulados e Casos Práticos Unificados
export function getCentralSimulados(): SmartQuizQuestion[] {
  const simulados: SmartQuizQuestion[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    articles.forEach(art => {
      if (art.questions && art.questions.length > 0) {
        art.questions.forEach(q => {
          simulados.push({
            id: q.id,
            scenarioType: 'caso_pratico',
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            examTip: q.examContext || 'Tema frequente nos exames de acesso às carreiras públicas.'
          });
        });
      }
    });
  });
  return simulados;
}

// 5. Cursos de Preparação Intensiva (Evolução)
export const CENTRAL_COURSES: Course[] = [
  {
    id: 'curso-minint-pna-2026',
    title: 'Curso Preparatório Intensivo MININT & PNA 2026',
    category: 'Carreiras Policiais & Defesa',
    description: 'Aulas completas sobre Constituição, Regulamentos da Polícia, Código Penal e Ética Comportamental.',
    instructor: 'Coronel Dr. António Mateus & Profa. Dra. Maria do Céu',
    durationHours: 45,
    lessons: [
      { id: 'v1', title: 'Fundamentos da CRA e Direitos Fundamentais', durationMinutes: 35, summary: 'Análise detalhada do Artigo 1.º ao 30.º da CRA.' },
      { id: 'v2', title: 'Hierarquia Policial e Uso da Força', durationMinutes: 40, summary: 'Princípio da Proporcionalidade e Estatuto Orgânico da PNA.' }
    ],
    certificateEligible: true
  },
  {
    id: 'curso-dpa-administracao-2026',
    title: 'Nova Divisão Político-Administrativa (21 Províncias) & Administração Pública',
    category: 'Administração Geral & Governos Provinciais',
    description: 'Estudo do novo mapa territorial de Angola, províncias criadas (Icolo e Bengo, Moxico Leste, Cuando, etc.) e órgãos locais.',
    instructor: 'Mestre Gabriel Kwanza',
    durationHours: 30,
    lessons: [
      { id: 'v3', title: 'A Nova Lei da DPA (Lei 14/24)', durationMinutes: 50, summary: 'Compreender a reformulação territorial de Angola.' }
    ],
    certificateEligible: true
  }
];

// 6. Certificados de Aproveitamento Emitidos
export const CENTRAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-001',
    code: 'JOB-ANG-2026-9812',
    title: 'Certificado de Preparação em Direito Constitucional e Legislação Angolana',
    recipientName: 'Candidato Aprovado JobExpress',
    issueDate: '2026-06-15',
    hoursCount: 40,
    validationUrl: 'https://jobexpress-angola.onrender.com/validar-certificado'
  }
];

// 7. Novas Oportunidades e Concursos Públicos
export function getCentralConcursos(): ConcursoEntry[] {
  return ALL_CONCURSOS.map(c => ({
    id: c.id,
    ministryName: c.ministryName,
    title: `Concurso Público de Acesso — ${c.shortName}`,
    positionsCount: c.id === 'minint' ? 12500 : c.id === 'minsa' ? 8400 : 5000,
    educationLevel: 'Ensino Médio',
    status: c.badge.includes('Aberto') ? 'Aberto' : 'Previsto',
    noticeUrl: 'https://jobexpress-angola.onrender.com',
    updatedAt: '2026-07-25'
  }));
}

// 8. Repositório Mestre Unificado
export const CentralRepository: CentralRepositoryData = {
  get legislacao() {
    return getCentralLegislation();
  },
  documentos: CENTRAL_DOCUMENTS,
  materiais: ALL_MODULES,
  get perguntasRespostas() {
    return getCentralQuestionsAndAnswers();
  },
  get simulados() {
    return getCentralSimulados();
  },
  cursos: CENTRAL_COURSES,
  certificados: CENTRAL_CERTIFICATES,
  get concursos() {
    return getCentralConcursos();
  }
};

/**
 * Função de busca global no Repositório Único
 */
export function queryCentralRepository(term: string) {
  if (!term || term.trim().length < 2) return null;
  const lower = term.toLowerCase().trim();

  const matchedLegis = getCentralLegislation().filter(art =>
    art.title.toLowerCase().includes(lower) ||
    art.code.toLowerCase().includes(lower) ||
    art.definition.toLowerCase().includes(lower)
  ).slice(0, 5);

  const matchedDocs = CENTRAL_DOCUMENTS.filter(doc =>
    doc.title.toLowerCase().includes(lower) ||
    doc.category.toLowerCase().includes(lower)
  );

  const matchedQA = getCentralQuestionsAndAnswers().filter(qa =>
    qa.question.toLowerCase().includes(lower) ||
    qa.answer.toLowerCase().includes(lower)
  ).slice(0, 5);

  return {
    legislacao: matchedLegis,
    documentos: matchedDocs,
    perguntasRespostas: matchedQA,
    totalResults: matchedLegis.length + matchedDocs.length + matchedQA.length
  };
}
