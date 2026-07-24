import { DiplomaModule } from '../../types/minint';

export const historiaModule: DiplomaModule = {
  id: 'historia',
  title: 'História de Angola',
  shortTitle: 'História',
  iconName: 'History',
  hierarchyLabel: 'Hierarquia VI: Programa Geral de Conhecimento Histórico-Patriótico',
  hierarchyLevel: 6,
  description: 'Acontecimentos históricos fundamentais da formação da Nação Angolana, Luta de Libertação Nacional, Independência e Processo de Paz.',
  chapters: [
    {
      id: 'hist-cap-1',
      title: 'Capítulo I - A Luta de Libertação Nacional e a Independência',
      sections: [
        {
          id: 'hist-sec-1-1',
          title: 'Secção I - Marcos Históricos do Século XX',
          articles: [
            {
              id: 'hist-art-1',
              code: 'Tema 1',
              title: 'O Inicio da Luta Armada de Libertação Nacional (4 de Fevereiro de 1961)',
              definition: 'Início da insurreição armada contra o domínio colonial português em Luanda.',
              legalText: 'No dia 4 de Fevereiro de 1961, um grupo de patriotas angolanos armados maioritariamente com catanas e instrumentos tradicionais desencadeou o assalto à Casa de Reclusão Militar, à Cadeia de São Paulo e ao Posto Policial da 7.ª Esquadra em Luanda, com o objetivo de libertar os presos políticos detidos pelo regime colonialista português. Este ato de bravura histórica assinalou o início formal da Luta Armada de Libertação Nacional, que culminou com a conquista da Independência de Angola.',
              simpleExplanation: 'No dia 4 de Fevereiro de 1961, patriotas angolanos armados com catanas atacaram as prisões coloniais em Luanda para libertar presos políticos, marcando o início da luta armada de libertação nacional.',
              importantPoints: [
                'Data histórica celebrada como Dia do Início da Luta Armada de Libertação Nacional.',
                'Ação patriótica de assalto às cadeias de Luanda (Casa de Reclusão e Cadeira de São Paulo).',
                'Acelerou o surgimento do movimento de emancipação angolana.'
              ],
              examAlert: 'QUESTÃO DE MEMÓRIA OBRIGATÓRIA: 4 de Fevereiro de 1961 é a data de início da Luta Armada de Libertação Nacional de Angola.',
              questions: [
                {
                  id: 'q-hist-1',
                  question: 'O que se assinala em Angola no dia 4 de Fevereiro de 1961?',
                  options: [
                    'A Proclamação da Independência Nacional.',
                    'O Dia do Início da Luta Armada de Libertação Nacional.',
                    'A Assinatura dos Acordos de Paz do Luena.',
                    'A aprovação da Primeira Constituição.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O 4 de Fevereiro de 1961 marca o assalto às prisões coloniais em Luanda e o início formal da Luta Armada de Libertação Nacional.',
                  examContext: 'Cultura Geral e História de Angola'
                }
              ],
              flashcards: [
                {
                  id: 'fc-hist-1',
                  front: 'Qual o significado histórico do 4 de Fevereiro de 1961 em Angola?',
                  back: 'Marca o Início da Luta Armada de Libertação Nacional contra o regime colonial português.',
                  articleRef: 'História de Angola - Tema 1'
                }
              ]
            },
            {
              id: 'hist-art-2',
              code: 'Tema 2',
              title: 'Proclamação da Independência Nacional (11 de Novembro de 1975)',
              definition: 'Surgimento da República Popular de Angola como Estado soberano e livre.',
              legalText: 'Às zero horas do dia 11 de Novembro de 1975, na Praça da Independência em Luanda, o Fundador da Nação, Dr. António Agostinho Neto, proclamou solenemente perante África e o Mundo a Independência Nacional e a criação da República Popular de Angola (hoje República de Angola). O ato pôs fim a cerca de cinco séculos de dominação colonial e restabeleceu a dignidade e soberania do Povo Angolano sobre o seu próprio território.',
              simpleExplanation: 'À meia-noite do dia 11 de Novembro de 1975, o Dr. António Agostinho Neto proclamou em Luanda a Independência de Angola perante África e o Mundo.',
              importantPoints: [
                'António Agostinho Neto tornou-se o Primeiro Presidente da República de Angola e Herói Nacional.',
                'Fim de quase 500 anos de dominação colonial portuguesa.',
                'Dia da Independência Nacional - Feriado Nacional de celebração soberana.'
              ],
              examAlert: 'Atenção para Exame: António Agostinho Neto foi o fundador da Nação e Primeiro Presidente da República.',
              questions: [
                {
                  id: 'q-hist-2',
                  question: 'Quem proclamou a Independência Nacional de Angola no dia 11 de Novembro de 1975?',
                  options: [
                    'José Eduardo dos Santos.',
                    'Dr. António Agostinho Neto.',
                    'Rainha Nzinga Mbandi.',
                    'Holden Roberto.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Dr. António Agostinho Neto proclamou a Independência de Angola em Luanda, tornando-se o Primeiro Presidente do país.',
                  examContext: 'História de Angola MININT'
                }
              ],
              flashcards: [
                {
                  id: 'fc-hist-2',
                  front: 'Quem proclamou a Independência de Angola e em que data?',
                  back: 'Dr. António Agostinho Neto, no dia 11 de Novembro de 1975 em Luanda.',
                  articleRef: 'História de Angola - Tema 2'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'hist-cap-2',
      title: 'Capítulo II - O Caminho da Paz e Reconciliação Nacional',
      sections: [
        {
          id: 'hist-sec-2-1',
          title: 'Secção I - O Dia da Paz e da Reconciliação (4 de Abril de 2002)',
          articles: [
            {
              id: 'hist-art-3',
              code: 'Tema 3',
              title: 'O Memorando de Entendimento do Luena e o Dia da Paz (4 de Abril)',
              definition: 'Fim definitivo do conflito armado em Angola e consolidação da Paz Definitiva.',
              legalText: 'No dia 4 de Abril de 2002, foi assinado no Palácio dos Congressos em Luanda (na sequência dos acordos militares do Luena) o Memorando de Entendimento Complementar ao Protocolo de Lusaka entre as Chefias Militares das Forças Armadas Angolanas (FAA) e as Forças Militares da UNITA. A assinatura deste documento histórico pôs fim definitivo ao longo conflito armado civil, consagrou a reconciliação nacional, a desmilitarização e a consolidação da paz e unidade territorial em todo o País.',
              simpleExplanation: 'A 4 de Abril de 2002 foi assinado o Memorando de Entendimento na cidade do Luena entre as FAA e as Forças Militares da UNITA, pondo fim à guerra civil e unificando a nação.',
              importantPoints: [
                '4 de Abril: Dia da Paz e da Reconciliação Nacional.',
                'Assinatura do Memorando de Entendimento no Luena (Moxico).',
                'Permitiu a livre circulação de pessoas e bens em todo o território nacional.'
              ],
              examAlert: 'Frequente em exames: 4 de Abril é o Dia da Paz e Reconciliação Nacional.',
              questions: [
                {
                  id: 'q-hist-3',
                  question: 'Em que data e local foi assinado o Memorando de Entendimento que pós fim ao conflito armado em Angola?',
                  options: [
                    '11 de Novembro de 1975 em Luanda.',
                    '4 de Abril de 2002 na cidade do Luena (Moxico).',
                    '31 de Maio de 1991 em Bicesse.',
                    '20 de Novembro de 1994 em Lusaka.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A 4 de Abril de 2002 foi assinado no Luena o Memorando complementar aos acordos de Lusaka, selando a paz em Angola.',
                  examContext: 'História Recente e Cidadania'
                }
              ],
              flashcards: [
                {
                  id: 'fc-hist-3',
                  front: 'O que se celebra a 4 de Abril em Angola?',
                  back: 'O Dia da Paz e da Reconciliação Nacional, assinalando o fim do conflito armado em 2002.',
                  articleRef: 'História de Angola - Tema 3'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
