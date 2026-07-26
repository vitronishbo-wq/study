import { DiplomaModule } from '../../types/minint';

export const saudeFinancasModule: DiplomaModule = {
  id: 'saude_financas',
  title: 'Saúde, Finanças Públicas & Justiça',
  shortTitle: 'MINSA, AGT & Justiça',
  iconName: 'HeartPulse',
  hierarchyLabel: 'Prioridade Nível 2: Sectores Especiais do Estado',
  hierarchyLevel: 2,
  description: 'Regulamentos e Legislação do Serviço Nacional de Saúde (MINSA), Código Geral Tributário (AGT), Finanças Públicas e Organização Judiciária.',
  chapters: [
    {
      id: 'chap-minsa-sns',
      title: 'Capítulo I — Serviço Nacional de Saúde (MINSA)',
      articles: [
        {
          id: 'art-minsa-1',
          code: 'Artigo 77.º (CRA / MINSA)',
          title: 'Direito à Saúde e Serviço Nacional de Saúde',
          legalText: '1. O Estado promove e garante as medidas necessárias para assegurar a todos os cidadãos o direito à assistência médica e sanitária. 2. Compete ao Estado criar o Serviço Nacional de Saúde de cobertura nacional.',
          definition: 'Disposição constitucional que funda a rede de hospitais, centros de saúde e postos médicos do Estado Angolano.',
          simpleExplanation: 'O Estado deve fornecer cuidados de saúde gratuitos ou acessíveis em todos os municípios das 21 províncias de Angola.',
          importantPoints: [
            'A saúde é um direito fundamental de todos os angolanos.',
            'A rede hospitalar estrutura-se em Cuidados Primários, Secundários e Terciários.',
            'Carreiras Médicas, Enfermagem e Diagnóstico possuem regulamentos específicos.',
            'Garantia de ética e humanização no atendimento aos doentes.'
          ],
          examAlert: 'Pergunta cobrada no Concurso MINSA: Qual artigo da CRA garante o direito à saúde? Resposta: Artigo 77.º da CRA.',
          keywords: ['MINSA', 'Saúde', 'Artigo 77.º CRA', 'Hospital', 'Enfermagem'],
          questions: [
            {
              id: 'q-minsa-01',
              question: 'Nos termos da Constituição da República de Angola, a quem incumbe garantir o Serviço Nacional de Saúde?',
              options: [
                'Exclusivamente a clínicas privadas',
                'Ao Estado, promovendo assistência médica a todos os cidadãos',
                'Apenas às organizações não governamentais internacionais',
                'Aos municípios sem apoio do Governo Central'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 77.º da CRA estabelece o dever do Estado na criação e manutenção do SNS.',
              examContext: 'Concurso Público MINSA 2026'
            }
          ],
          flashcards: [
            {
              id: 'fc-minsa-1',
              front: 'Qual o artigo da CRA que trata do Direito à Saúde?',
              back: 'Artigo 77.º da Constituição da República de Angola.'
            }
          ]
        }
      ]
    },
    {
      id: 'chap-agt-minfin',
      title: 'Capítulo II — Finanças Públicas & Fiscalidade (AGT)',
      articles: [
        {
          id: 'art-agt-1',
          code: 'Artigo 1.º (AGT / MINFIN)',
          title: 'Administração Geral Tributária e OGE',
          definition: 'Órgão encarregado da arrecadação de impostos, fiscalização tributária e execução do Orçamento Geral do Estado (OGE).',
          simpleExplanation: 'A AGT recolhe o IVA, IRT, Imposto Predial e Direitos Aduaneiros para financiar as escolas, hospitais, estradas e salários dos funcionários públicos.',
          importantPoints: [
            'OGE (Orçamento Geral do Estado) é aprovado anualmente pela Assembleia Nacional.',
            'Imposto de Rendimento do Trabalho (IRT) incide sobre os salários.',
            'Imposto sobre o Valor Acrescentado (IVA) incide sobre bens e serviços.',
            'Combate à evasão fiscal e promoção da cidadania tributária.'
          ],
          examAlert: 'Tema central nos concursos da AGT, MINFIN e Inspecção de Finanças.',
          keywords: ['AGT', 'MINFIN', 'OGE', 'IRT', 'IVA', 'Impostos'],
          questions: [
            {
              id: 'q-agt-01',
              question: 'Qual é o instrumento jurídico e financeiro anual aprovado pela Assembleia Nacional que prevê as receitas e despesas do Estado Angolano?',
              options: [
                'Plano Director Municipal',
                'Orçamento Geral do Estado (OGE)',
                'Código Penal',
                'Relatório do Banco Nacional'
              ],
              correctAnswer: 1,
              explanation: 'O OGE é a lei orçamental anual obrigatória do Estado nos termos do Artigo 104.º da CRA.',
              examContext: 'Exame de Admissão AGT & MINFIN 2026'
            }
          ]
        }
      ]
    }
  ]
};
