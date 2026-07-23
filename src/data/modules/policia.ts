import { DiplomaModule } from '../../types/minint';

export const policiaModule: DiplomaModule = {
  id: 'policia',
  title: 'Estatuto Orgânico da Polícia Nacional de Angola',
  shortTitle: 'Polícia Nacional',
  iconName: 'ShieldAlert',
  hierarchyLabel: 'Hierarquia IV: Estatuto Orgânico da PNA (Força de Segurança Pública)',
  hierarchyLevel: 4,
  description: 'Organização, princípios de atuação, especialidades policiais, carreira, direitos e deveres do pessoal da Polícia Nacional de Angola (PNA).',
  chapters: [
    {
      id: 'pna-cap-1',
      title: 'Capítulo I - Princípios de Atuação e Deontologia Policial',
      sections: [
        {
          id: 'pna-sec-1-1',
          title: 'Secção I - Princípios Fundamentais do Agente',
          articles: [
            {
              id: 'pna-art-3',
              code: 'Artigo 3.º',
              title: 'Princípio da Legalidade e Proporcionalidade no Uso da Força',
              legalText: '1. A atuação dos membros da Polícia Nacional rege-se estritamente pelo princípio da legalidade, devendo atuar no respeito absoluto pela Constituição e demais legislação.\n2. O uso de meios de coação e de armas de fogo por parte da polícia só é permitido nos casos previstos na lei, obedecendo rigorosamente aos princípios da necessidade, adequação e proporcionalidade.',
              definition: 'Regras cardinais de utilização da força policial no contacto diário com o cidadão.',
              simpleExplanation: 'O agente de polícia não faz o que quer; faz apenas o que a lei autoriza. Armas de fogo e força física só podem ser usadas como último recurso estritamente necessário e proporcional.',
              importantPoints: [
                'Uso da força apenas quando strictly indispensável.',
                'Arma de fogo como recurso excecional para conter perigo iminente de morte ou lesão grave.',
                'Dever de aviso prévio e socorro imediato aos feridos.',
                'Proibição de qualquer prática de tortura, tratamentos cruéis ou degradantes.'
              ],
              examAlert: 'RECORRENTE EM PROVA: A proporcionalidade e necessidade são os limites absolutos do uso legítimo da força e de armas de fogo pela PNA.',
              questions: [
                {
                  id: 'q-pna-3',
                  question: 'Em que condições o agente da PNA pode fazer uso legítimo da força física ou arma de fogo?',
                  options: [
                    'Sempre que um cidadão questionar verbalmente a ordem do agente.',
                    'Apenas quando previsto em lei e respeitando rigorosamente a necessidade, adequação e proporcionalidade.',
                    'Livremente, conforme decisão pessoal e instantânea do chefe de patrulha.',
                    'Apenas se tiver autorização prévia por escrito do juiz de comarca.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O n.º 2 do Artigo 3.º impõe a observância estrita dos princípios da necessidade, adequação e proporcionalidade.',
                  examContext: 'Deontologia Policial PNA'
                }
              ],
              flashcards: [
                {
                  id: 'fc-pna-3',
                  front: 'Quais os 3 princípios essenciais para o uso da força pela PNA?',
                  back: '1. Necessidade (último recurso)\n2. Adequação (meio correto)\n3. Proporcionalidade (equilíbrio entre a ameaça e a resposta)',
                  articleRef: 'Artigo 3.º do Estatuto Orgânico da PNA'
                }
              ]
            },
            {
              id: 'pna-art-8',
              code: 'Artigo 8.º',
              title: 'Isenção Partidária e Dever de Imparcialidade',
              legalText: 'A Polícia Nacional é uma força pública apartidária. Os seus efetivos estão impedidos de exercer atividade política partidária ativa no exercício das suas funções ou fazer uso do uniforme para fins políticos.',
              definition: 'Neutralidade política das forças policiais do Estado.',
              simpleExplanation: 'A Polícia protege todos os cidadãos de forma igual, sem olhar a partidos, crenças ou origens.',
              importantPoints: [
                'Proibição de militância partidária ativa do agente fardado.',
                'Dever de urbanidade, aprumo e respeito perante o público.',
                'Igualdade de tratamento de todos os cidadãos.'
              ],
              examAlert: 'Atenção para Exame: O agente da PNA no ativo é apartidário. O descumprimento constitui infração disciplinar grave.',
              questions: [
                {
                  id: 'q-pna-8',
                  question: 'Qual é o dever do agente da PNA relativamente às organizações político-partidárias?',
                  options: [
                    'Promover ativamente o partido com assento governamental.',
                    'Manter estrita isenção e neutralidade apartidária.',
                    'Filiar-se obrigatoriamente num partido político.',
                    'Divulgar manifestos partidários durante o serviço.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A PNA é uma instituição apartidária e os seus agentes devem guardar total neutralidade e imparcialidade.',
                  examContext: 'Estatuto do Pessoal da PNA'
                }
              ],
              flashcards: [
                {
                  id: 'fc-pna-8',
                  front: 'O que significa o caráter apartidário da Polícia Nacional?',
                  back: 'Significa que a PNA não serve interesses partidários, atuando com absoluta imparcialidade e neutralidade ao serviço de todo o povo.',
                  articleRef: 'Artigo 8.º da PNA'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'pna-cap-2',
      title: 'Capítulo II - Especialidades e Comandos Nacionais',
      sections: [
        {
          id: 'pna-sec-2-1',
          title: 'Secção I - Corpos e Especialidades Policiais',
          articles: [
            {
              id: 'pna-art-25',
              code: 'Artigo 25.º',
              title: 'Especialidades e Ramos Operacionais da PNA',
              legalText: 'A Polícia Nacional de Angola estrutura-se nas seguintes especialidades centrais: a) Polícia de Ordem Pública; b) Polícia de Intervenção Rápida (PIR); c) Polícia de Guarda Fronteiras (PGF); d) Polícia de Trânsito; e) Polícia Fiscal e Aduaneira; f) Direcção de Investigação de Ilícitos Penais (DIIP).',
              definition: 'Divisão de trabalho e ramos funcionais de intervenção da PNA.',
              simpleExplanation: 'Cada ramo da PNA tem uma tarefa específica: a PIR atua em situações de alto risco, a PGF cuida das fronteiras terrestres e a Trânsito cuida da circulação rodoviária.',
              importantPoints: [
                'PIR: Força de reserva tática para alteração grave da ordem pública e antiterrorismo.',
                'PGF: Proteção, patrulhamento e inviolabilidade das fronteiras terrestres e fluviais.',
                'DIIP: Investigação de crimes, prevenção de ilícitos e recolha de inteligência policial.',
                'Polícia de Trânsito: Segurança rodoviária e fiscalização do Código da Estrada.'
              ],
              examAlert: 'MUITO IMPORTANTE: A PIR (Polícia de Intervenção Rápida) é a unidade especial tática da PNA criada para situações de crise extrema.',
              questions: [
                {
                  id: 'q-pna-25',
                  question: 'Qual a unidade especial da PNA vocacionada para a intervenção tática em distúrbios graves e operações de alto risco?',
                  options: [
                    'Polícia Fiscal e Aduaneira.',
                    'Polícia de Intervenção Rápida (PIR).',
                    'Polícia de Trânsito.',
                    'Serviço de Proteção Civil.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A PIR é a força especial de reserva do Comandante-Geral da PNA destinada a gerir crises graves de ordem pública e operações de risco elevado.',
                  examContext: 'Concurso PNA / MININT'
                }
              ],
              flashcards: [
                {
                  id: 'fc-pna-25',
                  front: 'Quais as principais especialidades operacionais da PNA?',
                  back: '• Ordem Pública\n• PIR (Intervenção Rápida)\n• PGF (Guarda Fronteiras)\n• Trânsito\n• DIIP (Investigação Criminal)\n• Polícia Fiscal',
                  articleRef: 'Artigo 25.º do Estatuto Orgânico da PNA'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
