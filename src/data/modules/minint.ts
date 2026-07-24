import { DiplomaModule } from '../../types/minint';

export const minintModule: DiplomaModule = {
  id: 'minint',
  title: 'Estatuto Orgânico do Ministério do Interior (MININT)',
  shortTitle: 'MININT',
  iconName: 'Shield',
  hierarchyLabel: 'Decreto Presidencial n.º 32/18, de 7 de Fevereiro',
  hierarchyLevel: 2,
  description: 'Estrutura orgânica, atribuições e funcionamento do Ministério do Interior (MININT) e dos seus 5 Órgãos Executivos Diretos (PNA, SIC, SME, SP e SPCB).',
  chapters: [
    {
      id: 'minint-dec-pre',
      title: 'Decreto Presidencial n.º 32/18 (Diploma de Aprovação)',
      sections: [
        {
          id: 'minint-sec-dec-1',
          title: 'Secção I - Aprovação e Revogação do Regime Orgânico Anterior',
          articles: [
            {
              id: 'minint-dec-art-1',
              code: 'Artigo 1.º (Aprovação)',
              title: 'Aprovação do Estatuto Orgânico do MININT',
              legalText: 'É aprovado o Estatuto Orgânico do Ministério do Interior, anexo ao presente Decreto Presidencial e que dele é parte integrante.',
              definition: 'Ato normativo presidencial que confere vigência jurídica ao Estatuto Orgânico do MININT.',
              simpleExplanation: 'Este decreto assinado pelo Presidente da República aprova oficialmente as regras de funcionamento e organização do MININT.',
              importantPoints: [
                'Aprovado pelo Presidente da República, João Manuel Gonçalves Lourenço.',
                'Entrou em vigor após apreciação pelo Conselho de Ministros.'
              ],
              examAlert: 'Questão de concurso: O Estatuto Orgânico do MININT foi aprovado pelo Decreto Presidencial n.º 32/18, de 7 de Fevereiro.',
              questions: [
                {
                  id: 'q-dec-1',
                  question: 'Qual o diploma legal que aprova o Estatuto Orgânico do Ministério do Interior em vigor?',
                  options: [
                    'Decreto Presidencial n.º 209/14, de 18 de Agosto.',
                    'Decreto Presidencial n.º 32/18, de 7 de Fevereiro.',
                    'Lei n.º 1/07, de 14 de Maio.',
                    'Decreto Executivo n.º 12/20.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Estatuto Orgânico do MININT foi aprovado pelo Decreto Presidencial n.º 32/18, de 7 de Fevereiro.',
                  examContext: 'Legislação Orgânica do MININT'
                }
              ],
              flashcards: [
                {
                  id: 'fc-dec-1',
                  front: 'Qual diploma aprova o Estatuto Orgânico do MININT?',
                  back: 'Decreto Presidencial n.º 32/18, de 7 de Fevereiro.',
                  articleRef: 'Artigo 1.º do Decreto Presidencial n.º 32/18'
                }
              ]
            },
            {
              id: 'minint-dec-art-2',
              code: 'Artigo 2.º (Revogação)',
              title: 'Revogação do Diploma Anterior',
              legalText: 'É revogada toda a legislação que contrarie o presente Diploma, nomeadamente o Decreto Presidencial n.º 209/14, de 18 de Agosto.',
              definition: 'Norma de revogação expressa do regime jurídico orgânico anterior.',
              simpleExplanation: 'O Decreto Presidencial n.º 32/18 substituiu integralmente o antigo diploma (Decreto Presidencial n.º 209/14).',
              importantPoints: [
                'Revogação expressa do Decreto Presidencial n.º 209/14.',
                'Eliminação de normas anteriores incompatíveis.'
              ],
              questions: [],
              flashcards: []
            }
          ]
        }
      ]
    },
    {
      id: 'minint-cap-1',
      title: 'Capítulo I – Disposições Gerais',
      sections: [
        {
          id: 'minint-sec-1-1',
          title: 'Secção I – Natureza, Atribuições e Princípios do MININT',
          articles: [
            {
              id: 'minint-art-1',
              code: 'Artigo 1.º',
              title: 'Natureza do Ministério do Interior',
          legalText: 'O Ministério do Interior, abreviadamente designado por «MININT», é o Departamento Ministerial que tem por missão propor a formulação, coordenar, executar e avaliar a política do Executivo, relativa à ordem interna e à segurança pública, assim como assegurar a inspecção e a fiscalização da actuação e desenvolvimento da administração da Polícia Nacional, do Serviço de Investigação Criminal, do Serviço de Migração e Estrangeiros, do Serviço Penitenciário e do Serviço de Protecção Civil e Bombeiros, com vista a garantir a ordem, a segurança e tranquilidade públicas.',
          definition: 'Departamento Ministerial responsável pela formulação, execução e fiscalização da política de ordem interna e segurança pública.',
          simpleExplanation: 'O MININT é o ministério encarregado de gerir e fiscalizar as forças de segurança interna: Polícia Nacional, SIC, SME, Prisões e Bombeiros.',
          importantPoints: [
            'Missão: propor, coordenar, executar e avaliar a política de ordem e segurança pública.',
            'Fiscaliza e inspecciona 5 órgãos executivos fundamentais: PNA, SIC, SME, SP e SPCB.',
            'Objetivo final: garantir a ordem, segurança e tranquilidade públicas.'
          ],
          examAlert: 'MUITO COBRADO: O Artigo 1.º define claramente que o MININT assegura a inspecção e fiscalização de exatamente 5 órgãos (PNA, SIC, SME, SP e SPCB).',
          questions: [
            {
              id: 'q-art-1-nat',
              question: 'Segundo o Artigo 1.º do Estatuto Orgânico, qual é a natureza e missão do MININT?',
              options: [
                'É um órgão judicial encarregado do julgamento de crimes militares e civis.',
                'É o Departamento Ministerial responsável por propor, coordenar, executar e avaliar a política relativa à ordem interna e segurança pública.',
                'É uma corporação privada de vigilância comunitária.',
                'É um órgão dependente do Ministério da Defesa Nacional para operações externas.'
              ],
              correctAnswer: 1,
              explanation: 'O MININT é o Departamento Ministerial encarregado da ordem interna, segurança pública e fiscalização do PNA, SIC, SME, SP e SPCB.',
              examContext: 'Concurso MININT - Natureza das Instituições'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-1',
              front: 'Qual é a missão do MININT de acordo com o Artigo 1.º?',
              back: 'Propor, coordenar, executar e avaliar a política de ordem interna e segurança pública, fiscalizando a actuação do PNA, SIC, SME, SP e SPCB.',
              articleRef: 'Artigo 1.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-2',
          code: 'Artigo 2.º',
          title: 'Atribuições nos 6 Domínios Fundamentais',
          legalText: `Além de outras previstas na Constituição da República de Angola, em lei ou em regulamento, são atribuições do Ministério do Interior as seguintes:
1. No domínio da actividade geral:
a) Propor e executar políticas públicas nos domínios da segurança, protecção dos direitos fundamentais, prevenção e repressão de crimes e transgressões;
b) Propor medidas de prevenção geral e de combate à criminalidade;
c) Propor medidas sobre políticas públicas, legislativas e regulamentares, nos domínios da segurança pública, destinadas a garantir a prevenção da criminalidade, protecção das fronteiras e de fluxos migratórios, a privação da liberdade dos condenados e detidos em condições de preservação da dignidade humana, bem como tomar medidas de precaução e socorro em situações de calamidade;
d) Prestar auxílio às autoridades públicas e privadas para manter a ordem e a tranquilidade públicas;
e) Colaborar com as autoridades públicas estatais, autárquicas, tradicionais para cumprimento da legalidade ou decisões judiciais;
f) Promover campanhas de sensibilização sobre ameaças da delinquência, tráfico de menores, exploração sexual e drogas;
g) Propor cooperação técnica internacional na segurança pública, protecção civil e privação da liberdade.

2. No domínio da Polícia Nacional:
a) Definir políticas e propor medidas legislativas e regulamentares para a manutenção da ordem e da tranquilidade públicas;
b) Controlar e fiscalizar a execução das políticas dos serviços encarregues da ordem e tranquilidade públicas;
c) Propor e executar políticas que visem o respeito da legalidade e defesa dos direitos e garantias dos cidadãos.

3. No domínio da Investigação Criminal (SIC):
a) Auxiliar as autoridades judiciais na administração da justiça;
b) Efectuar a instrução preparatória dos processos-crime;
c) Controlar o potencial delituoso de acordo com a sua perigosidade social;
d) Investigar e descobrir os autores dos crimes;
e) Analisar as causas que geram a criminalidade;
f) Realizar detenções, revistas, buscas e apreensões;
g) Prevenir e reprimir o branqueamento de capitais, crimes informáticos e económico-financeiros.

4. No domínio da Migração e Estrangeiros (SME):
a) Propor e executar a política migratória nacional;
b) Propor e executar medidas nos domínios da migração, estrangeiros e controlo de fronteiras terrestres, marítimas, fluviais e aéreas;
c) Emitir e fiscalizar o uso do Passaporte nacional;
d) Coordenar com Missões Diplomáticas e Consulares a emissão de actos consulares;
e) Fiscalizar a permanência de cidadãos estrangeiros e combater a imigração ilegal.

5. No domínio da Protecção Civil e Bombeiros (SPCB):
a) Propor e executar medidas de prevenção contra catástrofes naturais e calamidades;
b) Implementar programas de prevenção contra catástrofes e inundações;
c) Proceder ao combate, prevenção e extinção de incêndios;
d) Garantir as medidas no quadro da Protecção Civil.

6. No domínio do Serviço Penitenciário (SP):
a) Implementar medidas com vista à ressocialização dos reclusos;
b) Propor e executar programas de prevenção geral e especial;
c) Apresentar propostas para melhoria da dignidade humana dos reclusos e protecção dos seus direitos fundamentais;
d) Aumentar a instrução, capacitação técnico-profissional e envolvimento laboral dos reclusos.`,
          definition: 'Competências operacionais e administrativas distribuídas por domínios temáticos do MININT.',
          simpleExplanation: 'O Artigo 2.º detalha exatamente o que o MININT faz em 6 áreas: Geral, Polícia, Investigação Criminal (SIC), Migração (SME), Proteção Civil/Bombeiros (SPCB) e Prisões (SP).',
          importantPoints: [
            'Instrutoria preparatória de processos-crime e repressão a crimes financeiros (SIC).',
            'Emissão de passaportes e controlo das fronteiras terrestres, marítimas, fluviais e aéreas (SME).',
            'Prevenção de catástrofes e combate a incêndios (SPCB).',
            'Ressocialização e garantia da dignidade humana dos reclusos (SP).',
            'Manutenção da ordem e tranquilidade públicas (PNA).'
          ],
          examAlert: 'Frequente em Provas: Associar cada competência ao seu órgão executivo correspondente (ex: Emissão de Passaporte -> SME; Combate a Incêndios -> SPCB; Instrução Preparatória -> SIC; Ressocialização -> SP).',
          questions: [
            {
              id: 'q-art-2-atrib',
              question: 'A instrução preparatória dos processos-crime e o combate ao branqueamento de capitais insere-se no domínio de atribuições de qual órgão?',
              options: [
                'Serviço de Migração e Estrangeiros (SME).',
                'Serviço de Investigação Criminal (SIC).',
                'Serviço Penitenciário (SP).',
                'Caixa de Protecção Social.'
              ],
              correctAnswer: 1,
              explanation: 'A instrução preparatória dos processos-crime e a investigação de ilícitos penais e branqueamento de capitais cabem ao Serviço de Investigação Criminal (SIC).',
              examContext: 'Atribuições Específicas do MININT'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-2',
              front: 'Quais são os 6 domínios de atribuições do MININT consignados no Artigo 2.º?',
              back: '1. Actividade Geral\n2. Polícia Nacional\n3. Investigação Criminal\n4. Migração e Estrangeiros\n5. Protecção Civil e Bombeiros\n6. Serviço Penitenciário',
              articleRef: 'Artigo 2.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-3',
          code: 'Artigo 3.º',
          title: 'Princípios de Actividade e Deontologia',
          legalText: `1. O Ministério do Interior, seus órgãos e funcionários, bem como os serviços executivos centrais, locais e respectivos responsáveis e agentes, exercem a sua actividade em estrita observância dos seguintes princípios:
a) Da constitucionalidade e da legalidade;
b) Da proporcionalidade, da necessidade e da proibição do excesso;
c) Da imparcialidade e da neutralidade;
d) Da probidade administrativa;
e) Da colaboração com os particulares;
f) Da aproximação dos serviços aos cidadãos;
g) Da prossecução do interesse público;
h) Da integridade e da responsabilidade;
i) Da cortesia e da urbanidade;
j) Da reserva e da discrição;
k) Da parcimónia;
l) Da lealdade às instituições e entidades públicas.
2. Todos os funcionários do Ministério do Interior estão sujeitos aos valores da Pauta Deontológica do Serviço Público (Resolução n.º 27/94, de 26 de Agosto).`,
          definition: 'Conjunto de normas éticas, constitucionais e administrativas regentes da conduta dos efetivos do MININT.',
          simpleExplanation: 'Todos os agentes do MININT devem agir respeitando a lei, sem excesso de força, com urbanidade, lealdade e imparcialidade.',
          importantPoints: [
            'Princípio da proporcionalidade, necessidade e proibição do excesso no uso de força.',
            'Probidade administrativa, cortesia, reserva e lealdade às instituições.',
            'Sujeição à Pauta Deontológica do Serviço Público (Resolução n.º 27/94).'
          ],
          questions: [],
          flashcards: []
        }
      ]
    }
  ]
},
    {
      id: 'minint-cap-2',
      title: 'Capítulo II – Organização em Geral',
      sections: [
        {
          id: 'minint-sec-2-1',
          title: 'Secção I – Estrutura Orgânica e Mapeamento dos Serviços Executivos Diretos',
          articles: [
            {
              id: 'minint-art-4',
          code: 'Artigo 4.º',
          title: 'Estrutura Orgânica e Mapeamento dos 5 Serviços Executivos Directos',
          legalText: `A estrutura orgânica do Ministério do Interior compreende os seguintes órgãos e serviços:
1. Órgãos Centrais de Direcção Superior:
a) Ministro;
b) Secretários de Estado.

2. Órgãos de Apoio Consultivo:
a) Conselho Consultivo;
b) Conselho Superior de Quadros.

3. Serviços Executivos Directos (5 Órgãos):
a) Polícia Nacional (PNA);
b) Serviço de Investigação Criminal (SIC);
c) Serviço de Migração e Estrangeiros (SME);
d) Serviço Penitenciário (SP);
e) Serviço de Protecção Civil e Bombeiros (SPCB).

4. Serviços de Apoio Técnico:
a) Inspecção Geral;
b) Direcção de Recursos Humanos;
c) Direcção de Planeamento e Finanças;
d) Direcção de Telecomunicações e Tecnologias de Informação (DTTI);
e) Direcção de Logística;
f) Direcção de Administração e Serviços (DAS);
g) Direcção de Infra-Estruturas e Equipamentos (DIE);
h) Direcção de Saúde;
i) Direcção de Segurança Institucional;
j) Direcção de Estudos, Informação e Análise;
k) Gabinete Jurídico;
l) Gabinete de Intercâmbio e Cooperação;
m) Gabinete de Comunicação Institucional e Imprensa (GCII);
n) Direcção de Coordenação dos Centros Integrados de Segurança Pública (DCCISP).

5. Serviços de Apoio Instrumental:
a) Gabinetes do Ministro e dos Secretários de Estado;
b) Corpo de Conselheiros.

6. Serviço Superintendido: Caixa de Protecção Social.
7. Serviços Executivos Locais: Delegações Provinciais e Municipais.`,
          definition: 'Arquitetura institucional completa do Ministério do Interior.',
          simpleExplanation: 'O Artigo 4.º divide o MININT em 7 categorias orgânicas, destacando os 5 Serviços Executivos Directos que executam o trabalho operacional de segurança no terreno.',
          importantPoints: [
            'EXACTAMENTE 5 Serviços Executivos Directos: PNA, SIC, SME, SP e SPCB.',
            'Possuem autonomia administrativa e de gestão orçamental (inscritos no OGE como unidades orçamentais específicas).',
            'Superintendência sobre a Caixa de Protecção Social.'
          ],
          examAlert: 'PERGUNTA CHAVE DE PROVA: Quais são os 5 Serviços Executivos Directos do MININT? Resposta: Polícia Nacional, Serviço de Investigação Criminal (SIC), Serviço de Migração e Estrangeiros (SME), Serviço Penitenciário (SP) e Serviço de Protecção Civil e Bombeiros (SPCB).',
          questions: [
            {
              id: 'q-art-4-5orgs',
              question: 'Quais são os 5 Serviços Executivos Directos que integram a estrutura orgânica do MININT segundo o Artigo 4.º?',
              options: [
                'FAA, PNA, SINSE, ANPG e SME.',
                'Polícia Nacional, SIC, SME, Serviço Penitenciário e SPCB.',
                'Polícia Municipal, Guarda de Fronteiras, Bombeiros, Proteção Civil e ANAC.',
                'Inspecção Geral, Direcção de Recursos Humanos, DTTI, DIE e DAS.'
              ],
              correctAnswer: 1,
              explanation: 'Os 5 Serviços Executivos Directos são: Polícia Nacional (PNA), Serviço de Investigação Criminal (SIC), Serviço de Migração e Estrangeiros (SME), Serviço Penitenciário (SP) e Serviço de Protecção Civil e Bombeiros (SPCB).',
              examContext: 'Estrutura Orgânica Fundamental do MININT'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-4',
              front: 'Quais são os 5 Serviços Executivos Directos do MININT?',
              back: '1. Polícia Nacional (PNA)\n2. Serviço de Investigação Criminal (SIC)\n3. Serviço de Migração e Estrangeiros (SME)\n4. Serviço Penitenciário (SP)\n5. Serviço de Protecção Civil e Bombeiros (SPCB)',
              articleRef: 'Artigo 4.º, n.º 3 do Estatuto Orgânico do MININT'
            }
          ]
        }
      ]
    }
  ]
},
    {
      id: 'minint-cap-3',
      title: 'Capítulo III – Organização em Especial',
      sections: [
        {
          id: 'minint-sec-3-1',
          title: 'Secção I – Direcção Superior, Órgãos Executivos e Serviços Centrais',
          articles: [
            {
              id: 'minint-art-5',
          code: 'Artigo 5.º a 10.º',
          title: 'Direcção e Competências do Ministro e Secretários de Estado',
          legalText: 'O Ministério do Interior é dirigido pelo Ministro do Interior, coadjuvado por Secretários de Estado. O Ministro exerce poderes de direcção, superintendência, intervenção, tutela substitutiva, revogatória e sancionatória sobre os serviços. No exercício de competências externas, exara Decretos Executivos e Despachos; internamente, emite Ordens de Serviço, Circulares e Directivas.',
          definition: 'Estatuto dos órgãos centrais de direcção superior do Ministério.',
          simpleExplanation: 'O Ministro do Interior é a autoridade máxima do MININT. Os Secretários de Estado são seus auxiliares diretos e podem receber poderes subdelegados.',
          importantPoints: [
            'Atos com eficácia externa: Decretos Executivos e Despachos (publicados no Diário da República).',
            'Atos de caráter interno: Ordens de Serviço, Circulares e Directivas.',
            'Poder de avocação: o Ministro pode avocar a qualquer momento competências subdelegadas.'
          ],
          questions: [
            {
              id: 'q-art-7-actos',
              question: 'Quais os instrumentos normativos utilizados pelo Ministro do Interior para decisões com eficácia externa?',
              options: [
                'Ordens de Serviço e Circulares Internas.',
                'Decretos Executivos e Despachos.',
                'Leis Orgânicas e Decretos Presidenciais.',
                'Avisos e Instruções Técnicas.'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos do Artigo 7.º, o Ministro exara Decretos Executivos e Despachos para actos com eficácia externa.',
              examContext: 'Forma dos Atos Administrativos no MININT'
            }
          ],
          flashcards: []
        },
        {
          id: 'minint-art-13',
          code: 'Artigo 13.º e 14.º',
          title: 'Natureza Jurídica dos Serviços Executivos Directos',
          legalText: 'Os Serviços Executivos Directos têm a natureza de órgãos da Administração Directa do Estado, dotados de autonomia administrativa e de gestão orçamental. No quadro da autonomia orçamental, cada serviço executivo central é inscrito no Orçamento Geral do Estado (OGE) como unidade orçamental específica.',
          definition: 'Estatuto de autonomia administrativa e financeira conferido às corporações operacionais do MININT.',
          simpleExplanation: 'Cada um dos 5 órgãos executivos (PNA, SIC, SME, SP, SPCB) possui orçamento próprio no OGE e capacidade de gestão administrativa.',
          importantPoints: [
            'Inscrição individualizada no OGE como unidade orçamental.',
            'Poderes para praticar atos definitivos com eficácia externa e celebrar contratos.',
            'Submissão aos poderes de hierarquia e fiscalização do Ministro do Interior.'
          ],
          questions: [],
          flashcards: []
        },
        {
          id: 'minint-art-15',
          code: 'Artigo 15.º',
          title: 'Órgão Executivo 1: Polícia Nacional (PNA)',
          legalText: '1. A Polícia Nacional é o órgão executivo central dotado de forças e serviços, ao qual compete assegurar a ordem e tranquilidade públicas, a defesa da legalidade democrática, o respeito pelo regular exercício dos direitos e liberdades fundamentais dos cidadãos, a prevenção da criminalidade, a protecção das fronteiras, colaborar na execução da política de defesa nacional, nos termos da lei, bem como reprimir as transgressões.\n2. A Polícia Nacional é dirigida por um Comandante Geral, nomeado em comissão de serviço pelo Presidente da República e Comandante-em-Chefe, sendo coadjuvado por Segundos Comandantes Gerais.',
          definition: 'Força paramilitar de segurança pública e manutenção da ordem democrática.',
          simpleExplanation: 'A PNA é responsável pelo policiamento ostensivo, manutenção da paz social, prevenção criminal e garantia da ordem pública.',
          importantPoints: [
            'Dirigida por um Comandante Geral (nomeado pelo Presidente da República e Comandante-em-Chefe).',
            'Garante o exercício dos direitos fundamentais e combate transgressões.',
            'Colabora na defesa nacional e proteção de fronteiras.'
          ],
          examAlert: 'Frequente em exames: Quem nomeia o Comandante Geral da Polícia Nacional? Resposta: O Presidente da República e Comandante-em-Chefe das Forças Armadas.',
          questions: [
            {
              id: 'q-art-15-pna',
              question: 'Quem dirige a Polícia Nacional e por quem é nomeado?',
              options: [
                'Por um Director Geral, nomeado pelo Ministro do Interior.',
                'Por um Comandante Geral, nomeado pelo Presidente da República e Comandante-em-Chefe.',
                'Por um Inspector Geral, nomeado pelo Conselho de Ministros.',
                'Por um Delegado Provincial, nomeado pelo Governador.'
              ],
              correctAnswer: 1,
              explanation: 'A PNA é dirigida por um Comandante Geral nomeado pelo Presidente da República e Comandante-em-Chefe.',
              examContext: 'Organização da Polícia Nacional'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-15',
              front: 'Qual a missão da Polícia Nacional (PNA) no Artigo 15.º?',
              back: 'Assegurar a ordem e tranquilidade públicas, defesa da legalidade democrática, prevenção da criminalidade e repressão de transgressões.',
              articleRef: 'Artigo 15.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-16',
          code: 'Artigo 16.º',
          title: 'Órgão Executivo 2: Serviço de Investigação Criminal (SIC)',
          legalText: '1. O Serviço de Investigação Criminal é o órgão executivo central ao qual cabe executar as políticas e medidas legislativas destinadas a investigar indícios de crimes, a adoptar os meios de prevenção e repressão da criminalidade, do crime organizado, do tráfico de estupefacientes, da corrupção, do crime económico e financeiro e demais crimes contra as pessoas e contra a propriedade, realizar a instrução preparatória dos processos-crime em todas as causas de sua competência e efectuar detenções, revistas, buscas e apreensões, nos termos da lei.\n2. O Serviço de Investigação Criminal é dirigido por um Director Geral, nomeado em comissão de serviço pelo Presidente da República, sendo coadjuvado por Directores Gerais-Adjuntos.',
          definition: 'Órgão de polícia judiciária especializado em investigação criminal e instrução preparatória.',
          simpleExplanation: 'O SIC investiga crimes graves (corrupção, drogas, homicídios, fraudes financeiras), realiza buscas, apreensões e conduz a instrução preparatória dos processos penais.',
          importantPoints: [
            'Competência criminal especializada: crime organizado, corrupção, branqueamento e tráfico.',
            'Instrução preparatória dos processos-crime sob orientação do Ministério Público.',
            'Dirigido por um Director Geral, nomeado pelo Presidente da República.'
          ],
          examAlert: 'Muito cobrado: O SIC realiza a instrução preparatória dos processos-crime em auxílio às autoridades judiciárias.',
          questions: [
            {
              id: 'q-art-16-sic',
              question: 'Qual é a principal atribuição do Serviço de Investigação Criminal (SIC)?',
              options: [
                'Emissão de vistos de permanência a estrangeiros.',
                'Investigar indícios de crimes, combate ao crime organizado e instrução preparatória de processos-crime.',
                'Combate a incêndios florestais e urbanos.',
                'Policiamento ostensivo de trânsito rodoviário.'
              ],
              correctAnswer: 1,
              explanation: 'O SIC é o órgão encarregado da investigação criminal, instrução preparatória de processos e repressão ao crime organizado.',
              examContext: 'Atribuições do SIC'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-16',
              front: 'Quem dirige o SIC e qual sua função essencial?',
              back: 'Dirigido por um Director Geral. Função: Investigação criminal, instrução preparatória de processos-crime, buscas, apreensões e combate ao crime organizado.',
              articleRef: 'Artigo 16.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-17',
          code: 'Artigo 17.º',
          title: 'Órgão Executivo 3: Serviço de Migração e Estrangeiros (SME)',
          legalText: '1. O Serviço de Migração e Estrangeiros é o órgão executivo central ao qual compete executar as políticas e medidas legislativas e regulamentares relacionadas com a entrada, trânsito, permanência, residência e saída de cidadãos estrangeiros do território nacional.\n2. Ao Serviço de Migração e Estrangeiros compete igualmente fazer o controlo do movimento de pessoas, através das fronteiras terrestres, marítimas, fluviais e aéreas e a emissão e o controlo do passaporte nacional.\n3. O Serviço de Migração e Estrangeiros é dirigido por um Director Geral, nomeado em comissão de serviço pelo Presidente da República, sendo coadjuvado por Directores Gerais-Adjuntos.',
          definition: 'Órgão de autoridade migratória e controlo de fronteiras nacionais.',
          simpleExplanation: 'O SME cuida da emissão do passaporte angolano, controlo de entradas e saídas no país (aeroportos, portos e fronteiras) e fiscalização de cidadãos estrangeiros.',
          importantPoints: [
            'Controlo de fronteiras terrestres, marítimas, fluviais e aéreas.',
            'Emissão e controlo do Passaporte Nacional.',
            'Fiscalização da imigração ilegal e permanência de estrangeiros.',
            'Dirigido por um Director Geral nomeado pelo Presidente da República.'
          ],
          examAlert: 'Frequente em Provas: A emissão do Passaporte Nacional é competência exclusiva do SME.',
          questions: [
            {
              id: 'q-art-17-sme',
              question: 'A quem compete a emissão do Passaporte Nacional e o controlo das fronteiras terrestres, marítimas, fluviais e aéreas?',
              options: [
                'À Polícia de Guarda Fronteiras da PNA.',
                'Ao Serviço de Migração e Estrangeiros (SME).',
                'Ao Ministério das Relações Exteriores.',
                'Ao Serviço de Investigação Criminal.'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos do Artigo 17.º, n.º 2, a emissão e controlo do passaporte e fiscalização de fronteiras cabe ao SME.',
              examContext: 'Atribuições do SME'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-17',
              front: 'Quais as principais competências do SME?',
              back: 'Controlo do movimento de pessoas nas fronteiras (terrestres, marítimas, fluviais, aéreas), emissão de passaportes e combate à imigração ilegal.',
              articleRef: 'Artigo 17.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-18',
          code: 'Artigo 18.º',
          title: 'Órgão Executivo 4: Serviço Penitenciário (SP)',
          legalText: '1. O Serviço Penitenciário é o órgão executivo central ao qual compete executar as medidas privativas da liberdade dos cidadãos, determinadas por autoridades judiciais competentes.\n2. Cabe ao Serviço Penitenciário executar políticas públicas de reabilitação e reinserção social dos reclusos.\n3. Ao Serviço Penitenciário cabe, igualmente, fiscalizar o cumprimento das medidas de prisão preventiva, assim como dos prazos para liberdade condicional.\n4. O Serviço Penitenciário é dirigido por um Director Geral, nomeado em comissão de serviço pelo Presidente da República, sendo coadjuvado por Directores Gerais-Adjuntos.',
          definition: 'Órgão de administração do sistema prisional e execução de penas.',
          simpleExplanation: 'O SP gere os estabelecimentos prisionais, garante a custódia dos reclusos, fiscaliza os prazos de prisão e promove a reinserção social dos reclusos.',
          importantPoints: [
            'Execução das penas e medidas privativas de liberdade ordenadas pelos tribunais.',
            'Promoção do trabalho, instrução e reabilitação social dos presos.',
            'Fiscalização da prisão preventiva e liberdade condicional.',
            'Dirigido por um Director Geral nomeado pelo Presidente da República.'
          ],
          questions: [
            {
              id: 'q-art-18-sp',
              question: 'Qual é o órgão responsável pela custódia de reclusos e execução das medidas privativas de liberdade em Angola?',
              options: [
                'Polícia Nacional.',
                'Serviço Penitenciário (SP).',
                'Serviço de Investigação Criminal.',
                'Inspecção Geral do MININT.'
              ],
              correctAnswer: 1,
              explanation: 'O Serviço Penitenciário (SP) é o órgão responsável pela execução das penas privativas de liberdade e reabilitação dos reclusos.',
              examContext: 'Sistema Prisional Angolano'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-18',
              front: 'Qual a dupla missão do Serviço Penitenciário (SP)?',
              back: '1. Executar medidas privativas de liberdade decretadas pelos juízes.\n2. Promover a reabilitação e reinserção social dos reclusos.',
              articleRef: 'Artigo 18.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-19',
          code: 'Artigo 19.º',
          title: 'Órgão Executivo 5: Serviço de Protecção Civil e Bombeiros (SPCB)',
          legalText: '1. O Serviço de Protecção Civil e Bombeiros é o órgão executivo central responsável por coordenar a actividade de prevenção e socorro, em casos de calamidades, inundações, extinção de incêndios, socorro a náufragos, acidentes de viação, ferroviários e de aviação.\n2. O Serviço de Protecção Civil e Bombeiros é dirigido por um Comandante, nomeado em comissão de serviço pelo Presidente da República, sendo coadjuvado por Comandantes-Adjuntos.',
          definition: 'Corpo operacional de resposta a emergências, resgate e protecção contra calamidades.',
          simpleExplanation: 'O SPCB actua no combate a incêndios, salvamento de vítimas de acidentes, resgate em inundações e gestão de desastres naturais.',
          importantPoints: [
            'Combate e extinção de incêndios urbanos e industriais.',
            'Socorro a náufragos, vítimas de acidentes de viação, comboios e aviação.',
            'Coordenação de acções de protecção civil perante calamidades.',
            'Dirigido por um Comandante nomeado pelo Presidente da República.'
          ],
          questions: [
            {
              id: 'q-art-19-spcb',
              question: 'Qual o órgão competente no MININT para a extinção de incêndios e socorro em acidentes de viação e aviação?',
              options: [
                'Serviço de Protecção Civil e Bombeiros (SPCB).',
                'Cruz Vermelha de Angola.',
                'Direcção de Saúde do MININT.',
                'Polícia de Trânsito.'
              ],
              correctAnswer: 0,
              explanation: 'O Serviço de Protecção Civil e Bombeiros (SPCB) é o órgão responsável pelo socorro, combate a incêndios e mitigação de catástrofes.',
              examContext: 'Atribuições do SPCB'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-19',
              front: 'Quem dirige o SPCB e quais são suas frentes de atuação?',
              back: 'Dirigido por um Comandante (nomeado pelo Presidente da República). Atua na extinção de incêndios, resgate, socorro a náufragos e acidentes graves.',
              articleRef: 'Artigo 19.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-20-33',
          code: 'Artigos 20.º a 33.º',
          title: 'Serviços de Apoio Técnico e Unidades de Destaque',
          legalText: `Os Serviços de Apoio Técnico garantem o funcionamento especializado do Ministério:
• Artigo 20.º - Inspecção Geral (IG): Auditoria, sindicâncias, fiscalização e inquéritos (dirigida por Inspector Geral equiparado a Secretário de Estado).
• Artigo 21.º - Direcção de Recursos Humanos: Gestão de carreiras e pessoal.
• Artigo 22.º - Direcção de Planeamento e Finanças: Orçamento, património e investimentos públicos.
• Artigo 23.º - DTTI: Telecomunicações e sistemas informáticos.
• Artigo 24.º - Direcção de Logística: Armamento, medicamentos e fardamento.
• Artigo 25.º - DAS: Administração, expediente e protocolo.
• Artigo 26.º - DIE: Infra-estruturas, obras e manutenção.
• Artigo 27.º - Direcção de Saúde: Assistência médica e sanitária aos efetivos e reclusos.
• Artigo 28.º - Segurança Institucional: Proteção física de edifícios e segredo de Estado.
• Artigo 29.º - Direcção de Estudos, Informação e Análise: Base de dados e análise criminal.
• Artigo 30.º - Gabinete Jurídico: Elaboração de leis e pareceres jurídicos.
• Artigo 31.º - Gabinete de Intercâmbio e Cooperação: Relações internacionais e cooperação.
• Artigo 32.º - GCII: Comunicação institucional e imprensa.
• Artigo 33.º - DCCISP: Coordenação dos Centros Integrados de Segurança Pública (CISP).`,
          definition: 'Órgãos de assessoria técnica, infraestrutura, auditoria e inteligência operacional.',
          simpleExplanation: 'São os departamentos centrais que sustentam a parte administrativa, jurídica, financeira, médica, tecnológica (CISP) e de auditoria do MININT.',
          importantPoints: [
            'Inspecção Geral (IG): chefiada por Inspector Geral equiparado a Secretário de Estado.',
            'DCCISP (Artigo 33.º): coordena a rede nacional dos Centros Integrados de Segurança Pública (CISP) e videovigilância.',
            'Caixa de Protecção Social (Artigo 35.º): órgão superintendido pelo MININT para segurança social do pessoal.'
          ],
          questions: [
            {
              id: 'q-art-33-cisp',
              question: 'A coordenação dos Centros Integrados de Segurança Pública (CISP) insere-se no âmbito de qual serviço do MININT?',
              options: [
                'DCCISP - Direcção de Coordenação dos Centros Integrados de Segurança Pública (Artigo 33.º).',
                'Inspecção Geral.',
                'Gabinete do Secretário de Estado.',
                'Gabinete de Comunicação Institucional.'
              ],
              correctAnswer: 0,
              explanation: 'A DCCISP (Artigo 33.º) é o serviço de apoio técnico encarregado da coordenação do Centro Nacional e Centros Provinciais do CISP.',
              examContext: 'Tecnologia de Segurança do MININT'
            }
          ],
          flashcards: []
        },
        {
          id: 'minint-art-36-39',
          code: 'Artigos 36.º a 39.º',
          title: 'Serviços Executivos Locais (Delegações Provinciais e Municipais)',
          legalText: 'As Delegações Provinciais são órgãos desconcentrados do MININT aos quais compete coordenar as actividades dos diferentes órgãos provinciais e fiscalizar a execução das políticas de segurança. Estão sujeitas a dupla subordinação: dependem orgânica e metodologicamente do MININT e funcionalmente dos Governos Provinciais. São dirigidas por Delegados Provinciais nomeados pelo Ministro do Interior.',
          definition: 'Estruturas de representação territorial e coordenação local das forças do MININT.',
          simpleExplanation: 'As Delegações Provinciais e Municipais garantem a presença do MININT em todas as províncias e municípios de Angola.',
          importantPoints: [
            'Dupla subordinação: Dependência orgânica do MININT e funcional dos Governos Provinciais.',
            'Delegados Provinciais nomeados por Despacho do Ministro do Interior.',
            'Coordenam localmente a PNA, SIC, SME, SP e SPCB.'
          ],
          examAlert: 'Ponto crítico de concurso: O princípio da dupla subordinação das Delegações Provinciais (MININT + Governo Provincial).',
          questions: [
            {
              id: 'q-art-38-subord',
              question: 'A que regime de subordinação estão sujeitas as Delegações Provinciais do Ministério do Interior?',
              options: [
                'Subordinação única e exclusiva à Assembleia Nacional.',
                'Dupla subordinação: dependem orgânica e metodologicamente do MININT e funcionalmente dos Governos Provinciais.',
                'Subordinação autónoma das Forças Armadas.',
                'Dependência direta do Ministério da Justiça.'
              ],
              correctAnswer: 1,
              explanation: 'As Delegações Provinciais estão sujeitas a dupla subordinação (MININT e Governo Provincial), conforme o Artigo 38.º.',
              examContext: 'Administração Local do MININT'
            }
          ],
          flashcards: [
            {
              id: 'fc-art-38',
              front: 'O que significa a dupla subordinação das Delegações Provinciais do MININT?',
              back: 'Significa que dependem orgânica e metodologicamente do Ministério do Interior e funcionalmente do Governo Provincial local.',
              articleRef: 'Artigo 38.º do Estatuto Orgânico do MININT'
            }
          ]
        },
        {
          id: 'minint-art-42-44',
          code: 'Artigos 42.º a 44.º',
          title: 'Quadro de Pessoal e Anexos (Quadro de 16.425 Lugares)',
          legalText: 'O quadro de pessoal do regime geral e o organigrama dos serviços centrais do Ministério do Interior são os constantes dos Quadros I e II anexos ao Estatuto (totalizando 16.425 lugares de regime geral). O MININT possui igualmente quadro de pessoal do regime especial de carreiras. Os regulamentos internos dos serviços são aprovados por Decreto Executivo do Ministro.',
          definition: 'Disposições finais sobre carreiras, efetivos de pessoal e organograma.',
          simpleExplanation: 'Fixa o quadro legal de pessoal de regime geral (16.425 vagas) e de carreiras especiais (policiais, investigação, migração, prisional e bombeiros).',
          importantPoints: [
            'Anexo I: Quadro de Pessoal do Regime Geral (16.425 lugares).',
            'Carreiras especiais policiais e paramilitares regidas por estatutos próprios.',
            'Regulamentos internos aprovados por Decreto Executivo do Ministro.'
          ],
          questions: [],
          flashcards: []
        }
      ]
    }
  ]
}
]
};
