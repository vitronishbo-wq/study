import { DiplomaModule } from '../../types/minint';

export const administracaoPublicaModule: DiplomaModule = {
  id: 'administracao_publica',
  title: 'Direito Administrativo, LGT & Nova DPA 2026',
  shortTitle: 'Adm. Pública & LGT',
  iconName: 'Building2',
  hierarchyLabel: 'Prioridade Nível 1: Regime Geral do Estado',
  hierarchyLevel: 1,
  description: 'Estatuto dos Funcionários Públicos, Lei Geral do Trabalho (Lei 26/22), Código do Procedimento Administrativo e Divisão Político-Administrativa de 21 Províncias (Lei 14/24).',
  chapters: [
    {
      id: 'chap-dpa-lei-14-24',
      title: 'Capítulo I — Nova Divisão Político-Administrativa (Lei n.º 14/24)',
      articles: [
        {
          id: 'art-dpa-1',
          code: 'Artigo 1.º (Lei 14/24)',
          title: 'Organização Territorial e Novas 21 Províncias de Angola',
          legalText: '1. O território da República de Angola organiza-se territorialmente em 21 Províncias, 325 Municípios e Comunas. 2. A divisão territorial visa aproximação dos serviços públicos às populações e o desenvolvimento equilibrado do país.',
          definition: 'Estabelece a reestruturação geográfica de Angola, subdividindo antigas províncias (Moxico Leste, Cuando, Icolo e Bengo) para reforçar a descentralização administrativa.',
          simpleExplanation: 'Angola passou a ter 21 províncias e 325 municípios. As novas províncias foram criadas para aproximar a administração pública dos cidadãos do interior.',
          importantPoints: [
            'Angola tem agora 21 Províncias (anteriormente 18).',
            'Novas províncias criadas: Icolo e Bengo, Moxico Leste e Quando.',
            'Total de 325 Municípios para reforço do poder local.',
            'Tema obrigatório nos concursos do MAT, MININT, MED e Governos Provinciais.'
          ],
          examAlert: 'Pergunta frequente: Qual o número total de províncias e municípios em Angola após a Lei 14/24? Resposta: 21 Províncias e 325 Municípios.',
          keywords: ['DPA', '21 Províncias', 'Lei 14/24', '325 Municípios', 'Descentralização'],
          questions: [
            {
              id: 'q-dpa-01',
              question: 'Com a entrada em vigor da Lei n.º 14/24 de 5 de Setembro, quantas províncias e municípios constituem o território nacional de Angola?',
              options: [
                '18 Províncias e 164 Municípios',
                '21 Províncias e 325 Municípios',
                '20 Províncias e 250 Municípios',
                '22 Províncias e 300 Municípios'
              ],
              correctAnswer: 1,
              explanation: 'A Lei n.º 14/24 fixou a nova Divisão Político-Administrativa de Angola em 21 Províncias e 325 Municípios.',
              examContext: 'Cobrado nos exames de acesso da Administração Pública 2026'
            },
            {
              id: 'q-dpa-02',
              question: 'Qual é o objetivo principal da nova Divisão Político-Administrativa (DPA) em Angola?',
              options: [
                'Aumentar impostos regionais',
                'Aproximar a administração pública dos cidadãos e promover o desenvolvimento equilibrado',
                'Centralizar todas as decisões na capital Luanda',
                'Eliminar as comunas e Governos Provinciais'
              ],
              correctAnswer: 1,
              explanation: 'A descentralização e aproximação dos serviços públicos às populações locais é o fundamento constitucional da DPA.',
              examContext: 'Concurso MAT & Governos Locais 2026'
            }
          ],
          flashcards: [
            {
              id: 'fc-dpa-1',
              front: 'Quantas províncias e municípios existem em Angola em 2026?',
              back: '21 Províncias e 325 Municípios (Lei n.º 14/24 de 5 de Setembro).'
            }
          ]
        },
        {
          id: 'art-dpa-2',
          code: 'Artigo 2.º (Lei 14/24)',
          title: 'Princípios da Descentralização e Desconcentração',
          definition: 'A transferência de competências dos órgãos centrais de Luanda para os Governos Provinciais e Administrações Municipais.',
          simpleExplanation: 'Descentralização significa dar autonomia às autoridades locais para resolverem os problemas das populações sem dependerem sempre dos ministérios em Luanda.',
          importantPoints: [
            'Desconcentração: transferência dentro da mesma pessoa coletiva Estado.',
            'Descentralização: transferência de poder para autarquias e governos locais.',
            'Simplificação do atendimento ao cidadão.',
            'Transparência na execução do orçamento municipal.'
          ],
          examAlert: 'Diferença clássica entre Desconcentração (hierárquica) e Descentralização (autónoma).',
          keywords: ['Desconcentração', 'Descentralização', 'Poder Local', 'Autonomia'],
          questions: [
            {
              id: 'q-dpa-03',
              question: 'A transferência de atribuições da administração central para as Administrações Municipais denomina-se:',
              options: [
                'Desconcentração ou Descentralização administrativa',
                'Privatização estatal',
                'Centralização hierárquica',
                'Nacionalização de serviços'
              ],
              correctAnswer: 0,
              explanation: 'Representa a aplicação prática do princípio da eficiência e proximidade administrativa no serviço público.',
              examContext: 'Exame de Admissão MAPTSS'
            }
          ]
        }
      ]
    },
    {
      id: 'chap-lgt-26-22',
      title: 'Capítulo II — Lei Geral do Trabalho & Função Pública',
      articles: [
        {
          id: 'art-lgt-1',
          code: 'Artigo 1.º (Lei 26/22)',
          title: 'Âmbito de Aplicação da Lei Geral do Trabalho',
          legalText: 'A presente lei aplica-se a todos os trabalhadores que prestam actividade remunerada por conta de outrem, no âmbito da organização e sob a direcção de um empregador.',
          definition: 'Define quem está sujeito às regras de trabalho e direitos fundamentais do trabalhador em Angola.',
          simpleExplanation: 'A LGT regula os contratos de trabalho, horários, salários, férias, subsídios e deveres de trabalhadores e empregadores.',
          importantPoints: [
            'Aplica-se ao sector privado e em regime subsidiário à Função Pública.',
            'Garante o salário mínimo nacional e protecção contra despedimento sem justa causa.',
            'Direito a férias anuais pagas de 22 dias úteis.',
            'Igualdade de oportunidades sem discriminação de género ou região.'
          ],
          examAlert: 'Atenção ao número de dias úteis de férias garantidos por lei (22 dias úteis).',
          keywords: ['LGT', 'Função Pública', 'Contrato de Trabalho', 'Férias', 'Salário'],
          questions: [
            {
              id: 'q-lgt-01',
              question: 'Nos termos da legislação laboral angolana, qual é o período mínimo anual de férias pagas a que o trabalhador tem direito?',
              options: [
                '15 dias corridos',
                '22 dias úteis',
                '30 dias corridos',
                '12 dias úteis'
              ],
              correctAnswer: 1,
              explanation: 'A Lei Geral do Trabalho estabelece 22 dias úteis de férias anuais pagas para o trabalhador.',
              examContext: 'Concurso Geral do Estado 2026'
            },
            {
              id: 'q-lgt-02',
              question: 'Qual das opções constitui um direito fundamental do funcionário público em Angola?',
              options: [
                'Ausentar-se do serviço sem prévia comunicação',
                'Remuneração justa, formação contínua e protecção social na doença e reforma',
                'Recusar cumprir ordens legítimas dos superiores hierárquicos',
                'Exercer comércio incompatível no mesmo horário de expediente'
              ],
              correctAnswer: 1,
              explanation: 'O funcionário tem direito a vencimento equitativo, carreira garantida e apoio social.',
              examContext: 'Exame MAPTSS & Ministérios 2026'
            }
          ],
          flashcards: [
            {
              id: 'fc-lgt-1',
              front: 'Quantos dias úteis de férias garante a LGT em Angola?',
              back: '22 dias úteis de férias anuais pagas.'
            }
          ]
        },
        {
          id: 'art-lgt-2',
          code: 'Artigo 15.º (Estatuto da Função Pública)',
          title: 'Deveres Gerais do Agente Público e Ética',
          definition: 'Regras de conduta, isenção, urbanidade, sigilo profissional e zelo com os bens públicos do Estado.',
          simpleExplanation: 'O funcionário público deve tratar o cidadão com respeito, não aceitar subornos, guardar segredo de serviço e cuidar dos bens do Estado.',
          importantPoints: [
            'Dever de Lealdade e Obediência Hierárquica.',
            'Dever de Isenção Política no exercício do cargo.',
            'Proibição absoluta de corrupção ou favorecimento ilícito.',
            'Pontualidade e assiduidade obrigatórias.'
          ],
          examAlert: 'Tema recorrente de Ética na Administração Pública em todos os exames de admissão.',
          keywords: ['Ética', 'Função Pública', 'Deveres', 'Isenção', 'Zelo'],
          questions: [
            {
              id: 'q-lgt-03',
              question: 'O dever de tratar todos os cidadãos com igualdade, sem preferências pessoais ou partidárias, chama-se:',
              options: [
                'Dever de Isenção e Imparcialidade',
                'Dever de Subordinação',
                'Dever de Reserva de Lucro',
                'Dever de Discricionariedade'
              ],
              correctAnswer: 0,
              explanation: 'A isenção e imparcialidade são pilares republicanos do artigo 198.º da Constituição.',
              examContext: 'Concurso Geral de Admissão à Função Pública'
            }
          ]
        }
      ]
    }
  ]
};
