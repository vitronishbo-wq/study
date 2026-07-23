import { DiplomaModule } from '../../types/minint';

export const constituicaoModule: DiplomaModule = {
  id: 'constituição',
  title: 'Constituição da República de Angola (CRA 2010)',
  shortTitle: 'Constituição (CRA)',
  iconName: 'BookMarked',
  hierarchyLabel: 'Hierarquia I: Norma Suprema do Estado (Prioridade Máxima em Concursos)',
  hierarchyLevel: 1,
  description: 'Texto constitucional vigente da República de Angola (aprovado a 21 de Janeiro de 2010 e promulgado a 5 de Fevereiro de 2010). Lei Suprema e Fundamental que rege o Estado, os direitos fundamentais, os órgãos de soberania e o sistema de segurança pública (PNA, SIC, SME, SP e SPCB).',
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
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-18-19',
              code: 'Artigos 18.º a 20.º',
              title: 'Símbolos Nacionais, Língua Oficial e Capital',
              legalText: `• Artigo 18.º (Símbolos Nacionais): São símbolos nacionais da República de Angola a Bandeira Nacional, a Insígnia Nacional e o Hino Nacional ("Angola Avante"), adoptados a 11 de Novembro de 1975.
• Artigo 19.º (Línguas): A língua oficial da República de Angola é o português. O Estado valoriza e promove o estudo, o ensino e a utilização das demais línguas de Angola (línguas nacionais de origem africana).
• Artigo 20.º (Capital): A capital da República de Angola é Luanda.`,
              definition: 'Identidade nacional, soberania simbólica, regime linguístico e sede do poder central.',
              simpleExplanation: 'Angola tem 3 símbolos sagrados (Bandeira, Insígnia e Hino "Angola Avante"). A língua oficial é o Português e a Capital é Luanda.',
              importantPoints: [
                '3 Símbolos Nacionais: Bandeira, Insígnia e Hino Nacional ("Angola Avante").',
                'Língua oficial: Português.',
                'Dever de valorizar e ensinar as línguas angolanas de origem africana.',
                'Capital da República: Luanda.'
              ],
              examAlert: 'Frequente em Provas: A língua oficial é o Português, mas a Constituição impõe a promoção e valorização das línguas nacionais de origem africana.',
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
              id: 'cra-art-23',
              code: 'Artigo 23.º',
              title: 'Princípio da Igualdade',
              legalText: `1. Todos são iguais perante a Constituição e a lei.
2. Ninguém pode ser prejudicado, privilegiado, privado de qualquer direito ou isento de qualquer dever em razão da sua ascendência, sexo, raça, etnia, cor, deficiência, língua, local de nascimento, religião, convicções políticas, ideológicas ou filosóficas, grau de instrução, condição económica ou social ou profissão.`,
              definition: 'Proibição constitucional de todas as formas de discriminação injusta e garantia de tratamento uniforme.',
              simpleExplanation: 'Todos os cidadãos têm os mesmos direitos e deveres perante a lei, sem favoritismos nem discriminação por raça, etnia, religião, partido ou dinheiro.',
              importantPoints: [
                'Igualdade formal e material perante a lei.',
                'Enumeração exemplificativa e proibição de discriminação.',
                'Aplicabilidade a todos os agentes e instituições do Estado.'
              ],
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-30',
              code: 'Artigo 30.º',
              title: 'Direito à Vida e Proibição da Pena de Morte',
              legalText: 'O Estado respeita e protege a vida da pessoa humana, que é inviolável.',
              definition: 'Direito matriz e suporte de todos os demais direitos humanos.',
              simpleExplanation: 'A vida é sagrada e inviolável. Em Angola a pena de morte é proibida de forma absoluta.',
              importantPoints: [
                'A vida humana é inviolável.',
                'Proibição constitucional da pena de morte (Artigo 59.º da CRA reforça esta proibição).',
                'Dever do Estado de respeitar e proteger a vida.'
              ],
              examAlert: 'QUESTÃO CERTA DE EXAME POLICIAL: Em Angola NÃO EXISTE pena de morte.',
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
              id: 'cra-art-33',
              code: 'Artigo 33.º',
              title: 'Inviolabilidade do Domicílio',
              legalText: `1. O domicílio é inviolável.
2. Ninguém pode entrar ou fazer busca ou apreensão no domicílio de qualquer pessoa sem o seu consentimento, salvo nas situações previstas na Constituição e na lei, quando munido de mandado da autoridade competente, emitido nos casos e segundo as formas legalmente previstas, ou em caso de flagrante delito ou situação de emergência, para prestação de auxílio.`,
              definition: 'Proteção da casa do cidadão contra entradas arbitrárias de forças policiais.',
              simpleExplanation: 'A polícia não pode entrar na casa de ninguém sem mandado judicial, salvo em 2 exceções graves: flagrante delito ou emergência para socorrer pessoas.',
              importantPoints: [
                'Regra geral: Inviolabilidade do domicílio.',
                'Requisito normal: Mandado emitido pela autoridade judicial competente.',
                'Exceções sem mandado: Flagrante delito OU situação de emergência para socorro.'
              ],
              examAlert: 'MUITO COBRADO EM PROVAS DA POLÍCIA/SIC: Quais as exceções à necessidade de mandado judicial para busca domiciliária? Resposta: Flagrante delito ou emergência/prestação de auxílio.',
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
            }
          ]
        },
        {
          id: 'cra-sec-2-2',
          title: 'Secção II – Garantia dos Direitos e Liberdades (Art. 56.º a 75.º)',
          articles: [
            {
              id: 'cra-art-60',
              code: 'Artigo 60.º',
              title: 'Proibição de Tortura e Tratamentos Degradantes',
              legalText: 'Ninguém pode ser submetido a tortura, a trabalhos forçados, nem a tratamentos ou penas cruéis, desumanas ou degradantes.',
              definition: 'Garantia absoluta e indeferível de integridade física e psíquica dos cidadãos detidos.',
              simpleExplanation: 'A Polícia Nacional, o SIC e os Serviços Penitenciários são proibidos de agredir, torturar ou submeter detidos a maus-tratos.',
              importantPoints: [
                'Proibição absoluta de tortura e maus-tratos.',
                'Proibição de trabalhos forçados e penas cruéis.',
                'Confissões obtidas sob tortura são juridicamente NULAS.'
              ],
              questions: [],
              flashcards: []
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
              id: 'cra-art-67',
              code: 'Artigo 67.º',
              title: 'Presunção de Inocência e Garantias de Defesa',
              legalText: `1. Ninguém pode ser detido, preso ou submetido a julgamento senão nos termos da lei, sendo garantido a todos os arguidos o direito de defesa, recurso e patrocínio judiciário.
2. Presume-se inocente todo o cidadão até ao trânsito em julgado da sentença de condenação.
3. O arguido tem direito a escolher defensor e a ser por ele assistido em todos os actos do processo.`,
              definition: 'Princípio fundamental de processo penal que impede a presunção antecipada de culpa.',
              simpleExplanation: 'Todo o suspeito é considerado inocente até que o tribunal emita uma condenação definitiva (trânsito em julgado). A polícia deve tratar o suspeito com dignidade.',
              importantPoints: [
                'Presunção de inocência até ao trânsito em julgado.',
                'Obrigatoriedade de assistência por advogado nas fases legais decisivas.',
                'Direito de recorrer de sentenças condenatórias.'
              ],
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-68-69',
              code: 'Artigos 68.º e 69.º',
              title: 'Garantias Judiciais Especiais: Habeas Corpus e Habeas Data',
              legalText: `• Artigo 68.º (Habeas Corpus): Todos têm o direito à providência de habeas corpus contra o abuso de poder, em virtude de prisão ou detenção ilegal, a interpor perante o tribunal competente.
• Artigo 69.º (Habeas Data): Todos têm o direito de recorrer à providência de habeas data para assegurar o conhecimento de informações sobre si constantes de ficheiros, arquivos ou registos informáticos, exigir a sua rectificação ou actualização.`,
              definition: 'Remédios constitucionais para tutela da liberdade física de locomoção e da informação pessoal.',
              simpleExplanation: 'Habeas Corpus serve para libertar quem está preso ilegalmente. Habeas Data serve para consultar ou corrigir dados pessoais mantidos pelo Estado.',
              importantPoints: [
                'Habeas Corpus = Proteção contra prisão ou detenção ilegal.',
                'Habeas Data = Acesso, retificação e atualização de dados pessoais em ficheiros públicos.',
                'Habeas Corpus pode ser pedido pelo próprio preso ou por qualquer pessoa.'
              ],
              examAlert: 'COBRADO EM EXAMES: Diferenciar Habeas Corpus (liberdade física) de Habeas Data (informações e ficheiros pessoais).',
              questions: [
                {
                  id: 'q-cra-68-69',
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
                'SÃO EXACTAMENTE 3 ÓRGÃOS DE SOBERANIA: Presidente da República, Assembleia Nacional e Tribunais.',
                'O Governo/Conselho de Ministros NÃO é listado como órgão de soberania separado (está sob a chefia do PR).',
                'Devem respeitar a separação e interdependência de funções.'
              ],
              examAlert: 'PERGUNTA CLÁSSICA DE CONCURSO: Quais são os órgãos de soberania em Angola? Resposta: Presidente da República, Assembleia Nacional e Tribunais.',
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
              simpleExplanation: 'O Presidente acumula 3 funções essenciais: Chefe de Estado, Chefe do Governo (Poder Executivo) e Comandante-em-Chefe das Forças Armadas (FAA).',
              importantPoints: [
                'Triplo papel: Chefe de Estado, Titular do Poder Executivo e Comandante-em-Chefe das FAA.',
                'Auxiliado por Vice-Presidente, Ministros de Estado e Ministros.',
                'Mandato de 5 anos (máximo de 2 mandatos nos termos do Artigo 113.º).'
              ],
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-122',
              code: 'Artigo 122.º',
              title: 'Competências do Comandante-em-Chefe e Nomeação de Comandantes do MININT',
              legalText: `Compete ao Presidente da República, como Comandante-em-Chefe das Forças Armadas Angolanas:
a) Exercer as funções de Comandante em Chefe;
b) Nomear e exonerar o Chefe do Estado-Maior General das FAA;
f) Nomear e exonerar o Comandante Geral da Polícia Nacional e os 2.ºs Comandantes da Polícia Nacional, ouvido o Conselho de Segurança Nacional;
h) Promover e graduar os oficiais comissários da Polícia Nacional;
i) Nomear e exonerar os titulares dos órgãos de inteligência e segurança de Estado.`,
              definition: 'Poder de comando e provimento dos cargos de cúpula da Polícia e Forças Armadas.',
              simpleExplanation: 'É o Presidente da República que nomeia e exonera o Comandante Geral da Polícia Nacional e promove os Oficiais Comissários da PNA.',
              importantPoints: [
                'Nomeação e exoneração do Comandante Geral da PNA e 2.ºs Comandantes.',
                'Ouvir previamente o Conselho de Segurança Nacional.',
                'Promoção e graduação dos Oficiais Comissários da Polícia.'
              ],
              examAlert: 'Frequente em exames do MININT: Quem nomeia o Comandante Geral da PNA? Resposta: O Presidente da República e Comandante-em-Chefe.',
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
              flashcards: []
            }
          ]
        },
        {
          id: 'cra-sec-4-2',
          title: 'Secção II – Poder Judicial e Tribunais (Art. 174.º a 197.º)',
          articles: [
            {
              id: 'cra-art-176',
              code: 'Artigo 176.º',
              title: 'Sistema Jurisdicional e Tribunais Superiores',
              legalText: `1. Os Tribunais superiores da República de Angola são o Tribunal Constitucional, o Tribunal Supremo, o Tribunal de Contas e o Supremo Tribunal Militar.
2. O sistema de organização compreende:
a) Jurisdição comum encabeçada pelo Tribunal Supremo;
b) Jurisdição militar encabeçada pelo Supremo Tribunal Militar.
3. É proibida a criação de tribunais com competência exclusiva para o julgamento de determinadas infracções (tribunais de excepção).`,
              definition: 'Arquitetura do Poder Judicial e proibição de tribunais ad hoc ou de excepção.',
              simpleExplanation: 'Existem 4 Tribunais Superiores em Angola: Constitucional, Supremo, Contas e Supremo Tribunal Militar. Proibição de tribunais de exceção.',
              importantPoints: [
                '4 Tribunais Superiores: Tribunal Constitucional, Tribunal Supremo, Tribunal de Contas e Supremo Tribunal Militar.',
                'Tribunal Supremo encabeça a jurisdição comum.',
                'Proibição absoluta de tribunais de exceção.'
              ],
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-185-189',
              code: 'Artigos 185.º e 189.º',
              title: 'Ministério Público e Procuradoria-Geral da República (PGR)',
              legalText: `• Artigo 185.º: O Ministério Público é o órgão da Procuradoria-Geral da República essencial à função jurisdicional, dotado de autonomia e vinculação à legalidade.
• Artigo 186.º: Compete ao Ministério Público representar o Estado, exercer a acção penal e dirigir a fase preparatória dos processos penais.
• Artigo 189.º: A Procuradoria-Geral da República (PGR) é dirigida pelo Procurador-Geral da República, nomeado pelo Presidente da República por proposta do Conselho Superior da Magistratura do Ministério Público, para mandato de 5 anos (renovável uma vez).`,
              definition: 'Estatuto do órgão responsável pelo exercício da ação penal e fiscalização da instrução preparatória.',
              simpleExplanation: 'O Ministério Público (PGR) representa o Estado nos tribunais, acusa os criminosos e dirige a instrução preparatória exercida pelos investigadores do SIC.',
              importantPoints: [
                'Dirige a instrução preparatória dos processos penais.',
                'Ejerce em exclusivo a ação penal pública.',
                'PGR nomeado pelo PR sob proposta do CSMMP para mandato de 5 anos.'
              ],
              examAlert: 'COBRADO EM CONCURSOS SIC/MININT: Quem dirige a fase de instrução preparatória dos processos-crime? Resposta: O Ministério Público.',
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
                  explanation: 'Nos termos do Artigo 186.º, alínea f), cabe ao Ministério Público dirigir a fase de instrução preparatória dos processos penais.',
                  examContext: 'Processo Penal e Atuação do SIC'
                }
              ],
              flashcards: []
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
          title: 'Secção I – Segurança Nacional, Forças Armadas e Polícia Nacional',
          articles: [
            {
              id: 'cra-art-202',
              code: 'Artigo 202.º',
              title: 'Objectivos e Fundamentos da Segurança Nacional',
              legalText: `1. Compete ao Estado, com a participação dos cidadãos, garantir a segurança nacional, observando a Constituição e a lei.
2. A segurança nacional tem por objectivo a garantia da salvaguarda da independência e soberania nacionais, da integridade territorial, do Estado democrático de direito e da defesa contra ameaças internas e externas.`,
              definition: 'Conceito e dever estatal/cívico de preservação da segurança pública e integridade territorial.',
              simpleExplanation: 'A segurança nacional é um dever do Estado e de todos os cidadãos para proteger a paz, o território e a democracia contra ameaças.',
              importantPoints: [
                'Garantida pelo Estado com a participação ativa dos cidadãos.',
                'Proteção contra ameaças internas e externas.',
                'Respeito estrito pelos Direitos Humanos.'
              ],
              questions: [],
              flashcards: []
            },
            {
              id: 'cra-art-207',
              code: 'Artigo 207.º',
              title: 'Estatuto Constitucional da Polícia Nacional (PNA)',
              legalText: `1. As Forças Armadas e a Polícia Nacional são instituições nacionais, permanentes, regulares e apartidárias.
2. A Polícia Nacional é a instituição nacional policial, permanente, regular e apartidária, organizada na base da hierarquia e da disciplina, incumbida da protecção e asseguramento policial do País, no estrito respeito pela Constituição e pelas leis, bem como pelas convenções internacionais.
3. A Polícia Nacional compõe-se exclusivamente de cidadãos angolanos e a sua organização é única para todo o território nacional.`,
              definition: 'Artigo fundamental que rege a Polícia Nacional de Angola.',
              simpleExplanation: 'A Polícia Nacional é um órgão permanente do Estado, único em todo o país, constituído apenas por cidadãos angolanos, apartidário (sem partidos) e regido pela disciplina e hierarquia.',
              importantPoints: [
                '4 ADJETIVOS ESSENCIAIS: Nacional, Permanente, Regular e APARTIDÁRIA.',
                'Base institucional: Hierarquia e Disciplina.',
                'Composição: Exclusivamente por cidadãos angolanos (proibidos estrangeiros no seu efetivo).',
                'Organização única para todo o território nacional.'
              ],
              examAlert: 'QUESTÃO DE OURO EM CONCURSOS PNA/MININT: Memorize os 4 carateres da Polícia Nacional: NACIONAL, PERMANENTE, REGULAR e APARTIDÁRIA.',
              questions: [
                {
                  id: 'q-cra-207-pna',
                  question: 'Como se carateriza a Polícia Nacional no Artigo 210.º / 207.º da Constituição da República de Angola?',
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
                  front: 'Quais os 4 atributos da Polícia Nacional segundo a Constituição?',
                  back: '1. Nacional\n2. Permanente\n3. Regular\n4. Apartidária',
                  articleRef: 'Artigo 207.º / 210.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-211-212',
              code: 'Artigos 211.º e 212.º',
              title: 'Preservação da Segurança do Estado e Órgãos de Inteligência',
              legalText: `• Artigo 211.º: A preservação da segurança do Estado visa a salvaguarda do Estado democrático de direito contra a criminalidade violenta ou organizada, no respeito da Constituição.
• Artigo 212.º: Os órgãos de inteligência e de segurança do Estado são órgãos incumbidos de realizar a produção de informações e análises e adopção de medidas necessárias à preservação do Estado democrático de direito e da paz pública.`,
              definition: 'Mapeamento constitucional dos serviços de informação e inteligência estatal (SINSE, SIE, SIME).',
              simpleExplanation: 'Os serviços de inteligência recolhem informações cruciais para combater o crime organizado e proteger o país contra ameaças à paz pública.',
              importantPoints: [
                'Produção de informações e análises para segurança do Estado.',
                'Combate à criminalidade violenta e organizada.',
                'Subordinação rigorosa à Constituição e Direitos Fundamentais.'
              ],
              questions: [],
              flashcards: []
            }
          ]
        }
      ]
    },
    {
      id: 'cra-cap-6',
      title: 'Título VI e VII – Poder Local e Revisão Constitucional (Artigos 213.º a 237.º)',
      sections: [
        {
          id: 'cra-sec-6-1',
          title: 'Secção I – Poder Local, Autarquias e Poder Tradicional (Art. 213.º a 225.º)',
          articles: [
            {
              id: 'cra-art-213-217',
              code: 'Artigos 213.º e 217.º',
              title: 'Autarquias Locais e Princípio da Autonomia Local',
              legalText: `• Artigo 213.º: A organização democrática do Estado ao nível local estrutura-se com base no princípio da descentralização político-administrativa (Autarquias Locais, instituições do poder tradicional).
• Artigo 217.º: As Autarquias Locais são pessoas colectivas territoriais que asseguram os interesses específicos das populações e organizam-se nos municípios.`,
              definition: 'Descentralização territorial e criação das autarquias locais angolanas.',
              simpleExplanation: 'O poder local é exercido através de Autarquias Municipais eleitas pela população local e pelo respeito ao Poder Tradicional (Sobas e Autoridades Tradicionais).',
              importantPoints: [
                'Descentralização político-administrativa.',
                'Autarquias organizam-se nos municípios.',
                'Artigo 242.º consagra o Princípio do Gradualismo na criação das autarquias.'
              ],
              examAlert: 'Frequente em exames: A implementação das autarquias locais obedece ao Princípio do Gradualismo (Artigo 242.º da CRA).',
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
                  back: 'O Princípio do Gradualismo.',
                  articleRef: 'Artigo 242.º da CRA'
                }
              ]
            },
            {
              id: 'cra-art-236',
              code: 'Artigo 236.º',
              title: 'Limites Materiais de Revisão da Constituição',
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
              simpleExplanation: 'Existem matérias sagradas que NENHUMA revisão constitucional pode alterar, como a independência de Angola, a forma de República, a laicidade do Estado e os Direitos Fundamentais.',
              importantPoints: [
                'Conhecidas como cláusulas pétreas da Constituição de Angola.',
                'Proíbem a eliminação dos direitos fundamentais, laicidade e separação de poderes.',
                'Garantem a sustentabilidade do Estado Democrático de Direito.'
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
