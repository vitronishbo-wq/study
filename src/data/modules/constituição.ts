import { DiplomaModule } from '../../types/minint';

export const constituicaoModule: DiplomaModule = {
  id: 'constituição',
  title: 'Constituição da República de Angola (CRA 2010 / Revisão 2021)',
  shortTitle: 'Constituição (CRA)',
  iconName: 'BookMarked',
  hierarchyLabel: 'Hierarquia I: Norma Suprema do Estado (Prioridade Máxima em Concursos)',
  hierarchyLevel: 1,
  description: 'Texto constitucional vigente da República de Angola (Lei n.º 23/10, de 5 de Fevereiro, com as alterações introduzidas pela Lei de Revisão Constitucional n.º 18/21, de 16 de Setembro). Norma Fundamental que estrutura o Estado, consagra os Direitos Fundamentais, rege os Órgãos de Soberania, o Poder Judicial, a Administração Pública e o Sistema de Segurança Nacional (PNA, SIC, SME, SP, SPCB e FAA).',
  chapters: [
    {
      id: 'cra-cap-1',
      title: 'Título I – Princípios Fundamentais (Artigos 1.º a 21.º)',
      sections: [
        {
          id: 'cra-sec-1-1',
          title: 'Secção I – A República, Soberania e Estado Democrático de Direito',
          articles: [
            {
              id: 'cra-art-1',
              code: 'Artigo 1.º',
              title: 'República de Angola',
              legalText: 'Angola é uma República soberana e independente, baseada na dignidade da pessoa humana e na vontade do povo angolano, que tem como objectivo fundamental a construção de uma sociedade livre, justa, democrática, solidária, de paz, igualdade e progresso social.',
              definition: 'Norma fundacional da República de Angola, estabelecendo a dignidade humana e a soberania popular como pilares do Estado.',
              simpleExplanation: 'Angola é um país independente onde o poder emana do povo e a dignidade de cada pessoa é a razão de existir do Estado e das suas leis.',
              importantPoints: [
                'República soberana e independente.',
                'Fundada na dignidade da pessoa humana e na vontade do povo angolano.',
                'Objetivos: sociedade livre, justa, democrática, solidária, de paz e igualdade.'
              ],
              examAlert: 'Frequente em exames do MININT: Memorize os dois fundamentos principais no Artigo 1.º: Dignidade da pessoa humana + Vontade do povo angolano.',
              keywords: ['república', 'soberania', 'dignidade humana', 'vontade do povo', 'fundamentos'],
              relatedArticleIds: ['cra-art-2', 'cra-art-3', 'cra-art-6'],
              questions: [
                {
                  id: 'q-cra-1',
                  question: 'Nos termos do Artigo 1.º da Constituição da República de Angola, em que assentam os fundamentos do Estado angolano?',
                  options: [
                    'Na autoridade exclusiva das Forças Armadas e na ordem militar.',
                    'Na dignidade da pessoa humana e na vontade do povo angolano.',
                    'Nas directivas do poder executivo e no comércio livre.',
                    'Exclusivamente nas normas de Direito Internacional.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 1.º da CRA estabelece expressamente que Angola é uma República baseada na dignidade da pessoa humana e na vontade do povo angolano.',
                  examContext: 'Concurso MININT - Princípios Constitucionais'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-1',
                  front: 'Quais são os dois fundamentos do Estado angolano previstos no Artigo 1.º da CRA?',
                  back: '1. A dignidade da pessoa humana.\n2. A vontade do povo angolano.',
                  articleRef: 'Artigo 1.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-2',
              code: 'Artigo 2.º',
              title: 'Estado Democrático de Direito',
              legalText: `1. A República de Angola é um Estado Democrático de Direito que tem como fundamentos a soberania popular, o primado da Constituição e da lei, a separação de poderes e interdependência de funções, a unidade nacional, o pluralismo de expressão e de organização política e a democracia representativa e participativa.
2. A República de Angola promove e defende os direitos e liberdades fundamentais do Homem, quer como indivíduo quer como membro de grupos sociais organizados, e assegura o respeito e a garantia da sua efectivação pelos poderes legislativo, executivo e judicial, seus órgãos e instituições, bem como por todas as pessoas singulares e colectivas.`,
              definition: 'Consagração do princípio da legalidade, da supremacia constitucional e da separação de poderes.',
              simpleExplanation: 'Todos estão sujeitos à lei (inclusivamente a Polícia e o Governo). Ninguém pode concentrar todo o poder e os direitos humanos são protegidos por todos os órgãos.',
              importantPoints: [
                'Primado (supremacia) da Constituição e da lei.',
                'Separação de poderes e interdependência de funções.',
                'Pluralismo político, democracia representativa e participativa.',
                'Dever de todos os poderes (Legislativo, Executivo e Judicial) de assegurar os Direitos Fundamentais.'
              ],
              examAlert: 'Ponto crítico: A CRA consagra a SEPARAÇÃO de poderes aliada à INTERDEPENDÊNCIA de funções (Art. 2.º, n.º 1).',
              keywords: ['estado de direito', 'democracia', 'separação de poderes', 'interdependência', 'legalidade'],
              relatedArticleIds: ['cra-art-1', 'cra-art-6', 'cra-art-105'],
              questions: [
                {
                  id: 'q-cra-2',
                  question: 'Qual das opções consagra os fundamentos do Estado Democrático de Direito segundo o Artigo 2.º da CRA?',
                  options: [
                    'Concentração absoluta do poder no Chefe de Estado.',
                    'Soberania popular, primado da Constituição, separação de poderes e pluralismo político.',
                    'Predomínio das leis ordinárias sobre o texto constitucional.',
                    'Supressão dos direitos individuais em prol da ordem militar.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 2.º estabelece a soberania popular, o primado da Constituição, a separação de poderes, o pluralismo de expressão e a democracia representativa.',
                  examContext: 'Direito Constitucional Angolano'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-2',
                  front: 'Quais os pilares fundamentais do Estado Democrático de Direito (Art. 2.º)?',
                  back: 'Soberania popular, primado da Constituição/lei, separação e interdependência de poderes, unidade nacional, pluralismo político e democracia.',
                  articleRef: 'Artigo 2.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-3',
              code: 'Artigo 3.º',
              title: 'Soberania',
              legalText: `1. A soberania, una e indivisível, pertence ao povo, que a exerce através do sufrágio universal, livre, igual, directo, secreto e periódico, do referendo e das demais formas estabelecidas pela Constituição, nomeadamente para a escolha dos seus representantes.
2. O Estado exerce a sua soberania sobre a totalidade do território angolano, compreendendo este o espaço terrestre, águas interiores, mar territorial, espaço aéreo, solo e subsolo, fundo marinho e leitos correspondentes.
3. O Estado exerce jurisdição e direitos de soberania na zona contígua, zona económica exclusiva e plataforma continental.`,
              definition: 'Titularidade popular do poder político e extensão territorial da soberania nacional.',
              simpleExplanation: 'A soberania pertence ao povo angolano. O povo vota secretamente em eleições periódicas para escolher os seus líderes e a soberania cobre terra, mar, ar e subsolo de Angola.',
              importantPoints: [
                'Soberania pertence ao POVO (una e indivisível).',
                'Exercida via sufrágio universal, livre, igual, directo, secreto e periódico.',
                'Compreende território terrestre, mar territorial, espaço aéreo, solo e subsolo.'
              ],
              examAlert: 'Cai sempre: A soberania pertence ao POVO e não a um determinado órgão ou grupo político.',
              keywords: ['soberania', 'povo', 'sufrágio universal', 'eleições', 'território national'],
              relatedArticleIds: ['cra-art-1', 'cra-art-4'],
              questions: [
                {
                  id: 'q-cra-3',
                  question: 'A quem pertence a soberania da República de Angola e como é exercida segundo o Artigo 3.º?',
                  options: [
                    'Pertence ao Governo e é exercida por decretos legislativos.',
                    'Pertence ao Povo, que a exerce através do sufrágio universal, secreto e periódico, referendo e outras formas constitucionais.',
                    'Pertence às Forças Armadas e de Segurança.',
                    'Pertence aos Tribunais e é exercida por acórdão.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 3.º consagra que a soberania, una e indivisível, pertence ao povo e é exercida mediante voto direto, secreto e periódico.',
                  examContext: 'Soberania Popular e Eleições'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-3',
                  front: 'A quem pertence a soberania segundo o Artigo 3.º da CRA?',
                  back: 'Ao povo (una e indivisível), exercida por sufrágio universal, livre, igual, directo, secreto e periódico.',
                  articleRef: 'Artigo 3.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-4',
              code: 'Artigo 4.º',
              title: 'Exercício do Poder Político',
              legalText: `1. O poder político é exercido por quem obtenha legitimidade democrática através de eleições livres, iguais, directas, secretas e periódicas, nos termos da Constituição e da lei.
2. É ilegítimo e punível nos termos da lei o apossamento ou o exercício do poder político com recurso à força ou a outros meios não previstos nem conformes com a Constituição.`,
              definition: 'Princípio da legitimidade democrática e criminalização do golpe de Estado ou tomada ilegítima do poder.',
              simpleExplanation: 'O poder só é legítimo quando conquistado através de eleições limpas. Qualquer tentativa de tomar o poder pela força ou por vias ilegais é crime grave.',
              importantPoints: [
                'Legitimidade democrática exige eleições livres e periódicas.',
                'Tomada do poder pela força é expressamente ilegítima e punível por lei criminal.',
                'Proteção da estabilidade constitucional e das instituições democráticas.'
              ],
              keywords: ['poder político', 'legitimidade', 'eleições', 'golpe de estado', 'crime'],
              relatedArticleIds: ['cra-art-3', 'cra-art-202']
            },
            {
              id: 'cra-art-6',
              code: 'Artigo 6.º',
              title: 'Supremacia da Constituição e Legalidade',
              legalText: `1. A Constituição é a lei suprema da República de Angola.
2. O Estado subordina-se à Constituição e funda-se na legalidade, devendo respeitar e fazer respeitar as leis.
3. As leis, os tratados e os demais actos do Estado, dos órgãos do poder local e dos entes públicos em geral só são válidos se forem conformes à Constituição.`,
              definition: 'Princípio do Vértice Piramidal e da invalidade de normas inconstitucionais.',
              simpleExplanation: 'A Constituição é a Lei Maior. Nenhum regulamento da Polícia, Decreto Ministerial ou Lei da Assembleia tem valor se violar a Constituição.',
              importantPoints: [
                'Constituição = Lei Suprema da República de Angola.',
                'Princípio da Legalidade: o próprio Estado é subordinado à Lei das Leis.',
                'Invalidade automática de qualquer ato, tratado ou regulamento que contrarie a CRA.'
              ],
              examAlert: 'Super importante: Qualquer regulamento das forças de segurança que fira a Constituição é materialmente inconstitucional e nulo.',
              keywords: ['supremacia', 'lei suprema', 'legalidade', 'inconstitucionalidade', 'hierarquia'],
              relatedArticleIds: ['cra-art-2', 'cra-art-226'],
              questions: [
                {
                  id: 'q-cra-6',
                  question: 'De acordo com o Artigo 6.º da CRA, qual a consequência jurídica para leis ou atos do Estado que contrariem a Constituição?',
                  options: [
                    'Mantêm-se válidos se aprovados por despacho ministerial.',
                    'Só são válidos se forem conformes à Constituição; caso contrário são inconstitucionais e inválidos.',
                    'Passam a ter força de decreto executivo provisório.',
                    'Apenas são suspensos em tempo de paz.'
                  ],
                  correctAnswer: 1,
                  explanation: 'A Constituição é a Lei Suprema (Art. 6.º, n.º 1) e todos os atos estatais só são válidos se forem conformes a ela (n.º 3).',
                  examContext: 'Hierarquia das Normas em Angola'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-6',
                  front: 'O que estabelece o Artigo 6.º da CRA sobre a supremacia constitucional?',
                  back: 'A Constituição é a lei suprema. Todas as leis, tratados e atos do Estado só são válidos se forem conformes à Constituição.',
                  articleRef: 'Artigo 6.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-10',
              code: 'Artigo 10.º',
              title: 'Estado Laico',
              legalText: `1. A República de Angola é um Estado laico, havendo separação entre o Estado e as igrejas, nos termos da lei.
2. O Estado reconhece e respeita as diferentes confissões religiosas, as quais são livres na sua organização e no exercício das suas actividades, desde que as mesmas se conformem à Constituição e às leis da República de Angola.
3. O Estado protege as igrejas e as confissões religiosas, bem como os seus lugares e objectos de culto, desde que não atentem contra a Constituição e a ordem pública.`,
              definition: 'Neutralidade religiosa do Estado e garantia da liberdade de culto.',
              simpleExplanation: 'O Estado não tem religião oficial. Respeita e protege todas as confissões religiosas legais que não perturbem a ordem pública.',
              importantPoints: [
                'Separação absoluta entre o Estado e as Igrejas.',
                'Liberdade de organização e exercício de atividades religiosas.',
                'Proteção dos locais de culto respeitadores da ordem pública.'
              ],
              keywords: ['estado laico', 'religião', 'igrejas', 'liberdade de culto', 'ordem pública'],
              relatedArticleIds: ['cra-art-23', 'cra-art-236']
            },
            {
              id: 'cra-art-12',
              code: 'Artigo 12.º',
              title: 'Relações Internacionais e Direito Internacional',
              legalText: `1. A República de Angola respeita e aplica os princípios da Carta da Organização das Nações Unidas e da Carta da União Africana.
2. Os tratados e acordos internacionais validamente aprovados e ratificados vigoram na ordem jurídica angolana após a sua publicação oficial e entrada em vigor na ordem internacional.`,
              definition: 'Recepção do Direito Internacional na ordem jurídica interna angolana.',
              simpleExplanation: 'Tratados e Convenções Internacionais (como a Carta das Nações Unidas ou Convenções de Direitos Humanos) ratificados por Angola passam a valer como lei no país.',
              importantPoints: [
                'Respeito pelas Cartas da ONU e União Africana.',
                'Vigor automático de tratados internacionais ratificados e publicados.',
                'Subordinação à Constituição.'
              ],
              keywords: ['direito internacional', 'tratados', 'onu', 'união africana', 'ratificação'],
              relatedArticleIds: ['cra-art-6', 'cra-art-26']
            },
            {
              id: 'cra-art-15',
              code: 'Artigo 15.º',
              title: 'Terra e Recursos Naturais',
              legalText: `1. A terra, que é propriedade originária do Estado, pode ser transmitida para pessoas singulares ou colectivas, tendo em vista o seu racional e efectivo aproveitamento, nos termos da Constituição e da lei.
2. Os recursos naturais, minerais e petrolíferos existentes no solo, subsolo, águas interiores, mar territorial, zona económica exclusiva e plataforma continental são propriedade do Estado.`,
              definition: 'Propriedade pública originária da terra e dos recursos minerais e energéticos de Angola.',
              simpleExplanation: 'A terra e todas as riquezas do subsolo (como petróleo, diamantes e minerais) pertencem originalmente ao Estado Angolano.',
              importantPoints: [
                'Propriedade originária da terra pertence ao Estado.',
                'Possibilidade de transmissão de direitos fundiários a particulares nos termos da lei.',
                'Monopólio estatal sobre petróleos, minerais e recursos do mar territorial.'
              ],
              keywords: ['terra', 'recursos naturais', 'propriedade originária', 'petróleo', 'subsolo'],
              relatedArticleIds: ['cra-art-3', 'cra-art-89']
            }
          ]
        },
        {
          id: 'cra-sec-1-2',
          title: 'Secção II – Símbolos Nacionais, Língua Oficial e Capital',
          articles: [
            {
              id: 'cra-art-18',
              code: 'Artigo 18.º',
              title: 'Símbolos Nacionais',
              legalText: 'São símbolos nacionais da República de Angola a Bandeira Nacional, a Insígnia Nacional e o Hino Nacional ("Angola Avante"), adoptados a 11 de Novembro de 1975.',
              definition: 'Identidade e soberania simbólica do Estado Angolano.',
              simpleExplanation: 'Angola possui 3 símbolos sagrados da Pátria: a Bandeira, a Insígnia e o Hino "Angola Avante", criados na data da Independência (11 de Novembro de 1975).',
              importantPoints: [
                '3 Símbolos Nacionais: Bandeira, Insígnia e Hino Nacional.',
                'Data de adoção histórica: 11 de Novembro de 1975.',
                'Respeito obrigatório por todos os cidadãos e instituições.'
              ],
              examAlert: 'Frequente em exames do MININT e Cultura Geral: Os 3 símbolos nacionais foram adotados a 11 de Novembro de 1975.',
              keywords: ['símbolos nacionais', 'bandeira', 'insígnia', 'hino nacional', '11 de novembro'],
              relatedArticleIds: ['cra-art-19', 'cra-art-20'],
              questions: [
                {
                  id: 'q-cra-18',
                  question: 'Quais são os 3 símbolos nacionais sagrados consagrados no Artigo 18.º da Constituição?',
                  options: [
                    'A Bandeira Nacional, a Insígnia Nacional e o Hino Nacional ("Angola Avante").',
                    'A Moeda Kwanza, o Palácio Presidencial e a Cidade de Luanda.',
                    'A Língua Portuguesa, o Milho e o Café.',
                    'O Passaporte Nacional, a Polícia Nacional e o Exército.'
                  ],
                  correctAnswer: 0,
                  explanation: 'O Artigo 18.º estabelece a Bandeira Nacional, a Insígnia Nacional e o Hino Nacional como símbolos da soberania e unidade.',
                  examContext: 'Cultura Geral e Direito Constitucional'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-18',
                  front: 'Quais são os 3 Símbolos Nacionais da República de Angola (Art. 18.º)?',
                  back: '1. Bandeira Nacional\n2. Insígnia Nacional\n3. Hino Nacional ("Angola Avante")',
                  articleRef: 'Artigo 18.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-19',
              code: 'Artigo 19.º',
              title: 'Línguas Oficiais e Línguas Nacionais',
              legalText: `1. A língua oficial da República de Angola é o português.
2. O Estado valoriza e promove o estudo, o ensino e a utilização das demais línguas de Angola, bem como das principais línguas de comunicação internacional.`,
              definition: 'Regime linguístico constitucional e valorização do património linguístico angolano.',
              simpleExplanation: 'O Português é a língua oficial de Angola. O Estado tem o dever de proteger, ensinar e valorizar as línguas nacionais de origem africana (como Umbundu, Kimbundu, Kikongo, Cokwe, etc.).',
              importantPoints: [
                'Língua oficial: Português.',
                'Dever de valorizar e ensinar as línguas nacionais angolanas.',
                'Promoção de línguas internacionais.'
              ],
              examAlert: 'Atenção para exames: A língua oficial é o Português, mas as línguas nacionais de origem africana têm proteção constitucional ativa.',
              keywords: ['língua oficial', 'português', 'línguas nacionais', 'património cultural'],
              relatedArticleIds: ['cra-art-18', 'cra-art-20']
            },
            {
              id: 'cra-art-20',
              code: 'Artigo 20.º',
              title: 'Capital da República',
              legalText: 'A capital da República de Angola é Luanda.',
              definition: 'Fixação da sede dos órgãos de soberania e capitalidade do Estado.',
              simpleExplanation: 'A cidade de Luanda é a capital oficial e sede política da República de Angola.',
              importantPoints: [
                'Capital da República de Angola: Luanda.'
              ],
              keywords: ['capital', 'luanda', 'sede do estado'],
              relatedArticleIds: ['cra-art-18', 'cra-art-19']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-2',
      title: 'Título II – Direitos e Deveres Fundamentais (Artigos 22.º a 88.º)',
      sections: [
        {
          id: 'cra-sec-2-1',
          title: 'Secção I – Princípios Gerais e Direitos Individuais (Art. 22.º a 55.º)',
          articles: [
            {
              id: 'cra-art-22',
              code: 'Artigo 22.º',
              title: 'Âmbito dos Direitos Fundamentais',
              legalText: 'Todos os cidadãos gozam dos direitos, das liberdades e das garantias consagrados na Constituição e assumem os deveres estabelecidos na Constituição e na lei.',
              definition: 'Universalidade e vinculação dos direitos fundamentais na ordem jurídica.',
              simpleExplanation: 'Todos os angolanos têm o conjunto completo de direitos e deveres protegidos pela Constituição.',
              importantPoints: [
                'Princípio da universalidade dos direitos fundamentais.',
                'Inseparabilidade entre direitos e deveres cívicos.'
              ],
              keywords: ['direitos fundamentais', 'universalidade', 'deveres cívicos'],
              relatedArticleIds: ['cra-art-23', 'cra-art-26']
            },
            {
              id: 'cra-art-23',
              code: 'Artigo 23.º',
              title: 'Princípio da Igualdade',
              legalText: `1. Todos são iguais perante a Constituição e a lei.
2. Ninguém pode ser prejudicado, privilegiado, privado de qualquer direito ou isento de qualquer dever em razão da sua ascendência, sexo, raça, etnia, cor, deficiência, língua, local de nascimento, religião, convicções políticas, ideológicas ou filosóficas, grau de instrução, condição económica ou social ou profissão.`,
              definition: 'Proibição constitucional de todas as formas de discriminação e garantia de tratamento uniforme.',
              simpleExplanation: 'Todos os cidadãos têm os mesmos direitos e deveres perante a lei, sem favoritismos nem discriminação por raça, etnia, religião, partido ou dinheiro.',
              importantPoints: [
                'Igualdade formal e material perante a lei.',
                'Proibição de discriminação injusta.',
                'Tratamento igual por todas as forças policiais e de segurança.'
              ],
              keywords: ['igualdade', 'não discriminação', 'direitos humanos', 'constituição'],
              relatedArticleIds: ['cra-art-22', 'cra-art-30']
            },
            {
              id: 'cra-art-30',
              code: 'Artigo 30.º',
              title: 'Direito à Vida',
              legalText: 'O Estado respeita e protege a vida da pessoa humana, que é inviolável.',
              definition: 'Direito matriz de todos os direitos humanos e suporte da pessoa humana.',
              simpleExplanation: 'A vida é sagrada e inviolável. Em Angola a pena de morte é proibidíssima pela Constituição.',
              importantPoints: [
                'A vida humana é inviolável.',
                'Proibição constitucional da pena de morte (reforçada no Artigo 59.º).',
                'Dever do Estado e das Forças de Segurança de proteger a vida.'
              ],
              examAlert: 'QUESTÃO CERTA DE EXAME POLICIAL: Em Angola NÃO EXISTE pena de morte em tempo algum.',
              keywords: ['vida', 'inviolabilidade', 'pena de morte proibida', 'direitos humanos'],
              relatedArticleIds: ['cra-art-31', 'cra-art-59', 'cra-art-60'],
              questions: [
                {
                  id: 'q-cra-30',
                  question: 'Relativamente ao direito à vida e à pena de morte, o que estabelece a Constituição da República de Angola?',
                  options: [
                    'A pena de morte é permitida em crimes militares de traição à Pátria.',
                    'A vida da pessoa humana é inviolável e a pena de morte é expressamente proibida.',
                    'A pena de morte é aplicável apenas a crimes hediondos.',
                    'O Estado pode decretar pena de morte por lei extraordinária.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 30.º declara a vida inviolável e o Artigo 59.º estipula taxativamente: "É proibida a pena de morte".',
                  examContext: 'Direitos Fundamentais - Concurso MININT'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-30',
                  front: 'Qual é a posição da Constituição Angolana sobre a pena de morte?',
                  back: 'Proibição absoluta. A vida humana é inviolável (Art. 30.º) e a pena de morte é proibida (Art. 59.º).',
                  articleRef: 'Artigos 30.º e 59.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-32',
              code: 'Artigo 32.º',
              title: 'Right to Liberty and Personal Security',
              legalText: `1. Todos têm direito à liberdade e à segurança pessoais.
2. Ninguém pode ser privado da liberdade, total ou parcialmente, senão em consequência de sentença judicial condenatória pela prática de acto punível por lei com pena de prisão ou em virtude de aplicação de medida de segurança decretada por decisão judicial.
3. A excepção ao princípio consagrado no número anterior é a privação da liberdade pelo tempo estritamente necessário nos casos e condições previstos na lei (detenção em flagrante delito ou preventiva).`,
              definition: 'Garantia constitucional da liberdade física contra detenções arbitrárias.',
              simpleExplanation: 'Ninguém pode ser preso sem motivo legal e sem ordem judicial, exceto quando for apanhado em flagrante delito.',
              importantPoints: [
                'Garantia do direito à liberdade individual.',
                'Prisão exige regra geral sentença ou decisão judicial.',
                'Exceção: Detenção em flagrante delito pela polícia.'
              ],
              keywords: ['liberdade', 'segurança pessoal', 'prisão', 'flagrante delito', 'mandado'],
              relatedArticleIds: ['cra-art-33', 'cra-art-63', 'cra-art-64']
            },
            {
              id: 'cra-art-33',
              code: 'Artigo 33.º',
              title: 'Inviolabilidade do Domicílio',
              legalText: `1. O domicílio é inviolável.
2. Ninguém pode entrar ou fazer busca ou apreensão no domicílio de qualquer pessoa sem o seu consentimento, salvo nas situações previstas na Constituição e na lei, quando munido de mandado da autoridade competente, emitido nos casos e segundo as formas legalmente previstas, ou em caso de flagrante delito ou situação de emergência, para prestação de auxílio.`,
              definition: 'Proteção da casa do cidadão contra buscas arbitrárias da polícia.',
              simpleExplanation: 'A polícia não pode entrar na casa de ninguém sem mandado judicial, salvo em 2 exceções graves: flagrante delito ou emergência para prestar auxílio.',
              importantPoints: [
                'Regra geral: Inviolabilidade do domicílio.',
                'Requisito normal: Mandado judicial de autoridade competente.',
                'Exceções sem mandado: Flagrante delito OU situação de emergência para socorro.'
              ],
              examAlert: 'MUITO COBRADO EM PROVAS DA POLÍCIA/SIC: Exceções à necessidade de mandado judicial: Flagrante delito ou emergência/prestação de auxílio.',
              keywords: ['domicílio', 'inviolabilidade', 'busca e apreensão', 'mandado', 'flagrante delito'],
              relatedArticleIds: ['cra-art-32', 'cra-art-34', 'cra-art-63'],
              questions: [
                {
                  id: 'q-cra-33',
                  question: 'Em que circunstâncias podem os agentes policiais entrar no domicílio de um cidadão sem o seu consentimento e sem mandado judicial?',
                  options: [
                    'A qualquer hora do dia mediante simples ordem verbal do superior hierárquico.',
                    'Apenas em caso de flagrante delito ou em situação de emergência para prestação de auxílio.',
                    'Sempre que houver suspeita de qualquer transgressão administrativa.',
                    'Nunca é possível entrar sem mandado, em circunstância alguma.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 33.º, n.º 2 autoriza a entrada sem mandado em apenas duas situações: flagrante delito ou emergência para socorrer pessoas.',
                  examContext: 'Atuação da Polícia e do SIC'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-33',
                  front: 'Quais são as exceções constitucionais para entrada em domicílio sem mandado judicial (Art. 33.º)?',
                  back: '1. Flagrante delito.\n2. Situação de emergência para prestação de auxílio.',
                  articleRef: 'Artigo 33.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-40',
              code: 'Artigo 40.º',
              title: 'Liberdade de Expressão e de Informação',
              legalText: 'Todos têm o direito de exprimir, divulgar e compartilhar livremente os seus pensamentos, ideias e opiniões pela palavra, imagem ou por qualquer outro meio, bem como o direito de informar, de se informar e de ser informado, sem impedimentos nem discriminações.',
              definition: 'Liberdade de pensamento, imprensa e comunicação sem censura prévia.',
              simpleExplanation: 'Todos os angolanos são livres de dizer o que pensam, publicar ideias e aceder à informação verdadeira, respeitando os direitos e a honra das outras pessoas.',
              importantPoints: [
                'Proibição de censura prévia.',
                'Direito de exprimir opiniões por qualquer meio.',
                'Dever de respeitar a honra e imagem dos outros.'
              ],
              keywords: ['liberdade de expressão', 'informação', 'liberdade de imprensa', 'censura proibida'],
              relatedArticleIds: ['cra-art-47', 'cra-art-69']
            },
            {
              id: 'cra-art-47',
              code: 'Artigo 47.º',
              title: 'Liberdade de Reunião e de Manifestação',
              legalText: `1. A todos os cidadãos é garantida a liberdade de reunião e de manifestação pacífica e sem armas, sem necessidade de qualquer autorização e nos termos da lei.
2. As reuniões e manifestações em lugares públicos requerem prévia comunicação à autoridade competente, nos termos e para os efeitos estabelecidos na lei.`,
              definition: 'Direito de reunião pacífica e regras de comunicação prévia às autoridades policiais.',
              simpleExplanation: 'Os cidadãos podem manifestar-se pacificamente sem armas. Não precisam de pedir "permissão", mas devem avisar previamente a Polícia/Governo para organizar o trânsito e manter a segurança.',
              importantPoints: [
                'Manifestação deve ser PACÍFICA e SEM ARMAS.',
                'NÃO exige autorização (não é pedido de permissão).',
                'Exige PRÉVIA COMUNICAÇÃO à autoridade competente.'
              ],
              examAlert: 'Cai muito no MININT: Manifestação pacífica não precisa de "autorização", apenas de "prévia comunicação".',
              keywords: ['manifestação', 'reunião pacífica', 'sem armas', 'comunicação prévia', 'polícia'],
              relatedArticleIds: ['cra-art-40', 'cra-art-207']
            }
          ]
        },
        {
          id: 'cra-sec-2-2',
          title: 'Secção II – Garantias dos Direitos e Liberdades (Art. 56.º a 75.º)',
          articles: [
            {
              id: 'cra-art-59',
              code: 'Artigo 59.º',
              title: 'Proibição da Pena de Morte e de Penas Perpétuas',
              legalText: '1. É proibida a pena de morte.\n2. Não pode haver penas privativas ou restritivas da liberdade com carácter perpétuo nem de duração ilimitada.',
              definition: 'Proibição categórica da pena capital e de penas perpétuas no direito penal angolano.',
              simpleExplanation: 'Nenhum crime em Angola pode ser punido com morte ou prisão perpétua. As penas têm obrigatoriamente um limite de anos estipulado no Código Penal.',
              importantPoints: [
                'Proibição absoluta da pena de morte.',
                'Proibição de prisão perpétua.',
                'Finalidade de reabilitação e reinserção social do réu.'
              ],
              keywords: ['pena de morte', 'prisão perpétua', 'proibição', 'código penal'],
              relatedArticleIds: ['cra-art-30', 'cra-art-60']
            },
            {
              id: 'cra-art-60',
              code: 'Artigo 60.º',
              title: 'Proibição de Tortura e Tratamentos Degradantes',
              legalText: 'Ninguém pode ser submetido a tortura, a trabalhos forçados, nem a tratamentos ou penas cruéis, desumanas ou degradantes.',
              definition: 'Garantia absoluta de integridade física e psíquica dos cidadãos detidos.',
              simpleExplanation: 'A Polícia Nacional, o SIC e os Serviços Penitenciários são proibidos de agredir, torturar ou submeter detidos a maus-tratos. Confissões sob tortura são nulas.',
              importantPoints: [
                'Proibição absoluta de tortura e maus-tratos.',
                'Proibição de trabalhos forçados e tratamentos degradantes.',
                'Nulidade jurídica de confissões obtidas sob tortura.'
              ],
              keywords: ['tortura', 'trabalhos forçados', 'tratamento cruel', 'integridade física', 'nulidade'],
              relatedArticleIds: ['cra-art-30', 'cra-art-63']
            },
            {
              id: 'cra-art-63',
              code: 'Artigo 63.º',
              title: 'Direitos dos Detidos e Presos',
              legalText: `Toda a pessoa privada da liberdade deve ser informada, no momento da sua prisão ou detenção, das respectivas razões e dos seus direitos, nomeadamente:
a) Ser-lhe exibido o mandado de prisão ou detenção emitido por autoridade competente, salvo em flagrante delito;
b) Ser informada sobre o local para onde será conduzida;
c) Informar à família e ao advogado sobre a sua prisão ou detenção;
d) Escolher defensor que acompanhe as diligências policiais e judiciais;
e) Consultar advogado antes de prestar quaisquer declarações;
f) Ficar calada e não prestar declarações ou de o fazer apenas na presença de advogado;
g) Não fazer confissões ou declarações contra si própria;
h) Ser conduzida perante o magistrado competente para confirmação ou libertação nos prazos legais.`,
              definition: 'Estatuto constitucional dos direitos do arguido no ato da captura e interrogatório policial.',
              simpleExplanation: 'Ao prender alguém, o agente de segurança DEVE comunicar os motivos, mostrar o mandado (se houver), avisar a família, permitir advogado e respeitar o direito de o detido ficar calado.',
              importantPoints: [
                'Direito de saber o motivo da prisão e o local para onde é conduzido.',
                'Direito de avisar a família e consultar advogado antes de depor.',
                'Direito ao silêncio e de não produzir prova contra si mesmo (não auto-incriminação).'
              ],
              examAlert: 'MUITO IMPORTANTE PARA CONCURSOS MININT: O detido tem o direito constitucional de manter o silêncio e consultar advogado antes do interrogatório policial.',
              keywords: ['direitos dos detidos', 'mandado de prisão', 'advogado', 'direito ao silêncio', 'não auto-incriminação'],
              relatedArticleIds: ['cra-art-32', 'cra-art-64', 'cra-art-67'],
              questions: [
                {
                  id: 'q-cra-63',
                  question: 'Qual dos seguintes direitos NÃO pertence ao cidadão no momento da sua detenção pela polícia, nos termos do Artigo 63.º?',
                  options: [
                    'Direito de informar a família e o advogado sobre a sua detenção.',
                    'Direito de ficar calado e não prestar declarações contra si próprio.',
                    'Direito de ser conduzido perante magistrado competente nos prazos legais.',
                    'Direito de exigir pagamento imediato de indemnização antes do transporte.'
                  ],
                  correctAnswer: 3,
                  explanation: 'O Artigo 63.º elenca os direitos ao silêncio, à comunicação com a família/advogado e apresentação ao juiz. O pagamento imediato de indemnização não existe.',
                  examContext: 'Atuação Policial e Direitos Humanos'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-63',
                  front: 'Quais são 3 direitos essenciais de qualquer detido consignados no Artigo 63.º da CRA?',
                  back: '1. Informar a família e o advogado.\n2. Consultar advogado e permanecer em silêncio.\n3. Ser apresentado ao magistrado competente nos prazos legais.',
                  articleRef: 'Artigo 63.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-64',
              code: 'Artigo 64.º',
              title: 'Prisão Preventiva e Prazos',
              legalText: `1. A prisão preventiva tem carácter excepcional e não é decretada nem mantida sempre que puder ser aplicada caução ou outra medida de coacção mais favorável prevista na lei.
2. A lei fixa os prazos máximos de prisão preventiva, findos os quais o arguido deve ser libertado.`,
              definition: 'Excepcionalidade da medida extrema de prisão preventiva no processo penal.',
              simpleExplanation: 'A prisão preventiva é o último recurso. Sempre que possível, o juiz deve aplicar termo de identidade e residência ou caução.',
              importantPoints: [
                'Carácter excepcional da prisão preventiva.',
                'Substituição por medidas de coacção mais favoráveis.',
                'Libertação imediata caso expirarem os prazos máximos legais.'
              ],
              keywords: ['prisão preventiva', 'excepcionalidade', 'prazos legais', 'libertação', 'medidas de coacção'],
              relatedArticleIds: ['cra-art-63', 'cra-art-67', 'cra-art-68']
            },
            {
              id: 'cra-art-67',
              code: 'Artigo 67.º',
              title: 'Presunção de Inocência e Garantias de Defesa',
              legalText: `1. Ninguém pode ser detido, preso ou submetido a julgamento senão nos termos da lei, sendo garantido a todos os arguidos o direito de defesa, recurso e patrocínio judiciário.
2. Presume-se inocente todo o cidadão até ao trânsito em julgado da sentença de condenação.
3. O arguido tem direito a escolher defensor e a ser por ele assistido em todos os actos do processo.`,
              definition: 'Princípio fundamental de processo penal que impede a presunção antecipada de culpa.',
              simpleExplanation: 'Todo o suspeito é considerado inocente até que o tribunal emita uma condenação definitiva (trânsito em julgado). A polícia deve tratar o suspeito com respeito.',
              importantPoints: [
                'Presunção de inocência até ao trânsito em julgado.',
                'Obrigatoriedade de assistência por advogado nas fases legais decisivas.',
                'Direito de recorrer de sentenças condenatórias.'
              ],
              keywords: ['presunção de inocência', 'trânsito em julgado', 'direito de defesa', 'advogado'],
              relatedArticleIds: ['cra-art-63', 'cra-art-68']
            },
            {
              id: 'cra-art-68',
              code: 'Artigo 68.º',
              title: 'Habeas Corpus',
              legalText: 'Todos têm o direito à providência de habeas corpus contra o abuso de poder, em virtude de prisão ou detenção ilegal, a interpor perante o tribunal competente.',
              definition: 'Garantia constitucional urgente para a libertação de quem está preso ilegalmente.',
              simpleExplanation: 'O Habeas Corpus é uma providência judicial rápida para libertar qualquer pessoa que tenha sido presa sem justa causa ou por abuso de poder.',
              importantPoints: [
                'Remédio contra prisão ou detenção ILEGAL.',
                'Pode ser requerido pelo próprio preso ou por qualquer cidadão.',
                'Protege a liberdade de locomoção e ir e vir.'
              ],
              examAlert: 'COBRADO EM EXAMES: Habeas Corpus protege a LIBERDADE FÍSICA contra prisões ilegais.',
              keywords: ['habeas corpus', 'prisão ilegal', 'abuso de poder', 'liberdade física', 'tribunal'],
              relatedArticleIds: ['cra-art-63', 'cra-art-69'],
              questions: [
                {
                  id: 'q-cra-68',
                  question: 'Qual é a garantia constitucional destinada a libertar um cidadão em virtude de prisão ou detenção ilegal?',
                  options: [
                    'Habeas Data.',
                    'Habeas Corpus.',
                    'Ação Popular.',
                    'Recurso de Inconstitucionalidade.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Habeas Corpus (Art. 68.º) é o meio judicial próprio para combater a prisão ou detenção ilegal.',
                  examContext: 'Remédios Constitucionais'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-68',
                  front: 'Para que serve a providência de Habeas Corpus (Art. 68.º)?',
                  back: 'Para tutelar o direito à liberdade física contra a prisão ou detenção ilegal provocada por abuso de poder.',
                  articleRef: 'Artigo 68.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-69',
              code: 'Artigo 69.º',
              title: 'Habeas Data',
              legalText: 'Todos têm o direito de recorrer à providência de habeas data para assegurar o conhecimento de informações sobre si constantes de ficheiros, arquivos ou registos informáticos, exigir a sua rectificação ou actualização.',
              definition: 'Garantia constitucional de acesso e retificação de dados pessoais em ficheiros públicos.',
              simpleExplanation: 'Habeas Data serve para consultar, corrigir ou atualizar informações pessoais armazenadas em arquivos do Estado ou ficheiros informáticos.',
              importantPoints: [
                'Garante o conhecimento de dados pessoais em registos informáticos.',
                'Permite exigir correcção ou eliminação de informações falsas.',
                'Protege a intimidade e privacidade dos ficheiros policiais e estatais.'
              ],
              examAlert: 'Diferença vital: Habeas Corpus = Liberdade Física; Habeas Data = Dados Pessoais e Ficheiros.',
              keywords: ['habeas data', 'dados pessoais', 'registos informáticos', 'retificação', 'privacidade'],
              relatedArticleIds: ['cra-art-40', 'cra-art-68']
            }
          ]
        },
        {
          id: 'cra-sec-2-3',
          title: 'Secção III – Direitos Sociais, Económicos e Culturais (Art. 76.º a 88.º)',
          articles: [
            {
              id: 'cra-art-76',
              code: 'Artigo 76.º',
              title: 'Direito ao Trabalho',
              legalText: `1. O trabalho é um direito e um dever de todos.
2. Todo o trabalhador tem direito à formação profissional, justa remuneração, descanso, férias pagas e segurança no trabalho.`,
              definition: 'Consagração do valor social do trabalho e dos direitos fundamentais dos trabalhadores.',
              simpleExplanation: 'O trabalho dignifica o homem e garante sustentento. O Estado deve promover o emprego e garantir condições de trabalho justas e seguras.',
              importantPoints: [
                'Trabalho é direito e dever de todos.',
                'Direito a salário justo, descanso semanal e férias pagas.',
                'Proteção contra despedimento sem justa causa.'
              ],
              keywords: ['trabalho', 'remuneração justa', 'férias', 'formação profissional'],
              relatedArticleIds: ['cra-art-23', 'cra-art-199']
            },
            {
              id: 'cra-art-77',
              code: 'Artigo 77.º',
              title: 'Direito à Saúde e Protecção Social',
              legalText: 'O Estado promove e garante as condições necessárias para tornar efectivo o direito à protecção da saúde de todos os cidadãos, através do Serviço Nacional de Saúde (SNS).',
              definition: 'Dever do Estado na promoção da saúde pública e assistência social universal.',
              simpleExplanation: 'O Estado Angolano deve criar e manter hospitais públicos, centros de saúde e sistemas de segurança social para todos os cidadãos.',
              importantPoints: [
                'Garantia da saúde pública através do SNS.',
                'Proteção social na maternidade, velhice e invalidez.'
              ],
              keywords: ['saúde pública', 'sns', 'protecção social', 'segurança social'],
              relatedArticleIds: ['cra-art-30', 'cra-art-79']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-3',
      title: 'Título III – Organização Económica, Financeira e Fiscal (Artigos 89.º a 104.º)',
      sections: [
        {
          id: 'cra-sec-3-1',
          title: 'Secção I – Sistema Económico, Financeiro e Tributário',
          articles: [
            {
              id: 'cra-art-89',
              code: 'Artigo 89.º',
              title: 'Princípios Gerais do Sistema Económico',
              legalText: 'O sistema económico da República de Angola baseia-se na coexistência de diversos sectores de propriedade (pública, privada e cooperativa), na livre iniciativa económica e no respeito pela economia de mercado.',
              definition: 'Modelo económico misto da República de Angola.',
              simpleExplanation: 'Angola tem um sistema económico onde coexistem empresas públicas do Estado, empresas privadas e cooperativas em livre concorrência.',
              importantPoints: [
                'Coexistência de sectores de propriedade: Pública, Privada e Cooperativa.',
                'Garantia da livre iniciativa económica e livre concorrência.',
                'Função reguladora do Estado.'
              ],
              keywords: ['sistema económico', 'livre iniciativa', 'propriedade privada', 'estado'],
              relatedArticleIds: ['cra-art-15', 'cra-art-101']
            },
            {
              id: 'cra-art-101',
              code: 'Artigo 101.º',
              title: 'Sistema Fiscal e Impostos',
              legalText: 'O sistema fiscal visa a satisfação das necessidades financeiras do Estado e outras entidades públicas e uma justa repartição dos rendimentos e da riqueza, nos termos da lei.',
              definition: 'Fundamento constitucional do poder tributário do Estado e dever cívico de pagar impostos.',
              simpleExplanation: 'Os impostos cobrados pela AGT servem para financiar os serviços públicos do Estado (escolas, hospitais, polícia e estradas).',
              importantPoints: [
                'Princípio da legalidade tributária: impostos só criados por lei.',
                'Justa repartição do rendimento nacional.',
                'Gestão transparente pela Administração Geral Tributária (AGT).'
              ],
              keywords: ['sistema fiscal', 'impostos', 'agt', 'orçamento do estado'],
              relatedArticleIds: ['cra-art-89', 'cra-art-104']
            },
            {
              id: 'cra-art-104',
              code: 'Artigo 104.º',
              title: 'Orçamento Geral do Estado (OGE)',
              legalText: '1. O Orçamento Geral do Estado (OGE) é o instrumento de gestão financeira anual do Estado.\n2. O OGE é elaborado pelo Poder Executivo e aprovado por lei da Assembleia Nacional.',
              definition: 'Natureza e processo de aprovação do instrumento orçamental supremo da Nação.',
              simpleExplanation: 'O OGE é o plano anual de receitas e despesas do país. É preparado pelo Governo e tem de ser aprovado pela Assembleia Nacional.',
              importantPoints: [
                'Elaborado pelo Poder Executivo (Presidente/Governo).',
                'Aprovado por LEI da Assembleia Nacional.',
                'Fiscalizado pelo Tribunal de Contas.'
              ],
              keywords: ['oge', 'orçamento geral do estado', 'assembleia nacional', 'tribunal de contas'],
              relatedArticleIds: ['cra-art-101', 'cra-art-166']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-4',
      title: 'Título IV – Organização do Poder do Estado (Artigos 105.º a 197.º)',
      sections: [
        {
          id: 'cra-sec-4-1',
          title: 'Secção I – Órgãos de Soberania e Poder Executivo (Art. 105.º a 140.º)',
          articles: [
            {
              id: 'cra-art-105',
              code: 'Artigo 105.º',
              title: 'Órgãos de Soberania',
              legalText: `1. São órgãos de soberania o Presidente da República, a Assembleia Nacional e os Tribunais.
2. A formação, a composição, a competência e o funcionamento dos órgãos de soberania são os definidos na Constituição.
3. Os órgãos de soberania devem respeitar a separação e interdependência de funções estabelecidas na Constituição.`,
              definition: 'Mapeamento constitucional dos 3 órgãos supremos do Poder em Angola.',
              simpleExplanation: 'Existem exatamente 3 órgãos de soberania em Angola: 1. Presidente da República (Executivo), 2. Assembleia Nacional (Legislativo) e 3. Tribunais (Judicial).',
              importantPoints: [
                'EXACTAMENTE 3 ÓRGÃOS DE SOBERANIA: Presidente da República, Assembleia Nacional e Tribunais.',
                'O Governo/Conselho de Ministros NÃO é um órgão de soberania autónomo (está integrado na Chefia do PR).',
                'Devem respeitar a separação e interdependência de funções.'
              ],
              examAlert: 'PERGUNTA CLÁSSICA DE CONCURSO: QUAIS SÃO OS ÓRGAOS DE SOBERANIA EM ANGOLA? Resposta: Presidente da República, Assembleia Nacional e Tribunais.',
              keywords: ['órgãos de soberania', 'presidente da república', 'assembleia nacional', 'tribunais', 'separação de poderes'],
              relatedArticleIds: ['cra-art-2', 'cra-art-108', 'cra-art-141', 'cra-art-174'],
              questions: [
                {
                  id: 'q-cra-105',
                  question: 'Segundo o Artigo 105.º da CRA, quais são os Órgãos de Soberania da República de Angola?',
                  options: [
                    'O Presidente da República, o Governo e as Forças Armadas.',
                    'O Presidente da República, a Assembleia Nacional e os Tribunais.',
                    'A Assembleia Nacional, os Partidos Políticos e a Polícia Nacional.',
                    'O Conselho de Ministros, o Tribunal Constitucional e as Autarquias.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 105.º, n.º 1 indica taxativamente: O Presidente da República, a Assembleia Nacional e os Tribunais.',
                  examContext: 'Estrutura Politica do Estado'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-105',
                  front: 'Quais são os 3 órgãos de soberania consagrados na Constituição Angolana (Art. 105.º)?',
                  back: '1. Presidente da República\n2. Assembleia Nacional\n3. Tribunais',
                  articleRef: 'Artigo 105.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-108',
              code: 'Artigo 108.º',
              title: 'Chefia do Estado e Poder Executivo',
              legalText: `1. O Presidente da República é o Chefe de Estado, o titular do Poder Executivo e o Comandante-em-Chefe das Forças Armadas Angolanas.
2. O Presidente da República exerce o poder executivo, auxiliado por um Vice-Presidente, Ministros de Estado e Ministros.
3. O Presidente da República promove e assegura a unidade nacional, a independência e a integridade territorial do País.`,
              definition: 'A tripla qualidade do Presidente da República no sistema constitucional angolano.',
              simpleExplanation: 'O Presidente acumula 3 funções essenciais: Chefe de Estado, Titular do Governo (Poder Executivo) e Comandante-em-Chefe das Forças Armadas (FAA).',
              importantPoints: [
                'Triplo papel: Chefe de Estado, Titular do Poder Executivo e Comandante-em-Chefe das FAA.',
                'Auxiliado por Vice-Presidente, Ministros de Estado e Ministros.',
                'Mandato de 5 anos (máximo de 2 mandatos nos termos do Artigo 113.º).'
              ],
              keywords: ['presidente da república', 'chefe de estado', 'executivo', 'comandante em chefe', 'faa'],
              relatedArticleIds: ['cra-art-105', 'cra-art-122', 'cra-art-131']
            },
            {
              id: 'cra-art-122',
              code: 'Artigo 122.º',
              title: 'Competências do Comandante-em-Chefe e Nomeação de Comandantes do MININT/PNA',
              legalText: `Compete ao Presidente da República, como Comandante-em-Chefe das Forças Armadas Angolanas:
a) Exercer as funções de Comandante em Chefe;
b) Nomear e exonerar o Chefe do Estado-Maior General das FAA;
f) Nomear e exonerar o Comandante Geral da Polícia Nacional e os 2.ºs Comandantes da Polícia Nacional, ouvido o Conselho de Segurança Nacional;
h) Promover e graduar os oficiais comissários da Polícia Nacional;
i) Nomear e exonerar os titulares dos órgãos de inteligência e segurança de Estado.`,
              definition: 'Poder de comando e provimento dos cargos de cúpula da Polícia e Forças Armadas.',
              simpleExplanation: 'É o Presidente da República que nomeia e exonera o Comandante Geral da Polícia Nacional, os seus adjuntos e promove os Oficiais Comissários da PNA.',
              importantPoints: [
                'Nomeação e exoneração do Comandante Geral da PNA e 2.ºs Comandantes.',
                'Ouvir previamente o Conselho de Segurança Nacional.',
                'Promoção e graduação dos Oficiais Comissários da Polícia.'
              ],
              examAlert: 'Frequente em exames do MININT: Quem nomeia o Comandante Geral da PNA? Resposta: O Presidente da República e Comandante-em-Chefe.',
              keywords: ['comandante geral', 'pna', 'minint', 'nomeação', 'oficiais comissários', 'presidente'],
              relatedArticleIds: ['cra-art-108', 'cra-art-131', 'cra-art-207'],
              questions: [
                {
                  id: 'q-cra-122',
                  question: 'A quem compete a nomeação do Comandante Geral e dos Segundos Comandantes da Polícia Nacional?',
                  options: [
                    'Ao Ministro do Interior mediante Decreto Executivo.',
                    'Ao Presidente da República e Comandante-em-Chefe, ouvido o Conselho de Segurança Nacional.',
                    'À Assembleia Nacional por maioria de dois terços.',
                    'Ao Conselho Superior da Magistratura Judicial.'
                  ],
                  correctAnswer: 1,
                  explanation: 'Segundo o Artigo 122.º, alínea f), cabe ao Presidente da República como Comandante-em-Chefe nomear o Comandante Geral da PNA.',
                  examContext: 'Atribuições do Chefe de Estado'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-122',
                  front: 'Quem tem a competência constitucional de nomear o Comandante Geral da Polícia Nacional?',
                  back: 'O Presidente da República e Comandante-em-Chefe das FAA (Artigo 122.º, alínea f).',
                  articleRef: 'Artigo 122.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-131',
              code: 'Artigo 131.º',
              title: 'Conselho de Segurança Nacional',
              legalText: 'O Conselho de Segurança Nacional é o órgão de consulta do Presidente da República para os assuntos relativos à condução da política e da estratégia de segurança nacional, defesa do país e manutenção da ordem pública.',
              definition: 'Órgão de consulta suprema para a defesa e segurança nacional.',
              simpleExplanation: 'O Conselho de Segurança Nacional aconselha o Presidente em decisões estratégicas sobre defesa do país, policiamento, fronteiras e inteligência estatal.',
              importantPoints: [
                'Órgão consultivo presidencial para segurança nacional e ordem pública.',
                'Membros incluem o Vice-Presidente, Ministros de Defesa e Interior, Comandante Geral da PNA e Chefes do Exército e Inteligência.'
              ],
              keywords: ['conselho de segurança nacional', 'ordem pública', 'defesa', 'política de segurança'],
              relatedArticleIds: ['cra-art-122', 'cra-art-202']
            }
          ]
        },
        {
          id: 'cra-sec-4-2',
          title: 'Secção II – Poder Legislativo – Assembleia Nacional (Art. 141.º a 173.º)',
          articles: [
            {
              id: 'cra-art-141',
              code: 'Artigo 141.º',
              title: 'Assembleia Nacional',
              legalText: 'A Assembleia Nacional é o parlamento da República de Angola, sendo o órgão representativo de todos os angolanos e de expressão do poder legislativo.',
              definition: 'Parlamento unicameral da República de Angola.',
              simpleExplanation: 'A Assembleia Nacional é onde os Deputados eleitos pelo povo debatem e aprovam as leis de Angola.',
              importantPoints: [
                'Órgão legislativo representativo de todo o povo angolano.',
                'Composta por 220 Deputados.',
                'Aprova as Leis e o Orçamento Geral do Estado.'
              ],
              keywords: ['assembleia nacional', 'parlamento', 'deputados', 'leis', 'poder legislativo'],
              relatedArticleIds: ['cra-art-105', 'cra-art-166']
            },
            {
              id: 'cra-art-166',
              code: 'Artigo 166.º',
              title: 'Actos Legislativos – Leis e Resoluções',
              legalText: '1. Os actos legislativos da Assembleia Nacional tomam a forma de Leis Constitucionais, Leis Orgânicas, Leis Bases e Leis Ordinárias.\n2. Os demais actos tomam a forma de Resoluções.',
              definition: 'Tipologia dos actos normativos emanados do Parlamento angolano.',
              simpleExplanation: 'As decisões do Parlamento tomam a forma de Leis (para reger o país) ou Resoluções (para aprovar tratados e decisões internas).',
              importantPoints: [
                'Leis Orgânicas: ex. Leis do Sistema de Segurança, Eleitoral e Tribunais.',
                'Hierarquia: Lei Constitucional > Lei Orgânica > Lei Ordinária.'
              ],
              keywords: ['leis orgânicas', 'actos legislativos', 'resoluções', 'hierarquia das normas'],
              relatedArticleIds: ['cra-art-6', 'cra-art-141']
            }
          ]
        },
        {
          id: 'cra-sec-4-3',
          title: 'Secção III – Poder Judicial e Tribunais (Art. 174.º a 197.º)',
          articles: [
            {
              id: 'cra-art-174',
              code: 'Artigo 174.º',
              title: 'Função Jurisdicional e Independência dos Tribunais',
              legalText: `1. Os Tribunais são órgãos de soberania com competência para administrar a justiça em nome do povo.
2. No exercício da função jurisdicional, os tribunais são independentes e imparciais, estando apenas sujeitos à Constituição e à lei.`,
              definition: 'Independência e exclusividade do Poder Judicial.',
              simpleExplanation: 'Apenas os Tribunais e Juízes têm o poder de julgar e condenar criminosos. Nem o Presidente nem a Polícia podem interferir nas decisões dos juízes.',
              importantPoints: [
                'Independência e imparcialidade judicial.',
                'Subordinação exclusiva à Constituição e à Lei.',
                'Decisões dos tribunais são de cumprimento obrigatório para todos.'
              ],
              keywords: ['tribunais', 'função jurisdicional', 'independência judicial', 'juízes'],
              relatedArticleIds: ['cra-art-105', 'cra-art-176']
            },
            {
              id: 'cra-art-176',
              code: 'Artigo 176.º',
              title: 'Sistema Jurisdicional e Tribunais Superiores',
              legalText: `1. Os Tribunais superiores da República de Angola são o Tribunal Constitucional, o Tribunal Supremo, o Tribunal de Contas e o Supremo Tribunal Militar.
2. O sistema de organização compreende:
a) Jurisdição comum encabeçada pelo Tribunal Supremo;
b) Jurisdição militar encabeçada pelo Supremo Tribunal Militar.
3. É proibida a criação de tribunais com competência exclusiva para o julgamento de determinadas infracções (tribunais de excepção).`,
              definition: 'Arquitetura dos Tribunais Superiores em Angola e proibição de tribunais ad hoc ou de exceção.',
              simpleExplanation: 'Existem 4 Tribunais Superiores em Angola: 1. Constitucional, 2. Supremo, 3. de Contas e 4. Supremo Tribunal Militar. É proibido criar tribunais de exceção.',
              importantPoints: [
                '4 Tribunais Superiores: Tribunal Constitucional, Tribunal Supremo, Tribunal de Contas e Supremo Tribunal Militar.',
                'Tribunal Supremo encabeça a jurisdição comum.',
                'Proibição absoluta de tribunais de exceção.'
              ],
              keywords: ['tribunal constitucional', 'tribunal supremo', 'tribunal de contas', 'supremo tribunal militar', 'tribunais superiores'],
              relatedArticleIds: ['cra-art-174', 'cra-art-180', 'cra-art-181']
            },
            {
              id: 'cra-art-186',
              code: 'Artigo 186.º',
              title: 'Competências do Ministério Público (PGR)',
              legalText: `Compete ao Ministério Público representar o Estado, defender a legalidade democrática e os interesses que a lei determinar, exercer a acção penal, dirigir a fase de instrução preparatória dos processos penais e promover a execução das penas.`,
              definition: 'Atribuições constitucionais da Procuradoria-Geral da República no processo penal.',
              simpleExplanation: 'O Ministério Público (PGR) é o órgão que acusa os criminosos nos tribunais e fiscaliza a investigação criminal realizada pelos investigadores do SIC.',
              importantPoints: [
                'Dirige a instrução preparatória dos processos penais.',
                'Exerce em exclusivo a ação penal pública.',
                'Fiscaliza a legalidade na atuação das forças policiais e nos estabelecimentos prisionais.'
              ],
              examAlert: 'COBRADO EM CONCURSOS SIC/MININT: Quem dirige a fase de instrução preparatória dos processos penais? Resposta: O Ministério Público.',
              keywords: ['ministério público', 'pgr', 'instrução preparatória', 'acção penal', 'sic'],
              relatedArticleIds: ['cra-art-189', 'cra-art-209'],
              questions: [
                {
                  id: 'q-cra-186',
                  question: 'A quem compete a direcção da fase de instrução preparatória dos processos penais segundo o Artigo 186.º da CRA?',
                  options: [
                    'À Polícia Nacional.',
                    'Ao Ministério Público (Procuradoria-Geral da República).',
                    'Ao Tribunal Constitucional.',
                    'Ao Governador Provincial.'
                  ],
                  correctAnswer: 1,
                  explanation: 'Nos termos do Artigo 186.º, cabe ao Ministério Público dirigir a fase de instrução preparatória dos processos penais.',
                  examContext: 'Processo Penal e Atuação do SIC'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-186',
                  front: 'Quem dirige a instrução preparatória no processo penal angolano?',
                  back: 'O Ministério Público (Procuradoria-Geral da República) nos termos do Artigo 186.º da CRA.',
                  articleRef: 'Artigo 186.º da CRA'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-5',
      title: 'Título V – Administração Pública e Segurança Nacional (Artigos 198.º a 212.º)',
      sections: [
        {
          id: 'cra-sec-5-1',
          title: 'Secção I – Administração Pública e Função Pública (Art. 198.º a 201.º)',
          articles: [
            {
              id: 'cra-art-198',
              code: 'Artigo 198.º',
              title: 'Princípios Fundamentais da Administração Pública',
              legalText: `1. A Administração Pública visa a satisfação das necessidades colectivas, devendo na sua actuação obedecer aos princípios da legalidade, igualdade, proporcionalidade, justiça, imparcialidade, boa-fé, eficiência, probidade pública e transparência.
2. A Administração Pública é estruturada de forma a evitar a burocratização e aproxima os serviços das populações.`,
              definition: 'Princípios regentes de todos os serviços públicos, ministérios e concursos públicos.',
              simpleExplanation: 'Tudo o que o Estado, os Ministérios e as Polícias fazem deve seguir os princípios de justiça, honestidade, rapidez, transparência e respeito pelo cidadão.',
              importantPoints: [
                'Princípios essenciais: Legalidade, Proporcionalidade, Imparcialidade, Probidade Pública e Eficiência.',
                'Desburocratização e aproximação aos cidadãos.',
                'Probidade pública obriga à honestidade absoluta na gestão do erário público.'
              ],
              keywords: ['administração pública', 'probidade pública', 'eficiência', 'proporcionalidade', 'legalidade'],
              relatedArticleIds: ['cra-art-2', 'cra-art-199']
            },
            {
              id: 'cra-art-199',
              code: 'Artigo 199.º',
              title: 'Estatuto dos Funcionários Públicos e Concursos Públicos',
              legalText: `1. Os funcionários e demais agentes públicos estão ao serviço exclusivo do interesse público.
2. O acesso às funções públicas faz-se mediante concurso público, salvo nos casos expressamente previstos na lei.`,
              definition: 'Exigência constitucional do concurso público como regra geral de ingresso na Função Pública.',
              simpleExplanation: 'Para trabalhar na Função Pública (professores, médicos, agentes da polícia, inspetores) o ingresso faz-se obrigatoriamente por Concurso Público transparente.',
              importantPoints: [
                'Regra geral imperativa: Ingresso mediante CONCURSO PÚBLICO.',
                'Dever de imparcialidade e serviço exclusivo do interesse público.'
              ],
              keywords: ['concurso público', 'função pública', 'funcionário público', 'ingresso'],
              relatedArticleIds: ['cra-art-198', 'cra-art-207']
            }
          ]
        },
        {
          id: 'cra-sec-5-2',
          title: 'Secção II – Segurança Nacional, Forças Armadas, Polícia Nacional e Órgãos de Investigação (Art. 202.º a 212.º)',
          articles: [
            {
              id: 'cra-art-202',
              code: 'Artigo 202.º',
              title: 'Objectivos e Fundamentos da Segurança Nacional',
              legalText: `1. Compete ao Estado, com a participação dos cidadãos, garantir a segurança nacional, observando a Constituição e a lei.
2. A segurança nacional tem por objectivo a garantia da salvaguarda da independência e soberania nacionais, da integridade territorial, do Estado democrático de direito e da defesa contra ameaças internas e externas.`,
              definition: 'Conceito e dever estatal/cívico de preservação da segurança pública e integridade territorial.',
              simpleExplanation: 'A segurança nacional é um dever do Estado e de todos os cidadãos para proteger a paz, o território e a democracia contra ameaças internas ou externas.',
              importantPoints: [
                'Garantida pelo Estado com a participação ativa dos cidadãos.',
                'Proteção contra ameaças internas e externas.',
                'Respeito estrito pelos Direitos Humanos.'
              ],
              keywords: ['segurança nacional', 'ordem pública', 'defesa do estado', 'participação dos cidadãos'],
              relatedArticleIds: ['cra-art-131', 'cra-art-207']
            },
            {
              id: 'cra-art-207',
              code: 'Artigo 207.º',
              title: 'Estatuto Constitucional da Polícia Nacional (PNA)',
              legalText: `1. As Forças Armadas e a Polícia Nacional são instituições nacionais, permanentes, regulares e apartidárias.
2. A Polícia Nacional é a instituição nacional policial, permanente, regular e apartidária, organizada na base da hierarquia e da disciplina, incumbida da protecção e asseguramento policial do País, no estrito respeito pela Constituição e pelas leis, bem como pelas convenções internacionais.
3. A Polícia Nacional compõe-se exclusivamente de cidadãos angolanos e a sua organização é única para todo o território nacional.`,
              definition: 'Artigo fundamental que define a natureza e missão da Polícia Nacional de Angola.',
              simpleExplanation: 'A Polícia Nacional é um órgão permanente do Estado, único em todo o país, constituído apenas por cidadãos angolanos, apartidário (sem partidos) e regido pela disciplina e hierarquia.',
              importantPoints: [
                '4 ATRIBUTOS OBRIGATÓRIOS: Nacional, Permanente, Regular e APARTIDÁRIA.',
                'Base institucional: Hierarquia e Disciplina.',
                'Composição: Exclusivamente por cidadãos angolanos.',
                'Organização única para todo o território nacional.'
              ],
              examAlert: 'QUESTÃO DE OURO EM CONCURSOS PNA/MININT: Memorize os 4 carateres da Polícia Nacional: NACIONAL, PERMANENTE, REGULAR e APARTIDÁRIA.',
              keywords: ['polícia nacional', 'pna', 'apartidária', 'permanente', 'hierarquia', 'disciplina'],
              relatedArticleIds: ['cra-art-122', 'cra-art-202', 'cra-art-209'],
              questions: [
                {
                  id: 'q-cra-207-pna',
                  question: 'Como se carateriza a Polícia Nacional no Artigo 207.º da Constituição da República de Angola?',
                  options: [
                    'Como força voluntária municipal e partidária.',
                    'Como instituição nacional, permanente, regular e apartidária, composta exclusivamente por cidadãos angolanos.',
                    'Como milícia privada sob direcção das autarquias.',
                    'Como corporação estrangeira de prestação de serviços.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O texto constitucional define expressamente a Polícia Nacional como instituição nacional, permanente, regular e apartidária, de composição exclusiva angolana.',
                  examContext: 'Concurso Público PNA / MININT'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-207',
                  front: 'Quais os 4 atributos essenciais da Polícia Nacional segundo a Constituição (Art. 207.º)?',
                  back: '1. Nacional\n2. Permanente\n3. Regular\n4. Apartidária',
                  articleRef: 'Artigo 207.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-209',
              code: 'Artigo 209.º',
              title: 'Órgãos de Investigação Criminal e Criminalística (SIC)',
              legalText: 'A investigação criminal e as acções de prevenção e repressão do crime organizado, cibercrime e criminalidade complexa são executadas por órgãos especializados da administração do Estado (Serviço de Investigação Criminal - SIC), atuando sob direção funcional do Ministério Público.',
              definition: 'Mapeamento constitucional dos órgãos estatais de investigação criminal e ciência forense.',
              simpleExplanation: 'O Serviço de Investigação Criminal (SIC) investiga crimes, recolhe provas e atua sob coordenação do Ministério Público para levar os suspeitos a tribunal.',
              importantPoints: [
                'Especialização no combate ao crime organizado e cibercrime.',
                'Atuação sob direção funcional do Ministério Público.',
                'Uso da ciência criminalística para instrução do processo.'
              ],
              keywords: ['sic', 'investigação criminal', 'cibercrime', 'ministério público', 'criminalística'],
              relatedArticleIds: ['cra-art-186', 'cra-art-207']
            },
            {
              id: 'cra-art-211-212',
              code: 'Artigos 211.º e 212.º',
              title: 'Preservação da Segurança do Estado e Órgãos de Inteligência (SINSE e SIE)',
              legalText: `• Artigo 211.º: A preservação da segurança do Estado visa a salvaguarda do Estado democrático de direito contra a criminalidade violenta ou organizada, no respeito da Constituição.
• Artigo 212.º: Os órgãos de inteligência e de segurança do Estado são órgãos incumbidos de realizar a produção de informações e análises necessárias à preservação do Estado democrático de direito e da paz pública.`,
              definition: 'Mapeamento constitucional dos serviços de inteligência estatal (SINSE, SIE, SIME).',
              simpleExplanation: 'Os serviços de inteligência recolhem informações estratégicas cruciais para combater a criminalidade organizada e proteger a paz pública do país.',
              importantPoints: [
                'Produção de informações estratégicas para a segurança do Estado.',
                'Combate à criminalidade violenta e organizada.',
                'Subordinação rigorosa à Constituição e Direitos Fundamentais.'
              ],
              keywords: ['inteligência', 'sinse', 'sie', 'segurança do estado', 'informações'],
              relatedArticleIds: ['cra-art-122', 'cra-art-202']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-6',
      title: 'Título VI – Poder Local e Autarquias Locais (Artigos 213.º a 225.º)',
      sections: [
        {
          id: 'cra-sec-6-1',
          title: 'Secção I – Descentralização, Autarquias Locais e Poder Tradicional',
          articles: [
            {
              id: 'cra-art-213',
              code: 'Artigo 213.º',
              title: 'Autonomia Local e Descentralização',
              legalText: '1. A organização democrática do Estado ao nível local estrutura-se com base no princípio da descentralização político-administrativa.\n2. As formas de poder local compreendem as Autarquias Locais, as instituições do poder tradicional e outras formas de participação dos cidadãos.',
              definition: 'Descentralização territorial e criação das autarquias locais angolanas.',
              simpleExplanation: 'O poder local é exercido através de Autarquias Municipais eleitas pela população local e pelo respeito ao Poder Tradicional (Sobas e Autoridades Tradicionais).',
              importantPoints: [
                'Princípio da descentralização político-administrativa.',
                'Estruturação em Autarquias Locais nos municípios.',
                'Reconhecimento das autoridades do Poder Tradicional.'
              ],
              keywords: ['descentralização', 'autarquias locais', 'poder local', 'municípios', 'poder tradicional'],
              relatedArticleIds: ['cra-art-217', 'cra-art-242']
            },
            {
              id: 'cra-art-223',
              code: 'Artigo 223.º',
              title: 'Poder Tradicional',
              legalText: 'O Estado reconhece o estatuto, o papel e as instituições do poder tradicional constituídas segundo o direito costumeiro que não contrarie a Constituição e a lei.',
              definition: 'Reconhecimento constitucional da autoridade tradicional costumeira (Sobas e Autoridades Étnicas).',
              simpleExplanation: 'O Estado Angolano respeita e apoia os Sobas e Autoridades Tradicionais que resolvem litígios comunitários segundo os costumes e sem violar a Constituição.',
              importantPoints: [
                'Reconhecimento do direito costumeiro compatível com a Constituição.',
                'Papel social de pacificação nas comunidades rurais e urbanas.'
              ],
              keywords: ['poder tradicional', 'sobas', 'direito costumeiro', 'comunidades'],
              relatedArticleIds: ['cra-art-213']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-7',
      title: 'Título VII – Garantias da Constituição e Revisão Constitucional (Artigos 226.º a 237.º)',
      sections: [
        {
          id: 'cra-sec-7-1',
          title: 'Secção I – Fiscalização da Inconstitucionalidade e Limites de Revisão',
          articles: [
            {
              id: 'cra-art-226',
              code: 'Artigo 226.º',
              title: 'Inconstitucionalidade por Acção e por Omissão',
              legalText: 'São inconstitucionais os actos que contrariem os princípios e normas consagrados na presente Constituição.',
              definition: 'Fiscalização da conformidade de todas as leis e decretos com a Constituição.',
              simpleExplanation: 'Se uma lei ou regulamento for feito contra a Constituição, o Tribunal Constitucional declara essa lei nula (inconstitucional).',
              importantPoints: [
                'Inconstitucionalidade por acção (leis contrárias à CRA).',
                'Inconstitucionalidade por omissão (falta de regulamentação necessária).',
                'Competência exclusiva do Tribunal Constitucional.'
              ],
              keywords: ['inconstitucionalidade', 'tribunal constitucional', 'fiscalização', 'invalidade'],
              relatedArticleIds: ['cra-art-6', 'cra-art-180', 'cra-art-236']
            },
            {
              id: 'cra-art-236',
              code: 'Artigo 236.º',
              title: 'Limites Materiais de Revisão da Constituição (Cláusulas Pétreas)',
              legalText: `As alterações da Constituição têm de respeitar os seguintes limites materiais:
a) A dignidade da pessoa humana;
b) A independência, integridade territorial e unidade nacional;
c) A forma republicana de governo;
d) A natureza unitária do Estado;
e) O núcleo essencial dos direitos, liberdades e garantias;
f) O Estado de direito e a democracia pluralista;
g) A laicidade do Estado e separação entre Estado e igrejas;
h) O sufrágio universal, directo, secreto e periódico;
i) A independência dos Tribunais;
j) A separação e interdependência dos órgãos de soberania;
k) A autonomia local.`,
              definition: 'Cláusulas pétreas ou limites intransponíveis que nem a Assembleia Nacional pode abolir.',
              simpleExplanation: 'Existem matérias sagradas na Constituição que NENHUMA revisão constitucional pode alterar, como os Direitos Fundamentais, a Independência de Angola, a Laicidade do Estado e as Eleições.',
              importantPoints: [
                'Conhecidas como cláusulas pétreas da Constituição de Angola.',
                'Proíbem a eliminação dos direitos fundamentais, laicidade e separação de poderes.',
                'Garantem a perpetuidade da República e da Democracia.'
              ],
              keywords: ['limites materiais', 'cláusulas pétreas', 'revisão constitucional', 'dignidade humana'],
              relatedArticleIds: ['cra-art-1', 'cra-art-2', 'cra-art-6']
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-8',
      title: 'Título VIII – Disposições Finais e Transitórias (Artigos 238.º a 244.º)',
      sections: [
        {
          id: 'cra-sec-8-1',
          title: 'Secção I – Gradualismo e Entrada em Vigor',
          articles: [
            {
              id: 'cra-art-242',
              code: 'Artigo 242.º',
              title: 'Princípio do Gradualismo nas Autarquias Locais',
              legalText: 'A institucionalização efectiva das autarquias locais obedece ao princípio do gradualismo, nos termos da lei.',
              definition: 'Transição progressiva para a implementação total das eleições municipais autárquicas.',
              simpleExplanation: 'A criação das autarquias em Angola é feita de forma faseada/gradual para assegurar capacidade financeira e administrativa em cada município.',
              importantPoints: [
                'Regra do GRADUALISMO na criação das autarquias.',
                'Tema altamente debatido e cobrado em provas de Função Pública e Direito Constitucional.'
              ],
              examAlert: 'Frequente em exames: A institucionalização das autarquias locais obedece ao Princípio do Gradualismo (Artigo 242.º da CRA).',
              keywords: ['gradualismo', 'autarquias locais', 'transição', 'municípios'],
              relatedArticleIds: ['cra-art-213'],
              questions: [
                {
                  id: 'q-cra-242',
                  question: 'De acordo com o Artigo 242.º das Disposições Transitórias da CRA, a institucionalização das autarquias locais obedece a qual princípio?',
                  options: [
                    'Princípio da simultaneidade absoluta.',
                    'Princípio do gradualismo.',
                    'Princípio da imposição centralizada.',
                    'Princípio da revogação territorial.'
                  ],
                  correctAnswer: 1,
                  explanation: 'O Artigo 242.º determina que a institucionalização efectiva das autarquias locais obedece ao princípio do gradualismo.',
                  examContext: 'Organização do Poder Local'
                }
              ],
              flashcards: [
                {
                  id: 'fc-cra-242',
                  front: 'Qual princípio rege a criação das autarquias locais segundo o Artigo 242.º da CRA?',
                  back: 'O Princípio do Gradualismo (Artigo 242.º).',
                  articleRef: 'Artigo 242.º da CRA'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
