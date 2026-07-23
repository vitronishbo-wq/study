import { DiplomaModule } from '../../types/minint';

export const culturaGeralModule: DiplomaModule = {
  id: 'cultura_geral',
  title: 'Cultura Geral e Instituições Públicas',
  shortTitle: 'Cultura Geral',
  iconName: 'Globe',
  hierarchyLabel: 'Hierarquia VI: Conhecimentos Gerais e Divisão Administrativa de Angola',
  hierarchyLevel: 6,
  description: 'História, Geografia com a Nova DPA (Lei n.º 14/24), Organização do Estado, Símbolos Nacionais, Economia, Cultura e Ética Pública.',
  chapters: [
    {
      id: 'cg-cap-1',
      title: 'Capítulo I - História de Angola e Luta de Libertação Nacional',
      sections: [
        {
          id: 'cg-sec-1-1',
          title: 'Secção I - Do Período Pré-Colonial à Independência (1975-2002)',
          articles: [
            {
              id: 'cg-art-hist-1',
              code: 'Tópico 1.1',
              title: 'Reinos Antigos, Resistência e Colonização Portuguesa',
              legalText: `• Reinos Pré-Coloniais: Reino do Congo, Reino do Ndongo (governado pelos Ngola), Reino da Matamba e Reino do Viye/Bailundo.
• Rainha Nzinga Mbande (Ana de Sousa): Soberana do Ndongo e da Matamba no século XVII, símbolo máximo da resistência diplomática e militar contra a ocupação estrangeira.
• 1575: Fundação da cidade de Luanda por Paulo Dias de Novais, dando início formal à colonização portuguesa.
• 1961: Início da Luta Armada de Libertação Nacional (4 de Fevereiro e 15 de Março).`,
              definition: 'Processo histórico de formação da identidade angolana, desde as migrações Bantas e reinos seculares até ao início do nacionalismo moderno.',
              simpleExplanation: 'A história de Angola é marcada pela grandeza dos seus antigos reinos, pela heroica resistência da Rainha Nzinga Mbande e pela luta pela libertação nacional contra o domínio colonial.',
              importantPoints: [
                'Povoamento Banto: Introduziu a agricultura, metalurgia do ferro e estruturas sociais no século VI d.C.',
                'Reino do Ndongo: Origem da palavra "Angola" (do título dos soberanos: Ngola).',
                'Rainha Nzinga Mbande: Ícone nacional da resistência anticolonial no século XVII.',
                '1575: Paulo Dias de Novais funda Luanda.',
                '4 de Fevereiro de 1961: Início da Luta Armada de Libertação Nacional.'
              ],
              examAlert: 'Frequente em provas do MININT: Recordar que "Angola" deriva do título real "Ngola" do Reino do Ndongo e que Luanda foi fundada em 1575 por Paulo Dias de Novais.',
              questions: [
                {
                  id: 'q-hist-1',
                  question: 'Qual foi a soberana do Reino do Ndongo e Matamba que se destacou no século XVII pela resistência diplomática e militar contra a expansão colonial portuguesa?',
                  options: [
                    'Rainha Nzinga Mbande (Ana de Sousa).',
                    'Rainha Nhakatolo.',
                    'Princesa Nsuka.',
                    'Rainha Mwanangana.'
                  ],
                  correctAnswer: 0,
                  explanation: 'A Rainha Nzinga Mbande (Ana de Sousa) governou o Ndongo e a Matamba e liderou a resistência contra as forças portuguesas.',
                  examContext: 'História de Angola - Resistência Anticolonial'
                },
                {
                  id: 'q-hist-2',
                  question: 'Em que ano foi fundada a cidade de Luanda por Paulo Dias de Novais?',
                  options: [
                    '1482',
                    '1575',
                    '1961',
                    '1975'
                  ],
                  correctAnswer: 1,
                  explanation: 'Luanda foi fundada em 1575 por Paulo Dias de Novais, tornando-se a capital da colónia e posteriormente da República de Angola.',
                  examContext: 'História de Angola - Fundação de Luanda'
                }
              ],
              flashcards: [
                {
                  id: 'fc-hist-1',
                  front: 'De que título real deriva o nome "Angola"?',
                  back: 'Deriva do título "Ngola", usado pelos reis do histórico Reino do Ndongo.',
                  articleRef: 'História de Angola - Tópico 1.1'
                },
                {
                  id: 'fc-hist-2',
                  front: 'Qual é a data histórica da fundação da cidade de Luanda?',
                  back: '25 de Janeiro de 1575, por Paulo Dias de Novais.',
                  articleRef: 'História de Angola - Tópico 1.1'
                }
              ]
            },
            {
              id: 'cg-art-hist-2',
              code: 'Tópico 1.2',
              title: 'Independência Nacional (11 de Novembro de 1975) e a Paz de 2002',
              legalText: `• 11 de Novembro de 1975: Proclamação da Independência Nacional de Angola pelo Dr. António Agostinho Neto, primeiro Presidente da República.
• Movimentos de Libertação: MPLA, FNLA e UNITA.
• 1991: Acordos de Bicesse (transição para o multipartidarismo).
• 4 de Abril de 2002: Assinatura dos Acordos de Paz de Luena (Dia da Paz e da Reconciliação Nacional).`,
              definition: 'Marcos fundamentais da soberania estatal angolana e da conquista da paz definitiva.',
              simpleExplanation: 'Angola tornou-se independente a 11 de Novembro de 1975 sob a liderança de Agostinho Neto. Após anos de conflito interno, a paz definitiva foi alcançada a 4 de Abril de 2002.',
              importantPoints: [
                '11 de Novembro de 1975: Proclamação da Independência por António Agostinho Neto.',
                'Três Movimentos Históricos: MPLA, FNLA e UNITA.',
                '4 de Abril: Dia da Paz e Reconciliação Nacional (memorando de entendimento de Luena de 2002).',
                'Primeiro Presidente: Dr. António Agostinho Neto (Herói Nacional).'
              ],
              examAlert: 'Essencial em exames: 11 de Novembro é a Independência Nacional e 4 de Abril é o Dia da Paz e Reconciliação Nacional.',
              questions: [
                {
                  id: 'q-hist-3',
                  question: 'Quem proclamou a Independência Nacional de Angola a 11 de Novembro de 1975?',
                  options: [
                    'Dr. António Agostinho Neto.',
                    'José Eduardo dos Santos.',
                    'Jonas Savimbi.',
                    'Holden Roberto.'
                  ],
                  correctAnswer: 0,
                  explanation: 'O Dr. António Agostinho Neto proclamou a Independência Nacional a 11 de Novembro de 1975 em Luanda.',
                  examContext: 'História de Angola - Independência Nacional'
                }
              ],
              flashcards: [
                {
                  id: 'fc-hist-3',
                  front: 'O que se celebra em Angola no dia 4 de Abril?',
                  back: 'O Dia da Paz e da Reconciliação Nacional, assinalando o fim definitivo da guerra civil em 2002.',
                  articleRef: 'História de Angola - Tópico 1.2'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-2',
      title: 'Capítulo II - Geografia e Nova Divisão Político-Administrativa (DPA - Lei n.º 14/24)',
      sections: [
        {
          id: 'cg-sec-2-1',
          title: 'Secção I - Divisão Político-Administrativa e Geografia Física',
          articles: [
            {
              id: 'cg-art-geo-1',
              code: 'Tópico 2.1',
              title: 'Divisão Político-Administrativa de Angola (21 Províncias - Lei n.º 14/24)',
              legalText: `• Lei n.º 14/24, de 5 de Setembro (Lei da Divisão Político-Administrativa - DPA): Estabelece que a República de Angola organiza-se territorialmente em 21 Províncias, 326 Municípios e 378 Comunas.
• Artigo 213.º da CRA: Consagra a desconcentração e descentralização administrativa para reduzir as assimetrias regionais.
• Decreto Presidencial n.º 268/24: Aprova o Plano de Acção para a Implementação da Nova DPA.
• Decreto Presidencial n.º 270/24: Estabelece a Nova Classificação dos Municípios e estruturação das unidades territoriais.
• Lei n.º 8/25, de 16 de Setembro: Estabelece a Codificação Nacional das Unidades Territoriais.`,
              definition: 'Estruturação oficial do território angolano em 21 províncias, 326 municípios e 378 comunas nos termos da Lei n.º 14/24, de 5 de Setembro.',
              simpleExplanation: 'Com a aprovação da Lei n.º 14/24, de 5 de Setembro, Angola passou a contar oficialmente com 21 Províncias, aproximando a administração pública do cidadão e promovendo o desenvolvimento equilibrado de todo o território.',
              importantPoints: [
                'Estrutura Oficial DPA: 21 Províncias, 326 Municípios e 378 Comunas.',
                'Cabinda: Capital Cabinda.',
                'Zaire: Capital Mbanza Congo.',
                'Uíge: Capital Uíge.',
                'Bengo: Capital Dande (Caxito).',
                'Luanda: Capital Ingombota.',
                'Cuanza-Norte: Capital Cazengo (N\'dalatando).',
                'Cuanza-Sul: Capital Sumbe.',
                'Malanje: Capital Malanje.',
                'Lunda-Norte: Capital Dundo.',
                'Lunda-Sul: Capital Saurimo.',
                'Benguela: Capital Benguela.',
                'Huambo: Capital Huambo.',
                'Bié: Capital Cuito.',
                'Moxico: Capital Luena.',
                'Huíla: Capital Lubango.',
                'Namibe: Capital Moçâmedes.',
                'Cunene: Capital Cuanhama (Ondjiva).',
                'Cubango: Capital Menongue.',
                'Icolo e Bengo (Nova): Capital Catete (desmembrada de Luanda).',
                'Moxico Leste (Nova): Capital Cazombo (desmembrada do Moxico).',
                'Quando (Nova): Capital Mavinga (desmembrada do antigo Cuando Cubango).'
              ],
              examAlert: 'IMPERATIVO EM CONCURSOS: Angola tem 21 Províncias (Lei n.º 14/24). Não improvisar! Memorizar as 3 novas províncias e respetivas capitais: Icolo e Bengo (Catete), Moxico Leste (Cazombo) e Quando (Mavinga), bem como a província do Cubango (Menongue).',
              questions: [
                {
                  id: 'q-geo-1',
                  question: 'De acordo com a Lei n.º 14/24, de 5 de Setembro (Nova DPA de Angola), quantas províncias constituem a organização territorial do país?',
                  options: [
                    '18 Províncias.',
                    '21 Províncias.',
                    '20 Províncias.',
                    '25 Províncias.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A Lei n.º 14/24 consagrou oficialmente a nova Divisão Político-Administrativa de Angola composta por 21 Províncias, 326 Municípios e 378 Comunas.',
                  examContext: 'Cultura Geral - DPA de Angola (Lei n.º 14/24)'
                },
                {
                  id: 'q-geo-2',
                  question: 'Quais são as capitais das três novas províncias criadas pela Lei n.º 14/24 (Icolo e Bengo, Moxico Leste e Quando)?',
                  options: [
                    'Catete, Cazombo e Mavinga.',
                    'Caxito, Luena e Menongue.',
                    'Viana, Luau e Cuito Cuanavale.',
                    'Calulo, N\'dalatando e Ondjiva.'
                  ],
                  correctAnswer: 0,
                  explanation: 'A Lei n.º 14/24 fixou as seguintes capitais: Icolo e Bengo -> Catete; Moxico Leste -> Cazombo; Quando -> Mavinga.',
                  examContext: 'Cultura Geral - Capitais da Nova DPA'
                }
              ],
              flashcards: [
                {
                  id: 'fc-geo-1',
                  front: 'Quantas províncias tem Angola e qual é a principal lei de enquadramento da DPA?',
                  back: '21 Províncias, fundamentadas pela Lei n.º 14/24, de 5 de Setembro.',
                  articleRef: 'Lei n.º 14/24 - Divisão Político-Administrativa'
                },
                {
                  id: 'fc-geo-2',
                  front: 'Quais são as 3 novas províncias criadas em Angola e as suas capitais?',
                  back: '1. Icolo e Bengo - Capital: Catete\n2. Moxico Leste - Capital: Cazombo\n3. Quando - Capital: Mavinga',
                  articleRef: 'Lei n.º 14/24 - Divisão Político-Administrativa'
                }
              ]
            },
            {
              id: 'cg-art-geo-2',
              code: 'Tópico 2.2',
              title: 'Geografia Física, Relevo, Fronteiras e Hidrografia',
              legalText: `• Área Territorial: 1.246.700 km².
• Fronteiras Terrestres: RDC (Norte e Nordeste), Zâmbia (Leste), Namíbia (Sul) e Rep. do Congo (Norte de Cabinda).
• Ponto mais alto: Morro do Moco (2.620 m) na província do Huambo.
• Rio Kwanza: Maior rio 100% nacional. Nasce no Mungo (Huambo) e desagua na Barra do Kwanza (Luanda).`,
              definition: 'Caraterísticas do relevo, clima e recursos hídricos da República de Angola.',
              simpleExplanation: 'Angola situa-se na costa ocidental da África Austral. O seu relevo é dominado por planaltos e a sua rede hidrográfica é impulsionada pelo Rio Kwanza.',
              importantPoints: [
                'Área total: 1.246.700 km².',
                'Fronteiras: RDC, República do Congo, Zâmbia e Namíbia.',
                'Morro do Moco (2.620 m): Ponto culminante do país no Huambo.',
                'Rio Kwanza: Nasce no Mungo (Huambo) e dá nome à moeda nacional.'
              ],
              examAlert: 'Topônimos para concurso: Ponto mais alto = Morro do Moco (Huambo, 2.620m); Maior rio nacional = Rio Kwanza.',
              questions: [
                {
                  id: 'q-geo-3',
                  question: 'Qual é o ponto mais elevado de Angola e em que província se situa?',
                  options: [
                    'Morro do Moco (2.620 m) na província do Huambo.',
                    'Serra da Chela na província da Huíla.',
                    'Morro do Mepo no Namibe.',
                    'Pico do Kwanza no Bié.'
                  ],
                  correctAnswer: 0,
                  explanation: 'O Morro do Moco é o ponto mais alto de Angola com 2.620 metros de altitude, situado no Huambo.',
                  examContext: 'Geografia Física de Angola'
                }
              ],
              flashcards: [
                {
                  id: 'fc-geo-3',
                  front: 'Onde nasce o Rio Kwanza e qual a sua foz?',
                  back: 'Nasce no Mungo (Huambo) e desagua no Oceano Atlântico (Barra do Kwanza em Luanda).',
                  articleRef: 'Geografia de Angola'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-3',
      title: 'Capítulo III - Organização do Estado e Símbolos Nacionais',
      sections: [
        {
          id: 'cg-sec-3-1',
          title: 'Secção I - Estrutura Constitucional e Símbolos do Estado',
          articles: [
            {
              id: 'cg-art-est-1',
              code: 'Tópico 3.1',
              title: 'Órgãos de Soberania do Estado Angolano',
              legalText: `• Artigo 105.º da CRA: São órgãos de soberania o Presidente da República, a Assembleia Nacional e os Tribunais.
• Presidente da República: Chefe de Estado, Titular do Poder Executivo e Comandante-em-Chefe das Forças Armadas Angolanas.
• Assembleia Nacional: Órgão legislativo unicameral do Estado.
• Tribunais: Administram a justiça em nome do povo.`,
              definition: 'Estruturação dos poderes públicos consagrados na Constituição da República de Angola de 2010.',
              simpleExplanation: 'O Estado angolano organiza-se em três órgãos de soberania: Presidente da República (Executivo), Assembleia Nacional (Legislativo) e Tribunais (Judicial).',
              importantPoints: [
                'Presidente da República: Acumula as funções de Chefe de Estado, Chefe do Governo e Comandante-em-Chefe.',
                'Assembleia Nacional: Composta por deputados eleitos por sufrágio universal.',
                'Tribunais: Detêm a competência jurisdicional exclusiva.'
              ],
              examAlert: 'Pergunta clássica de concurso: O Presidente da República é também o Comandante-em-Chefe das Forças Armadas e Corpos Policiais/Segurança.',
              questions: [
                {
                  id: 'q-est-1',
                  question: 'Quais são os três Órgãos de Soberania consagrados no Artigo 105.º da Constituição da República de Angola?',
                  options: [
                    'O Presidente da República, a Assembleia Nacional e os Tribunais.',
                    'O Governo, o Parlamento e os Partidos Políticos.',
                    'O Presidente da República, os Ministérios e os Governos Provinciais.',
                    'A Polícia Nacional, as Forças Armadas e os Tribunais.'
                  ],
                  correctAnswer: 0,
                  explanation: 'Nos termos do Artigo 105.º da CRA, os órgãos de soberania são o Presidente da República, a Assembleia Nacional e os Tribunais.',
                  examContext: 'Direito Constitucional e Estado'
                }
              ],
              flashcards: [
                {
                  id: 'fc-est-1',
                  front: 'Quais são os 3 Órgãos de Soberania de Angola?',
                  back: '1. Presidente da República\n2. Assembleia Nacional\n3. Tribunais',
                  articleRef: 'Artigo 105.º da CRA'
                }
              ]
            },
            {
              id: 'cg-art-est-2',
              code: 'Tópico 3.2',
              title: 'Símbolos Nacionais da República de Angola (Art. 18.º da CRA)',
              legalText: `• Artigo 18.º da CRA: São símbolos nacionais a Bandeira Nacional, a Insígnia Nacional e o Hino Nacional ("Angola Avante").
• Bandeira Nacional: Duas faixas horizontais (Vermelho: sangue derramado na libertação; Preto: continente africano). Símbolo central em amarelo: Roda dentada (trabalhadores e indústria), Catana (trabalho e luta) e Estrela (solidariedade internacional e progresso).
• Hino Nacional: "Angola Avante" (adoptado em 11 de Novembro de 1975).`,
              definition: 'Elementos emblemáticos sagrados da soberania, unidade e identidade da pátria angolana.',
              simpleExplanation: 'A Bandeira, a Insígnia e o Hino Nacional "Angola Avante" simbolizam a história, a riqueza e a determinação do povo angolano.',
              importantPoints: [
                'Três Símbolos Sagrados: Bandeira, Insígnia e Hino Nacional.',
                'Cor Vermelha: Sangue derramado pelos heróis nacionais.',
                'Cor Preta: O continente africano.',
                'Cor Amarela: As riquezas do país.',
                'Catana: Símbolo do trabalho e da luta armada.',
                'Roda Dentada: Símbolo dos trabalhadores e da produção industrial.'
              ],
              examAlert: 'Atenção às questões sobre os símbolos na Bandeira: Catana = Luta/Trabalho; Roda Dentada = Indústria/Trabalhadores; Estrela = Progresso/Solidariedade.',
              questions: [
                {
                  id: 'q-sym-1',
                  question: 'O que representa a cor vermelha na Bandeira Nacional de Angola?',
                  options: [
                    'O sangue derramado pelos angolanos durante a opressão colonial e a luta de libertação.',
                    'As riquezas minerais do país.',
                    'O continente africano.',
                    'A paz e a concórdia nacional.'
                  ],
                  correctAnswer: 0,
                  explanation: 'A cor vermelha simboliza o sangue derramado pelos heróis durante a resistência anticolonial e a luta pela independência.',
                  examContext: 'Símbolos Nacionais de Angola'
                }
              ],
              flashcards: [
                {
                  id: 'fc-sym-1',
                  front: 'O que significam a Catana e a Roda Dentada no emblema da Bandeira Nacional?',
                  back: 'A Catana representa o trabalho e a luta armada; a Roda Dentada representa os trabalhadores e a industrialização.',
                  articleRef: 'Artigo 18.º da CRA'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-4',
      title: 'Capítulo IV - Economia, Cultura e Ética do Serviço Público',
      sections: [
        {
          id: 'cg-sec-4-1',
          title: 'Secção I - Sociedade, Diversidade e Deontologia',
          articles: [
            {
              id: 'cg-art-soc-1',
              code: 'Tópico 4.1',
              title: 'Diversidade Étnico-Linguística e Cultura Angolana',
              legalText: `• Língua Oficial: Português (Artigo 19.º da CRA).
• Línguas Nacionais: Umbundu, Kimbundu, Kikongo, Chokwe, Nyaneka, Cuanhama, entre outras.
• Principais Grupos Étnicos: Ovimbundu (centro/sul), Kimbundu (noroeste), Bakongo (norte).
• Património Mundial da UNESCO: Cidade de Mbanza Kongo (antiga capital do Reino do Congo).
• Danças e Ritmos Típicos: Semba (precursor do samba), Kizomba, Kabetula, Rebita.`,
              definition: 'Mosaico cultural e linguístico que define a identidade do povo angolano.',
              simpleExplanation: 'Angola possui o Português como língua oficial e uma rica variedade de línguas nacionais e expressões culturais únicas, como o Semba e o sítio histórico de Mbanza Kongo.',
              importantPoints: [
                'Língua Oficial: Português.',
                'Mbanza Kongo: Classificado como Património Mundial da UNESCO em 2017.',
                'Semba: Ritmo tradicional angolano e património imaterial.'
              ],
              examAlert: 'Questão de concurso: Mbanza Kongo foi a primeira cidade angolana inscrita na lista de Património Mundial da UNESCO.',
              questions: [
                {
                  id: 'q-cult-1',
                  question: 'Qual é o centro histórico angolano classificado pela UNESCO como Património Mundial da Humanidade?',
                  options: [
                    'A cidade de Mbanza Kongo.',
                    'A Fortaleza de São Miguel em Luanda.',
                    'As Pedras Negras de Pungo Andongo.',
                    'As Fendas da Tundavala.'
                  ],
                  correctAnswer: 0,
                  explanation: 'Mbanza Kongo, antiga capital do Reino do Congo, foi inscrita na lista de Património Mundial da UNESCO em 2017.',
                  examContext: 'Cultura e Património de Angola'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cult-1',
                  front: 'Qual é a língua oficial de Angola e quais as principais línguas nacionais?',
                  back: 'Oficial: Português. Nacionais: Umbundu, Kimbundu, Kikongo, Chokwe, Nyaneka, etc.',
                  articleRef: 'Artigo 19.º da CRA'
                }
              ]
            },
            {
              id: 'cg-art-eth-1',
              code: 'Tópico 4.2',
              title: 'Ética, Deontologia e Pauta Deontológica do Serviço Público',
              legalText: `• Resolução n.º 27/94: Aprova a Pauta Deontológica do Serviço Público em Angola.
• Princípios Fundamentais: Probidade, Legalidade, Imparcialidade, Neutralidade, Lealdade, Cortesia e Isenção.
• Deveres do Agente do MININT: Servir o interesse público, combater a corrupção e respeitar os Direitos Humanos.`,
              definition: 'Normas morais e deveres profissionais que regem a actuação dos agentes da Administração Pública e do MININT.',
              simpleExplanation: 'A actuação do funcionário público deve pautar-se pelo respeito rigoroso à lei, probidade e urbanidade no atendimento ao cidadão.',
              importantPoints: [
                'Pauta Deontológica: Resolução n.º 27/94.',
                'Princípios-Chave: Legalidade, probidade, transparência e isenção.',
                'Proibição de suborno ou recebimento de vantagens indevidas.'
              ],
              examAlert: 'Frequente nas provas do MININT: Conhecer os princípios da Pauta Deontológica do Serviço Público (Resolução n.º 27/94).',
              questions: [
                {
                  id: 'q-eth-1',
                  question: 'Qual é o diploma legal que aprova a Pauta Deontológica do Serviço Público na República de Angola?',
                  options: [
                    'Resolução n.º 27/94.',
                    'Decreto Presidencial n.º 32/18.',
                    'Lei n.º 14/24.',
                    'Lei n.º 22/12.'
                  ],
                  correctAnswer: 0,
                  explanation: 'A Pauta Deontológica do Serviço Público em Angola foi aprovada pela Resolução n.º 27/94.',
                  examContext: 'Ética e Deontologia no Serviço Público'
                }
              ],
              flashcards: [
                {
                  id: 'fc-eth-1',
                  front: 'Quais são 4 princípios fundamentais da Pauta Deontológica do Serviço Público?',
                  back: '1. Legalidade\n2. Probidade\n3. Imparcialidade\n4. Lealdade às Instituições',
                  articleRef: 'Resolução n.º 27/94'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
