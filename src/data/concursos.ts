import { MinistryConcurso } from '../types/minint';

export const ALL_CONCURSOS: MinistryConcurso[] = [
  {
    id: 'minint',
    ministryName: 'Ministério do Interior',
    shortName: 'MININT / PNA',
    iconName: 'Shield',
    badge: 'Concurso Aberto / Ativo',
    description: 'Carreiras de Segurança Pública, Polícia Nacional de Angola (PNA), Serviço de Migração e Estrangeiros (SME), Proteção Civil e Bombeiros e Serviço Prisional.',
    targetCareers: [
      'Agente de Polícia e Subchefe PNA',
      'Oficial de Migração (SME)',
      'Bombeiro e Proteção Civil (SPCB)',
      'Guarda Prisional (SERP)'
    ],
    moduleIds: ['constituição', 'minint', 'policia', 'cultura_geral', 'historia'],
    keyTopics: [
      'Constituição da República (Direitos e Deveres)',
      'Estatuto Orgânico do MININT & PNA',
      'Deontologia Policial & Identificação (NIP)',
      'Cultura Geral e Nova DPA (21 Províncias)'
    ]
  },
  {
    id: 'educacao',
    ministryName: 'Ministério da Educação',
    shortName: 'MED / Educação',
    iconName: 'GraduationCap',
    badge: 'Decreto Presidencial n.º 222/20',
    description: 'Concursos Públicos de Admissão de Professores de Ensino Primário, Secundário, Técnicos e Agentes de Educação do Estado.',
    targetCareers: [
      'Professor do Ensino Primário e Secundário',
      'Especialista em Administração Escolar',
      'Técnico de Legislação Educativa e Inspecção Escolar'
    ],
    moduleIds: ['educacao', 'constituição', 'cultura_geral', 'historia'],
    keyTopics: [
      'Estatuto Orgânico do MED (Decreto Presidencial n.º 222/20)',
      'Direito Constitucional à Educação (Art. 79.º CRA)',
      'Supervisão Pedagógica & Inspecção Escolar',
      'Nova Divisão Político-Administrativa (21 Províncias - Lei 14/24)',
      'Ética e Deontologia no Serviço Público Docente'
    ]
  },
  {
    id: 'saude',
    ministryName: 'Ministério da Saúde',
    shortName: 'MINSA / Saúde',
    iconName: 'HeartPulse',
    badge: 'Preparação Permanente',
    description: 'Concursos Públicos para Carreiras Médicas, Enfermagem, Diagnóstico e Terapêutica e Apoio Hospitalar do Serviço Nacional de Saúde.',
    targetCareers: [
      'Médicos de Clínica Geral e Especialistas',
      'Enfermeiros Gerais e Especializados',
      'Técnicos de Diagnóstico e Terapêutica',
      'Administrativos Hospitalares'
    ],
    moduleIds: ['constituição', 'cultura_geral', 'historia'],
    keyTopics: [
      'Direito Constitucional à Saúde (Art. 77.º CRA)',
      'Princípios Gerais da Função Pública',
      'Organização Territorial do SNS (21 Províncias)',
      'Deontologia Profissional do Estado'
    ]
  },
  {
    id: 'maptss',
    ministryName: 'Administração Pública e Finanças',
    shortName: 'MAPTSS / MINFIN',
    iconName: 'Building2',
    badge: 'Regime Geral',
    description: 'Admissão para a Função Pública Geral, Fiscalidade, Inspeção do Trabalho, Finanças e Contratação Pública do Estado.',
    targetCareers: [
      'Técnico Superior de Administração Pública',
      'Inspetor de Finanças e do Trabalho',
      'Técnico de Finanças e Património'
    ],
    moduleIds: ['constituição', 'cultura_geral', 'historia'],
    keyTopics: [
      'Constituição da República - Administração Pública (Art. 198.º a 212.º)',
      'Estatuto dos Funcionários Públicos',
      'Nova DPA e Gestão Financeira Local',
      'História do Estado Angolano'
    ]
  },
  {
    id: 'mat',
    ministryName: 'Administração do Território e Municípios',
    shortName: 'MAT / Governos Locais',
    iconName: 'MapPin',
    badge: 'Lei n.º 14/24',
    description: 'Carreiras dos Governos Provinciais, Administrações Municipais, Poder Local e Nova Divisão Político-Administrativa de 21 Províncias.',
    targetCareers: [
      'Técnico de Administração Municipal',
      'Agente de Desenvolvimento Local',
      'Fiscal Comunitário e Territorial'
    ],
    moduleIds: ['cultura_geral', 'constituição', 'historia'],
    keyTopics: [
      'Lei n.º 14/24 de 5 de Setembro (21 Províncias & 325 Municípios)',
      'Poder Local e Autarquias na Constituição',
      'Capitais Provinciais e Sede de Municípios',
      'Geografia Física e Económica de Angola'
    ]
  },
  {
    id: 'justica',
    ministryName: 'Ministério da Justiça e Direitos Humanos',
    shortName: 'MINJUSDH',
    iconName: 'Scale',
    badge: 'Registo e Notariado',
    description: 'Concursos para Conservadores de Registo, Notários, Oficiais de Justiça, Identificação Civil e Direitos Humanos.',
    targetCareers: [
      'Oficial de Justiça e Tribunal',
      'Conservador e Notário de Registo Civil',
      'Técnico de Identificação Civil e Criminal'
    ],
    moduleIds: ['constituição', 'cultura_geral', 'historia'],
    keyTopics: [
      'Constituição da República (Direitos, Liberdades e Garantias)',
      'Organização do Judiciário Angolano',
      'Serviços de Identificação do Cidadão',
      'História das Instituições de Justiça'
    ]
  }
];

export function getConcursoById(id: string): MinistryConcurso {
  return ALL_CONCURSOS.find(c => c.id === id) || ALL_CONCURSOS[0];
}
