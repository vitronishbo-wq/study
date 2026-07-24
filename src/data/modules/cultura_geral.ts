import { DiplomaModule } from '../../types/minint';

export const culturaGeralModule: DiplomaModule = {
  id: 'cultura_geral',
  title: 'Cultura Geral e Instituições Públicas',
  shortTitle: 'Cultura Geral',
  iconName: 'Globe',
  hierarchyLabel: 'Hierarquia VI: Conhecimentos Gerais e Divisão Administrativa de Angola',
  hierarchyLevel: 6,
  description: 'História de Angola, Nova Divisão Político-Administrativa (Lei n.º 14/24 - 21 Províncias), Geografia, Organização do Estado, Símbolos Nacionais, Cultura e Ética do Serviço Público (Resolução n.º 27/94).',
  chapters: [
    {
      id: 'cg-cap-1',
      title: 'Capítulo I - História de Angola e Luta de Libertação Nacional',
      sections: [
        {
          id: 'cg-sec-1-1',
          title: 'Secção I - Reinos Pré-Coloniais, Resistência e Colonização',
          articles: [
            {
              id: 'cg-art-hist-1',
              code: 'Tópico 1.1',
              title: 'Reinos Antigos e Povoamento Banto',
              legalText: `• Reinos Pré-Coloniais de Angola: Reino do Congo, Reino do Ndongo (origem do nome "Angola"), Reino da Matamba, Reino do Viye, Reino do Bailundo e Reino do Humbe.
• Povoamento Banto: Início das migrações Bantas no século VI d.C., introduzindo a agricultura de subsistência, a metalurgia do ferro e a organização em linhagens e clãs.
• Título "Ngola": Designação honorífica dos soberanos do Ndongo, da qual derivou a denominação oficial do país (Angola).`,
              definition: 'Estruturação socio-política e cultural dos povos do território angolano anterior à penetração colonial europeia.',
              simpleExplanation: 'Antes da chegada dos portugueses, o território angolano era habitado por reinos altamente organizados e prósperos. A palavra "Angola" deriva diretamente de "Ngola", o título dos reis do Ndongo.',
              importantPoints: [
                'Expansão Banta: Introdução da técnica do ferro e agricultura no século VI d.C.',
                'Reino do Ndongo: Origem etimológica do nome "Angola" (do título Ngola a Kiluanje).',
                'Reino do Congo: Um dos mais vastos e organizados estados da África Central.',
                'Reinos do Planalto Central: Viye, Bailundo e Huambo.'
              ],
              examAlert: 'Ponto Chave de Concurso: O nome "Angola" deriva de "Ngola", título soberano do Reino do Ndongo.',
              questions: [],
              flashcards: []
            },
            {
              id: 'cg-art-hist-2',
              code: 'Tópico 1.2',
              title: 'Resistência Anticolonial, Rainha Nzinga Mbande e Fundação de Luanda (1575)',
              legalText: `• 25 de Janeiro de 1575: Fundação da cidade de São Paulo de Luanda por Paulo Dias de Novais, dando início formal à ocupação colonial portuguesa.
• Rainha Nzinga Mbande (Ana de Sousa): Soberana dos Reinos do Ndongo e da Matamba (século XVII). Destaque mundial na resistência anticolonial, diplomacia estratégica e aliança militar com os holandeses contra os portugueses.
• Outros Heróis da Resistência: Rei Mandume ya Ndemufayo (Cunene), Rei Ekuikui II (Bailundo), Mutu-ya-Kevela e Mwene Mbandu.`,
              definition: 'Início da ocupação colonial e ciclo secular de resistência armada e diplomática dos soberanos locais pela integridade do território.',
              simpleExplanation: 'Luanda foi fundada em 1575. Durante o século XVII, a Rainha Nzinga Mbande liderou uma heroica resistência militar e diplomática contra a ocupação estrangeira, tornando-se o maior símbolo da coragem angolana.',
              importantPoints: [
                '25 de Janeiro de 1575: Fundação de Luanda por Paulo Dias de Novais.',
                'Rainha Nzinga Mbande: Símbolo imortal da resistência nacional e liderança militar.',
                'Rei Mandume ya Ndemufayo: Lançou a célebre frase da resistência no Cunene até à sua morte em 1917.',
                'Rei Ekuikui II: Soberano do Bailundo e estratego da resistência no Planalto Central.'
              ],
              examAlert: 'Cobrado com frequência: Fundação de Luanda em 1575 por Paulo Dias de Novais e Rainha Nzinga Mbande como heroína do Ndongo e Matamba.',
              questions: [],
              flashcards: []
            }
          ]
        },
        {
          id: 'cg-sec-1-2',
          title: 'Secção II - Luta Armada, Independência Nacional (1975) e Conquista da Paz (2002)',
          articles: [
            {
              id: 'cg-art-hist-3',
              code: 'Tópico 1.3',
              title: 'Início da Luta Armada de Libertação Nacional (1961)',
              legalText: `• 4 de Fevereiro de 1961: Início da Luta Armada de Libertação Nacional com os assaltos às cadeias coloniais em Luanda (Casa de Reclusão e Cadeia de São Paulo).
• 15 de Março de 1961: Sublevações rurais no Norte de Angola (Uíge e Zaire).
• Movimentos Históricos de Libertação Nacional: MPLA (Movimento Popular de Libertação de Angola), FNLA (Frente Nacional de Libertação de Angola) e UNITA (União Nacional para a Independência Total de Angola).
• Acordos de Alvor (Janeiro de 1975): Tratado assinado em Portugal definindo o calendário da independência.`,
              definition: 'Processo revolucionário e de combate político-militar que culminou com a liquidação do regime colonial em Angola.',
              simpleExplanation: 'O 4 de Fevereiro de 1961 marca o início da luta de libertação. Após catorze anos de combate conduzido pelos movimentos nacionalistas, Portugal assinou os Acordos de Alvor estabelecendo a independência.',
              importantPoints: [
                '4 de Fevereiro de 1961: Dia do Início da Luta Armada de Libertação Nacional (Feriado Nacional).',
                '15 de Março de 1961: Expansão da revolta anticolonial no Norte.',
                'Três Movimentos Reconhecidos: MPLA, FNLA e UNITA.',
                'Acordos de Alvor: Assinados em Janeiro de 1975 em Portugal.'
              ],
              examAlert: 'Imperativo memorizar: 4 de Fevereiro de 1961 é o Dia do Início da Luta Armada de Libertação Nacional.',
              questions: [],
              flashcards: []
            },
            {
              id: 'cg-art-hist-4',
              code: 'Tópico 1.4',
              title: 'Proclamação da Independência (11 de Novembro de 1975) e Dia da Paz (4 de Abril de 2002)',
              legalText: `• 11 de Novembro de 1975: Proclamação solene da Independência Nacional pelo Dr. António Agostinho Neto, primeiro Presidente da República e Founder da Nação.
• 1991: Acordos de Bicesse (Abertura ao multipartidarismo e economia de mercado).
• 1994: Protocolo de Lusaka.
• 4 de Abril de 2002: Assinatura do Memorando de Entendimento Complementar ao Protocolo de Lusaka em Luena (Moxico).
• Assinala o Dia da Paz e da Reconciliação Nacional, pondo fim definitivo à guerra civil.`,
              definition: 'Os dois pilares históricos da República de Angola: o nascimento da soberania em 1975 e o alcance da concórdia e paz definitiva em 2002.',
              simpleExplanation: 'Angola alcançou a independência a 11 de Novembro de 1975 proclamada por Agostinho Neto. A 4 de Abril de 2002 alcançou a paz definitiva e a reconciliação entre todos os angolanos.',
              importantPoints: [
                '11 de Novembro de 1975: Proclamação da Independência por António Agostinho Neto.',
                '4 de Abril de 2002: Dia da Paz e Reconciliação Nacional (Assinatura dos Acordos de Luena).',
                'Dr. António Agostinho Neto: Poeta, Médico e Primeiro Presidente da República de Angola.',
                'Eng.º José Eduardo dos Santos: Arquiteto da Paz e segundo Presidente da República.'
              ],
              examAlert: 'Atenção para exames: 11 de Novembro = Independência Nacional; 4 de Abril = Dia da Paz e Reconciliação Nacional.',
              questions: [],
              flashcards: []
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-2',
      title: 'Capítulo II - Nova Divisão Político-Administrativa (DPA - Lei n.º 14/24) e Geografia',
      sections: [
        {
          id: 'cg-sec-2-1',
          title: 'Secção I - Organização Territorial e Estrutura das 21 Províncias',
          articles: [
            {
              id: 'cg-art-geo-1',
              code: 'Tópico 2.1',
              title: 'A Nova Divisão Político-Administrativa de Angola (Lei n.º 14/24, de 5 de Setembro)',
              legalText: `• Lei n.º 14/24, de 5 de Setembro (Lei da Divisão Político-Administrativa - DPA): Estabelece a reorganização territorial da República de Angola.
• Estrutura Oficial de Angola: 21 Províncias, 326 Municípios e 378 Comunas.
• Objetivos da Nova DPA: Promover o desenvolvimento harmonioso do país, aproximar os serviços públicos dos cidadãos, diminuir as assimetrias regionais e reforçar a governação local.
• Legislação Complementar: Decreto Presidencial n.º 268/24 (Plano de Acção), Decreto Presidencial n.º 270/24 (Classificação de Municípios) e Lei n.º 8/25 (Codificação das Unidades Territoriais).`,
              definition: 'Reestruturação político-administrativa do território angolano que elevou de 18 para 21 o número oficial de províncias.',
              simpleExplanation: 'Com a Lei n.º 14/24, Angola passou a ter oficialmente 21 Províncias. A reforma visa dinamizar o desenvolvimento local e aproximar as administrações das populações.',
              importantPoints: [
                'Número Oficial de Províncias: 21 Províncias (Lei n.º 14/24).',
                'Organização completa: 21 Províncias, 326 Municípios, 378 Comunas.',
                'Icolo e Bengo (Nova Província): Capital Catete (desmembrada de Luanda).',
                'Moxico Leste (Nova Província): Capital Cazombo (desmembrada do Moxico).',
                'Quando (Nova Província): Capital Mavinga (desmembrada do antigo Cuando Cubango).',
                'Cubango: Capital Menongue.'
              ],
              examAlert: 'CRÍTICO PARA PROVAS DO MININT: Responder com convicção que Angola tem 21 Províncias nos termos da Lei n.º 14/24, de 5 de Setembro.',
              questions: [],
              flashcards: []
            },
            {
              id: 'cg-art-geo-2',
              code: 'Tópico 2.2',
              title: 'Lista Completa das 21 Províncias e Sede das Capitais Provinciais',
              legalText: `1. Cabinda — Capital: Cabinda
2. Zaire — Capital: Mbanza Congo
3. Uíge — Capital: Uíge
4. Bengo — Capital: Dande (Caxito)
5. Luanda — Capital: Ingombota
6. Cuanza-Norte — Capital: Cazengo (N'dalatando)
7. Cuanza-Sul — Capital: Sumbe
8. Malanje — Capital: Malanje
9. Lunda-Norte — Capital: Dundo
10. Lunda-Sul — Capital: Saurimo
11. Benguela — Capital: Benguela
12. Huambo — Capital: Huambo
13. Bié — Capital: Cuito
14. Moxico — Capital: Luena
15. Huíla — Capital: Lubango
16. Namibe — Capital: Moçâmedes
17. Cunene — Capital: Cuanhama (Ondjiva)
18. Cubango — Capital: Menongue
19. Icolo e Bengo (Nova) — Capital: Catete
20. Moxico Leste (Nova) — Capital: Cazombo
21. Quando (Nova) — Capital: Mavinga`,
              definition: 'Mapeamento das 21 capitais provinciais que integram o poder desconcentrado do Estado angolano.',
              simpleExplanation: 'Saber a capital de cada uma das 21 províncias é um requisito básico em qualquer prova de Cultura Geral para o Ministério do Interior e Administração Pública.',
              importantPoints: [
                'Bengo: Sede no Município do Dande (Caxito).',
                'Cuanza-Norte: Sede no Município do Cazengo (N\'dalatando).',
                'Cunene: Sede no Município do Cuanhama (Ondjiva).',
                'Icolo e Bengo: Sede em Catete.',
                'Moxico Leste: Sede em Cazombo.',
                'Quando: Sede em Mavinga.'
              ],
              examAlert: 'Atenção às sedes municipais das capitais: Bengo (Dande), Cuanza-Norte (Cazengo), Cunene (Cuanhama), Icolo e Bengo (Catete), Moxico Leste (Cazombo) e Quando (Mavinga).',
              questions: [],
              flashcards: []
            }
          ]
        },
        {
          id: 'cg-sec-2-2',
          title: 'Secção II - Geografia Física, Relevo, Fronteiras e Recursos Hídricos',
          articles: [
            {
              id: 'cg-art-geo-3',
              code: 'Tópico 2.3',
              title: 'Superfície, Fronteiras e Pontos Extremos de Angola',
              legalText: `• Área Total da República de Angola: 1.246.700 km².
• Posição Geográfica: Costa ocidental da África Austral.
• Fronteiras Terrestres (4.837 km):
  - Norte e Nordeste: República Democrática do Congo (RDC).
  - Norte (Cabinda): República do Congo (Brazzaville).
  - Leste: República da Zâmbia.
  - Sul: República da Namíbia.
• Fronteira Marítima: Oceano Atlântico (1.650 km de costa litoral).`,
              definition: 'Enquadramento geográfico e territorial do espaço soberano da República de Angola no continente africano.',
              simpleExplanation: 'Angola possui 1.246.700 km² de extensão territorial, com uma vasta costa no Oceano Atlântico e fronteiras com quatro países vizinhos.',
              importantPoints: [
                'Superfície total: 1.246.700 km².',
                'Litoral Atlântico: 1.650 km de costa marítima.',
                'Quatro países confinantes: RDC, República do Congo, Zâmbia e Namíbia.',
                'Província de Cabinda: Enclave separado territorialmente pelo rio Zaire.'
              ],
              examAlert: 'Questão constante de concurso: A área territorial de Angola é de 1.246.700 km².',
              questions: [],
              flashcards: []
            },
            {
              id: 'cg-art-geo-4',
              code: 'Tópico 2.4',
              title: 'Relevo, Ponto Culminante (Morro do Moco) e Hidrografia (Rio Kwanza)',
              legalText: `• Relevo: Dominado por uma faixa litoral baixa, um subplanalto intermediário e o Vasto Planalto Central (Planalto das Benguelas/Huambo).
• Ponto Mais Alto de Angola: Morro do Moco (2.620 metros de altitude), situado na província do Huambo.
• Segundo Ponto Mais Alto: Serra da Chela / Morro do Mepo (Huíla/Namibe).
• Principal Rio 100% Nacional: Rio Kwanza (1.000 km). Nasce na serra do Mungo (Huambo) e desagua no Oceano Atlântico na Barra do Kwanza (Luanda).
• Outros Bacias Hídricas Importantes: Rio Cunene, Rio Cubango, Rio Zaire e Rio Zambeze.`,
              definition: 'Morfologia do solo e riqueza hídrica de Angola, fundamentais para a agricultura, energia hidroelétrica e ecossistemas.',
              simpleExplanation: 'O Morro do Moco no Huambo (2.620m) é o ponto mais alto de Angola. O Rio Kwanza é o maior rio inteiramente angolano, dando nome à moeda nacional.',
              importantPoints: [
                'Morro do Moco: 2.620 metros (Ponto culminante em Angola, no Huambo).',
                'Rio Kwanza: Nasce no Mungo (Huambo) e desagua na Barra do Kwanza (Luanda).',
                'Moeda Nacional (Kwanza): Batizada em homenagem ao Rio Kwanza.',
                'Aproveitamentos Hidroelétricos no Kwanza: Capanda, Laúca e Cambambe.'
              ],
              examAlert: 'Invariável em concursos: O ponto mais alto é o Morro do Moco (2.620 m no Huambo) e o maior rio nacional é o Rio Kwanza.',
              questions: [],
              flashcards: []
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
          title: 'Secção I - Estrutura Constitucional e Órgãos de Soberania',
          articles: [
            {
              id: 'cg-art-est-1',
              code: 'Tópico 3.1',
              title: 'Os Três Órgãos de Soberania do Estado Angolano (Artigo 105.º da CRA)',
              legalText: `• Artigo 105.º da CRA: São Órgãos de Soberania da República de Angola:
  1. O Presidente da República;
  2. A Assembleia Nacional;
  3. Os Tribunais.
• Separação e Interdependência: Os órgãos de soberania devem respeito aos princípios de separação e interdependência de poderes estabelecidos na Constituição.
• Presidente da República (Artigo 108.º): Chefe de Estado, Titular do Poder Executivo e Comandante-em-Chefe das Forças Armadas Angolanas (e Corpos de Segurança/Polícia).
• Assembleia Nacional (Artigo 141.º): Órgão legislativo representativo de todos os angolanos (220 Deputados).
• Tribunais (Artigo 174.º): Órgãos de soberania com competência para administrar a justiça em nome do povo.`,
              definition: 'Estrutura máxima do poder político estatuída na Constituição da República de Angola de 2010.',
              simpleExplanation: 'O Estado angolano assenta em três órgãos de soberania: Presidente da República (Executivo), Assembleia Nacional (Legislativo) e Tribunais (Judiciário).',
              importantPoints: [
                'Três Órgãos de Soberania: Presidente da República, Assembleia Nacional e Tribunais.',
                'O Governo NÃO é um órgão de soberania autónomo na CRA de 2010 (o Executivo é unipessoal, chefiado pelo Presidente).',
                'Comandante-em-Chefe: Função desempenhada pelo Presidente da República sobre as FAA e Polícia Nacional.'
              ],
              examAlert: 'Pegadinha comum em provas: "O Governo" não consta da lista do Artigo 105.º como órgão de soberania isolado; a resposta correta é: Presidente da República, Assembleia Nacional e Tribunais.',
              questions: [],
              flashcards: []
            }
          ]
        },
        {
          id: 'cg-sec-3-2',
          title: 'Secção II - Símbolos Nacionais e Identidade do Estado',
          articles: [
            {
              id: 'cg-art-sym-1',
              code: 'Tópico 3.2',
              title: 'Símbolos Nacionais da República de Angola (Artigo 18.º da CRA)',
              legalText: `• Artigo 18.º da CRA: São Símbolos Nacionais da República de Angola:
  1. A Bandeira Nacional;
  2. A Insígnia Nacional;
  3. O Hino Nacional ("Angola Avante").
• Bandeira Nacional: Composta por duas faixas horizontais de igual dimensão (Vermelha na parte superior e Preta na parte inferior).
  - Cor Vermelha: Simboliza o sangue derramado pelos angolanos durante a opressão colonial, a luta de libertação nacional e a defesa da Pátria.
  - Cor Preta: Simboliza o Continente Africano.
  - Composição Central (Amarela): Roda dentada (trabalhadores e produção industrial), Catana (camponeses, agrícola e luta armada) e Estrela (solidariedade internacional e progresso).
  - Cor Amarela: Simboliza as riquezas do país.
• Hino Nacional: "Angola Avante", letra de Manuel Rui Alves Monteiro e música de Rui Alberto Vieira Dias Mingas.`,
              definition: 'Insignias e emblemas sagrados que encarnam a soberania, a história e a dignidade do Estado e do Povo Angolano.',
              simpleExplanation: 'A Bandeira, a Insígnia e o Hino "Angola Avante" são os três símbolos nacionais protegidos pela Constituição.',
              importantPoints: [
                'Três Símbolos Oficiais: Bandeira Nacional, Insígnia Nacional e Hino Nacional.',
                'Vermelho: Sangue derramado na libertação.',
                'Preto: Continente Africano.',
                'Amarelo: Riquezas do solo e subsolo.',
                'Roda Dentada: Trabalhadores e Indústria.',
                'Catana: Camponeses, agricultura e resistência armada.',
                'Estrela: Solidariedade internacional e progresso.',
                'Hino "Angola Avante": Composto em 1975 por Rui Mingas (música) e Manuel Rui Monteiro (letra).'
              ],
              examAlert: 'Cobrado rigorosamente em concursos: Saber o significado de cada cor e elemento da Bandeira e os autores do Hino Nacional.',
              questions: [],
              flashcards: []
            }
          ]
        }
      ]
    },
    {
      id: 'cg-cap-4',
      title: 'Capítulo IV - Economia, Cultura, Sociedade e Ética Pública',
      sections: [
        {
          id: 'cg-sec-4-1',
          title: 'Secção I - Diversidade Étnico-Linguística e Património Cultural',
          articles: [
            {
              id: 'cg-art-cult-1',
              code: 'Tópico 4.1',
              title: 'Línguas, Grupos Étnicos e Património Mundial da UNESCO em Angola',
              legalText: `• Língua Oficial (Artigo 19.º da CRA): A língua oficial da República de Angola é o Português.
• Línguas Nacionais: O Estado valoriza e promove o ensino e uso das línguas nacionais (Umbundu, Kimbundu, Kikongo, Chokwe, Nyaneka, Cuanhama, Fiote/Ibinda, Nganguela, etc.).
• Maiores Grupos Étnicos: Ovimbundu (Planalto Central/Sul), Kimbundu (Luanda/Cuanza/Malanje) e Bakongo (Norte).
• Património Mundial da UNESCO: A cidade de Mbanza Kongo (Centro Histórico da Capital do Antigo Reino do Congo) foi inscrita em 8 de Julho de 2017 como o primeiro sítio de Angola na lista do Património Mundial da Humanidade.
• Expressões Culturais Imateriais: O Semba (ritmo e dança tradicional) e a arte dos Desenhos na Areia (Sona) do povo Cokwe.`,
              definition: 'Mosaico de riqueza linguística, étnica e patrimonial que molda a identidade cultural da nação angolana.',
              simpleExplanation: 'Angola tem o Português como língua oficial e dezenas de línguas nacionais. Mbanza Kongo é o primeiro centro histórico angolano classificado pela UNESCO.',
              importantPoints: [
                'Língua Oficial: Português.',
                'Mbanza Kongo: Classificado pela UNESCO em 2017.',
                'Sona (Desenhos na Areia): Tradição geométrica e filosófica ancestral do povo Chokwe.',
                'Semba: Dança e género musical nacional.'
              ],
              examAlert: 'Muito frequente em exames: Mbanza Kongo é o Património Mundial da UNESCO em Angola (inscrito em 2017).',
              questions: [],
              flashcards: []
            }
          ]
        },
        {
          id: 'cg-sec-4-2',
          title: 'Secção II - Ética, Deontologia e Pauta Deontológica do Serviço Público',
          articles: [
            {
              id: 'cg-art-eth-1',
              code: 'Tópico 4.2',
              title: 'Pauta Deontológica do Serviço Público (Resolução n.º 27/94, de 26 de Agosto)',
              legalText: `• Resolução n.º 27/94, de 26 de Agosto: Aprova a Pauta Deontológica do Serviço Público na República de Angola.
• Princípios Fundamentais do Serviço Público:
  1. Princípio da Legalidade: Actuar em estrita conformidade com a Constituição e as leis.
  2. Princípio da Probidade Pública: Pautar a conduta pela honestidade, integridade e rejeição absoluta da corrupção ou suborno.
  3. Princípio da Imparcialidade e Isenção: Tratar todos os cidadãos de forma equitativa, sem favoritismos ou discriminação.
  4. Princípio da Lealdade: Servir com empenho os órgãos do Estado e a prossecução do interesse público.
  5. Princípio da Urbanidade e Cortesia: Atender o público com respeito, eficiência e aprumo.
  6. Princípio do Sigilo Profissional: Guardar reserva sobre factos e informações confidenciais do serviço.`,
              definition: 'Conjunto de deveres éticos, morais e comportamentais obrigatórios para todos os funcionários públicos e agentes do Ministério do Interior.',
              simpleExplanation: 'A Pauta Deontológica (Resolução n.º 27/94) obriga todo o agente público a atuar de forma honesta, cortês, imparcial e leal ao Estado, combatendo a corrupção.',
              importantPoints: [
                'Diploma Legal: Resolução n.º 27/94, de 26 de Agosto.',
                'Valores Cardinais: Probidade, legalidade, imparcialidade, cortesia e sigilo profissional.',
                'Combate à Corrupção: Dever ético de recusar qualquer oferta ou benefício indevido.',
                'Aplicação ao MININT: Imperativo categórico para a Polícia Nacional e órgãos do MININT.'
              ],
              examAlert: 'PONTO OBRIGATÓRIO EM CONCURSOS DO MININT: Conhecer a Resolução n.º 27/94 (Pauta Deontológica do Serviço Público) e os seus princípios éticos.',
              questions: [],
              flashcards: []
            }
          ]
        }
      ]
    }
  ]
};
