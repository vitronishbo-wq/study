import { DiplomaModule } from '../../types/minint';

export const culturaGeralModule: DiplomaModule = {
  id: 'cultura_geral',
  title: 'Cultura Geral e Instituições Públicas',
  shortTitle: 'Cultura Geral',
  iconName: 'Globe',
  hierarchyLabel: 'Hierarquia VI: Conhecimentos Gerais e Divisão Administrativa de Angola',
  hierarchyLevel: 6,
  description: 'Organização geográfica e político-administrativa de Angola, instituições de soberania, geografia física e cívica.',
  chapters: [
    {
      id: 'cg-cap-1',
      title: 'Capítulo I - Geografia e Organização Administrativa',
      sections: [
        {
          id: 'cg-sec-1-1',
          title: 'Secção I - Divisão Político-Administrativa de Angola',
          articles: [
            {
              id: 'cg-art-1',
              code: 'Tópico 1',
              title: 'Divisão Territorial e Províncias de Angola',
              definition: 'Estruturação do território nacional em províncias, municípios e comunas.',
              simpleExplanation: 'Angola possui 18 Províncias históricas (Luanda, Benguela, Huambo, Huíla, Cabinda, Moxico, etc.), com Luanda como Capital do Estado.',
              importantPoints: [
                'Capital do País: Luanda.',
                'Maior Província em extensão territorial: Moxico.',
                'Província com foz do Rio Kwanza: Cuanza Sul e Luanda (Barra do Kwanza).',
                'Fronteiras terrestres: República do Congo, República Democrática do Congo, Zâmbia e Namíbia.'
              ],
              examAlert: 'Frequente em exames: Memorizar os países vizinhos que fazem fronteira com Angola ao Norte, Leste e Sul.',
              questions: [
                {
                  id: 'q-cg-1',
                  question: 'Quais os países que fazem fronteira terrestre direta com a República de Angola?',
                  options: [
                    'RDC, Zâmbia, Namíbia e República do Congo (Cabinda).',
                    'Moçambique, África do Sul e Zimbabwe.',
                    'Gabão, Camarões e São Tomé e Príncipe.',
                    'Botswana, Namíbia e Tanzânia.'
                  ],
                  correctAnswer: 0,
                  explanation: 'Angola limita a Norte e Nordeste com a RDC e Rep. do Congo, a Leste com a Zâmbia e ao Sul com a Namíbia.',
                  examContext: 'Cultura Geral e Geografia'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cg-1',
                  front: 'Quais são os 4 países que fazem fronteira com Angola?',
                  back: '1. República Democrática do Congo (RDC)\n2. República do Congo\n3. Zâmbia\n4. Namíbia',
                  articleRef: 'Cultura Geral - Tópico 1'
                }
              ]
            },
            {
              id: 'cg-art-2',
              code: 'Tópico 2',
              title: 'O Rio Kwanza e Recursos Hídricos de Angola',
              definition: 'Maior rio exclusivamente angolano e símbolo de identidade nacional.',
              simpleExplanation: 'O Rio Kwanza nasce no Mungo (Província do Huambo) e desagua no Oceano Atlântico na Barra do Kwanza (Luanda), dando o nome à moeda nacional.',
              importantPoints: [
                'Nascente: Mungo (Huambo).',
                'Foz: Barra do Kwanza (Oceano Atlântico).',
                'Importância económica: Hidroelétricas (Capanda, Laúca, Cambambe).',
                'Deu nome à moeda oficial de Angola: Kwanza (AOA).'
              ],
              examAlert: 'Atenção para Exame: O Rio Kwanza é o maior rio totalmente nacional de Angola.',
              questions: [
                {
                  id: 'q-cg-2',
                  question: 'Onde nasce o Rio Kwanza, o maior rio 100% nacional de Angola?',
                  options: [
                    'Na província de Cabinda.',
                    'No município do Mungo, na Província do Huambo.',
                    'Nas serras da Huíla.',
                    'Na província do Moxico.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Rio Kwanza tem a sua nascente no Mungo, província do Huambo, percorrendo mais de 960 km até ao Atlântico.',
                  examContext: 'Cultura Geral e Geografia Nacional'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cg-2',
                  front: 'Onde nasce e onde desagua o Rio Kwanza?',
                  back: 'Nasce no Mungo (Huambo) e desagua no Barra do Kwanza / Barra do Dande no Oceano Atlântico.',
                  articleRef: 'Cultura Geral - Tópico 2'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-2',
      title: 'Capítulo II - Órgãos de Soberania do Estado',
      sections: [
        {
          id: 'cg-sec-2-1',
          title: 'Secção I - Poderes Públicos',
          articles: [
            {
              id: 'cg-art-3',
              code: 'Tópico 3',
              title: 'Os Quatro Órgãos de Soberania',
              definition: 'Instituições constitucionais titulares do poder do Estado em Angola.',
              simpleExplanation: 'Os quatro órgãos de soberania de Angola são: O Presidente da República, A Assembleia Nacional, Os Tribunais e O Conselho da República.',
              importantPoints: [
                'Presidente da República: Chefe de Estado, Titular do Poder Executivo e Comandante-em-Chefe das Forças Armadas.',
                'Assembleia Nacional: Órgão legislativo e de representação parlamentar do povo.',
                'Tribunais: Órgão jurisdicional soberano encarregado de administrar a justiça em nome do povo.',
                'Garantia constitucional de independência do poder judicial.'
              ],
              examAlert: 'Perguntado em concurso: O Presidente da República é também o Comandante-em-Chefe das Forças Armadas e dos Corpos Militares/Policiais.',
              questions: [
                {
                  id: 'q-cg-3',
                  question: 'Qual dos seguintes órgãos exerce a função legislativa suprema em Angola?',
                  options: [
                    'O Tribunal Supremo.',
                    'A Assembleia Nacional.',
                    'O Ministério do Interior.',
                    'O Conselho de Segurança Nacional.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A Assembleia Nacional é o parlamento da República de Angola e detém o poder legislativo principal do Estado.',
                  examContext: 'Organização do Estado Angolano'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cg-3',
                  front: 'Quais são os Órgãos de Soberania de Angola?',
                  back: '1. Presidente da República\n2. Assembleia Nacional\n3. Tribunais',
                  articleRef: 'Cultura Geral - Tópico 3'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
