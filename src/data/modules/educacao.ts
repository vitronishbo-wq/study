import { DiplomaModule } from '../../types/minint';

export const educacaoModule: DiplomaModule = {
  id: 'educacao',
  title: 'Decreto Presidencial n.º 222/20 de 28 de Agosto — Estatuto Orgânico do Ministério da Educação',
  shortTitle: 'Estatuto Orgânico do MED',
  iconName: 'GraduationCap',
  hierarchyLabel: 'Estatuto Orgânico do MED (Decreto Presidencial n.º 222/20)',
  hierarchyLevel: 5,
  description: 'Definição, missão, atribuições, estrutura orgânica, órgãos centrais, serviços de apoio técnico, executivos directos e superintendidos do Ministério da Educação de Angola (MED).',
  chapters: [
    {
      id: 'med-cap-1',
      title: 'Capítulo I — Natureza e Atribuições',
      articles: [
        {
          id: 'med-art-1',
          code: 'Artigo 1.º',
          title: 'Natureza e Missão do Ministério da Educação (MED)',
          legalText: 'O Ministério da Educação, abreviadamente designado por «MED», é o Departamento Ministerial auxiliar do Titular do Poder Executivo que, de acordo com os objectivos e prioridades definidas, tem como missão definir, propor, coordenar, executar e controlar a política educativa dos níveis de Educação Pré-Escolar, Ensino Primário e Secundário.',
          definition: 'O MED é o órgão central do Governo de Angola encarregue de superintender a política de ensino pré-escolar, primário e secundário.',
          simpleExplanation: 'O Ministério da Educação auxilia o Presidente da República (Titular do Poder Executivo) na definição e gestão das escolas de infância, ensino primário e secundário (geral e técnico-profissional) em todo o território nacional.',
          importantPoints: [
            'Designação abreviada oficial: MED.',
            'Departamento Ministerial auxiliar do Titular do Poder Executivo (Presidente da República).',
            'Âmbito pedagógico: Educação Pré-Escolar, Ensino Primário e Ensino Secundário (Geral, Técnico-Profissional e Pedagógico).',
            'Exclui o Ensino Superior (que pertence ao MESCTI).'
          ],
          examAlert: 'PERGUNTA DE EXAME: Qual o nível de ensino supervisionado pelo MED? Resposta: Pré-escolar, Primário e Secundário. O Ensino Superior compete ao MESCTI.',
          questions: [
            {
              id: 'q-med-art1-1',
              question: 'De acordo com o Decreto Presidencial n.º 222/20, qual é o âmbito de missão do Ministério da Educação (MED)?',
              options: [
                'Apenas o Ensino Superior e Investigação Científica',
                'Apenas a Alfabetização de Adultos',
                'Educação Pré-Escolar, Ensino Primário e Secundário',
                'Formação Militar e Ensino Policial'
              ],
              correctAnswer: 2,
              explanation: 'Nos termos do Artigo 1.º do Decreto Presidencial n.º 222/20, o MED superintende os níveis de Educação Pré-Escolar, Ensino Primário e Ensino Secundário.',
              examContext: 'Concurso Público MED / Admissão de Professores'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art1-1',
              front: 'Qual o diploma que aprova o atual Estatuto Orgânico do Ministério da Educação?',
              back: 'Decreto Presidencial n.º 222/20 de 28 de Agosto.',
              articleRef: 'Artigo 1.º - Decreto Presidencial n.º 222/20'
            }
          ]
        },
        {
          id: 'med-art-2',
          code: 'Artigo 2.º',
          title: 'Atribuições Principais do Ministério da Educação',
          legalText: 'Para a prossecução da sua missão, o Ministério da Educação tem as seguintes atribuições:\na)- Assegurar a definição, direcção e coordenação da execução da política educativa através dos seus órgãos e serviços;\nb)- Conceber e propor políticas referentes ao Sector, visando a melhoria da qualidade de Educação e Ensino, a valorização do professor, expansão e consolidação da rede escolar;\nc)- Promover a implementação de programas e procedimentos em matéria de Educação e Ensino;\nd)- Coordenar a implementação de programas e medidas de políticas que visem o desenvolvimento da Educação e Ensino;\ne)- Estimular a participação da sociedade civil na implementação dos programas do Executivo;\nf)- Promover e fomentar acções de investigação científica no domínio da Educação em articulação com o MESCTI;\ng)- Elaborar propostas de instrumentos legais e regulamentares para o Sector;\nh)- Cultivar e valorizar os factores que concorrem para a consolidação e afirmação do patriotismo e identidade nacional;\ni)- Exercer a fiscalização e supervisão da execução das orientações técnicas e metodológicas sobre o funcionamento do Sistema de Educação e Ensino;\nj)- Promover a cooperação internacional no domínio da Educação e Ensino;\nk)- Representar Angola junto de organismos regionais e internacionais da educação;\nl)- Divulgar critérios e indicadores de avaliação da eficácia da educação;\nm)- Articular com o Ministério da Saúde para programas de nutrição, saúde escolar, vacinação e educação sanitária;\nn)- Promover o desenvolvimento harmonioso da rede escolar conforme o crescimento demográfico e desenvolvimento local;\no)- Coordenar e superintender a política curricular e inclusão escolar;\np)- Acompanhar projectos de cooperação e assistência técnica;\nq)- Exercer as demais atribuições estabelecidas por lei.',
          definition: 'Leque de 17 competências fundamentais que orientam a gestão escolar, políticas pedagógicas e carreira docente em Angola.',
          simpleExplanation: 'As atribuições abrangem a valorização do professor, ampliação da rede escolar, supervisão de colégios públicos e privados, saúde escolar com o MINSA, cooperação com a UNESCO/UNICEF e elaboração do currículo nacional.',
          importantPoints: [
            'Valorização contínua do professor e valorização do patriotismo/identidade nacional.',
            'Articulação obrigatória com o Ministério da Saúde (saúde e vacinação escolar) e com o MESCTI (investigação científica).',
            'Supervisão e fiscalização pedagógica de escolas públicas, público-privadas e privadas.',
            'Planeamento da rede escolar em sintonia com a demografia e a Nova DPA.'
          ],
          examAlert: 'COBRADO EM PROVAS: A qual órgão compete a articulação da saúde e nutrição escolar dos alunos? Ao MED em coordenação direta com o Ministério da Saúde (Art. 2.º m).',
          questions: [
            {
              id: 'q-med-art2-1',
              question: 'Com qual Ministério o MED deve articular diretamente os programas de saúde escolar, nutrição e vacinação dos alunos?',
              options: [
                'Ministério do Interior',
                'Ministério da Saúde (MINSA)',
                'Ministério da Justiça',
                'Ministério das Finanças'
              ],
              correctAnswer: 1,
              explanation: 'Conforme a alínea m) do Artigo 2.º do Decreto Presidencial n.º 222/20, cabe ao MED articular com o Departamento Ministerial da Saúde na promoção da saúde escolar e vacinação.',
              examContext: 'Exame de Legislação Educativa MED'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art2-1',
              front: 'Qual é um dos focos centrais das atribuições do MED segundo a alínea b) do Artigo 2.º?',
              back: 'A melhoria da qualidade do ensino, a valorização do professor e a expansão da rede escolar.',
              articleRef: 'Artigo 2.º, alínea b)'
            }
          ]
        }
      ]
    },
    {
      id: 'med-cap-2',
      title: 'Capítulo II — Organização em Geral (Estrutura Orgânica)',
      articles: [
        {
          id: 'med-art-3',
          code: 'Artigo 3.º',
          title: 'Estrutura Orgânica Geral do Ministério da Educação',
          legalText: 'O Ministério da Educação compreende na sua estrutura os seguintes órgãos e serviços:\n1. Órgãos Centrais de Direcção Superior:\na) Ministro;\nb) Secretários de Estado.\n2. Órgãos de Apoio Consultivo:\na) Conselho Consultivo;\nb) Conselho de Direcção.\n3. Serviços de Apoio Técnico:\na) Secretaria Geral;\nb) Gabinete de Recursos Humanos;\nc) Gabinete de Estudos, Planeamento e Estatística (GEPE);\nd) Gabinete Jurídico e de Intercâmbio;\ne) Gabinete de Tecnologias de Informação e Comunicação Institucional (GTIC);\nf) Gabinete de Inspecção e Supervisão Pedagógica.\n4. Serviços de Apoio Instrumental:\na) Gabinete do Ministro;\nb) Gabinetes dos Secretários de Estado.\n5. Serviços Executivos Directos:\na) Direcção Nacional de Educação Pré-Escolar e Primário;\nb) Direcção Nacional do Ensino Secundário;\nc) Direcção Nacional da Educação de Jovens e Adultos.',
          definition: 'Organograma oficial que divide o Ministério em 5 grandes categorias funcionais.',
          simpleExplanation: 'O MED divide-se em Direcção Superior (Ministro e Secretários de Estado), Apoio Consultivo (Conselhos), Apoio Técnico (Secretaria Geral, Recursos Humanos, GEPE, Jurídico, TICs e Inspecção), Apoio Instrumental (Gabinetes) e Serviços Executivos Directos (Direcções Nacionais).',
          importantPoints: [
            '2 Secretários de Estado (Ensino Secundário + Pré-Escolar e Primário).',
            '6 Serviços de Apoio Técnico (incluindo o Gabinete de Inspecção e Supervisão Pedagógica).',
            '3 Direcções Nacionais Executivas Directas (Pré-Escolar/Primário, Secundário, Jovens e Adultos).'
          ],
          examAlert: 'MUITO FREQUENTE: Saber identificar quais são as Direcções Nacionais do MED. Resposta: Pré-Escolar e Primário, Ensino Secundário, e Educação de Jovens e Adultos.',
          questions: [
            {
              id: 'q-med-art3-1',
              question: 'Quais são os Serviços Executivos Directos que integram a estrutura orgânica do MED?',
              options: [
                'Gabinete Jurídico, GEPE e Secretaria Geral',
                'Direcção Nacional de Educação Pré-Escolar e Primário, Direcção Nacional do Ensino Secundário e Direcção Nacional da Educação de Jovens e Adultos',
                'Conselho Consultivo e Conselho de Direcção',
                'Gabinete de Inspecção e Recursos Humanos'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos do número 5 do Artigo 3.º do Decreto Presidencial n.º 222/20, os Serviços Executivos Directos são as 3 Direcções Nacionais referidas.',
              examContext: 'Concurso de Acesso ao MED'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art3-1',
              front: 'Quantos e quais são os Secretários de Estado que coadjuvam o Ministro da Educação?',
              back: 'Dois: Secretário de Estado para o Ensino Secundário e Secretário de Estado para a Educação Pré-Escolar e Ensino Primário.',
              articleRef: 'Artigo 3.º e 7.º'
            }
          ]
        }
      ]
    },
    {
      id: 'med-cap-3-sec-1',
      title: 'Capítulo III — Órgãos Centrais de Direcção Superior & Apoio Consultivo',
      articles: [
        {
          id: 'med-art-4-6',
          code: 'Artigos 4.º a 6.º',
          title: 'Competências do Ministro da Educação e Forma dos Actos',
          legalText: 'Artigo 4.º: O MED é dirigido pelo Ministro, a quem compete dirigir, coordenar e controlar a actividade do Ministério.\nArtigo 5.º: Compete ao Ministro gerir o orçamento, criar e encerrar escolas públicas e privadas, emitir parecer vinculativo sobre nomeação de Directores Provinciais e Municipais de Educação, nomear e exonerar pessoal de direcção e chefia.\nArtigo 6.º: O Ministro exara Decretos Executivos e Despachos (publicados no Diário da República), e internamente emite Despachos Internos, Ordens de Serviço e Circulares.',
          definition: 'O Ministro da Educação detém a direcção individual e responsabilidade pessoal sobre a política educativa do País.',
          simpleExplanation: 'O Ministro pode abrir ou fechar escolas públicas e privadas, dá parecer obrigatório para a nomeação dos Directores Provinciais e Municipais de Educação e assina Decretos Executivos no Diário da República.',
          importantPoints: [
            'A nomeação dos Directores Provinciais e Municipais de Educação exige parecer vinculativo do Ministro da Educação.',
            'Compete ao Ministro criar e encerrar instituições de ensino públicas, público-privadas e privadas.',
            'Forma dos actos externos: Decretos Executivos e Despachos no Diário da República.'
          ],
          examAlert: 'PERGUNTA DE PROVA: A nomeação de um Director Provincial de Educação requer parecer de quem? Do Ministro da Educação (parecer vinculativo - Art. 5.º n.º 2 i).',
          questions: [
            {
              id: 'q-med-art5-1',
              question: 'Qual é o papel do Ministro da Educação no processo de nomeação dos Directores Provinciais e Municipais de Educação?',
              options: [
                'Nenhum, a nomeação é exclusiva do Governador sem consulta',
                'Emitir parecer vinculativo sobre as nomeações',
                'Apenas homologar o certificado escolar',
                'Nomear diretamente sem consulta aos órgãos locais'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos da alínea i) do n.º 2 do Artigo 5.º, compete ao Ministro da Educação emitir parecer vinculativo sobre as nomeações dos Directores Provinciais e Municipais da Educação.',
              examContext: 'Legislação de Administração Escolar MED'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art5-1',
              front: 'Quais diplomas normativos o Ministro da Educação exara para publicação em Diário da República?',
              back: 'Decretos Executivos e Despachos.',
              articleRef: 'Artigo 6.º'
            }
          ]
        },
        {
          id: 'med-art-7-9',
          code: 'Artigos 7.º a 9.º',
          title: 'Secretários de Estado, Conselho Consultivo e Conselho de Direcção',
          legalText: 'Artigo 7.º: O Ministro é coadjuvado pelo Secretário de Estado para o Ensino Secundário e pelo Secretário de Estado para a Educação Pré-Escolar e Ensino Primário.\nArtigo 8.º: O Conselho Consultivo é o órgão periódico de apoio consultivo, presidido pelo Ministro, reunindo ordinariamente 2 (duas) vezes por ano, integrando Directores Nacionais e Directores Provinciais de Educação.\nArtigo 9.º: O Conselho de Direcção reúne ordinariamente 1 (uma) vez por mês para consulta e coordenação das actividades do Ministério.',
          definition: 'Periodicidade e composição dos órgãos colegiais de consulta política e técnica do MED.',
          simpleExplanation: 'O Conselho Consultivo junta os Directores Provinciais de todas as províncias 2 vezes por ano. O Conselho de Direcção reúne todos os meses na sede do Ministério.',
          importantPoints: [
            'Conselho Consultivo: reúne ordinariamente 2 vezes por ano.',
            'Conselho de Direcção: reúne ordinariamente 1 vez por mês.',
            'Integração dos Directores Provinciais de Educação no Conselho Consultivo.'
          ],
          examAlert: 'QUAL A PERIODICIDADE? Conselho Consultivo = 2 vezes por ano. Conselho de Direcção = 1 vez por mês.',
          questions: [
            {
              id: 'q-med-art8-1',
              question: 'Com que periodicidade ordinária se reúne o Conselho Consultivo do Ministério da Educação?',
              options: [
                'Semanalmente',
                'Uma vez por mês',
                'Duas vezes por ano',
                'Apenas de 5 em 5 anos'
              ],
              correctAnswer: 2,
              explanation: 'Conforme o n.º 4 do Artigo 8.º, o Conselho Consultivo reúne-se ordinariamente duas vezes por ano.',
              examContext: 'Exame de Organização Administrativa do MED'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art8-1',
              front: 'Qual órgão consultivo do MED se reúne mensalmente?',
              back: 'O Conselho de Direcção (Artigo 9.º, n.º 4).',
              articleRef: 'Artigo 9.º'
            }
          ]
        }
      ]
    },
    {
      id: 'med-cap-3-sec-2',
      title: 'Capítulo III — Serviços de Apoio Técnico',
      articles: [
        {
          id: 'med-art-10-11',
          code: 'Artigos 10.º e 11.º',
          title: 'Secretaria Geral e Gabinete de Recursos Humanos (GRH)',
          legalText: 'Artigo 10.º: A Secretaria Geral assegura a gestão financeira, logística, património e contratação pública. Compreende o Departamento de Gestão do Orçamento e Administração do Património, Departamento de Relações Públicas e Expediente e Departamento de Contratação Pública.\nArtigo 11.º: O Gabinete de Recursos Humanos (GRH) gere os quadros do MED, carreiras docentes, formação, salários e avaliação de desempenho. Compreende o Departamento de Gestão por Competências e Desenvolvimento de Carreiras, Departamento de Formação e Avaliação de Desempenho e Departamento de Arquivo, Registo e Gestão de Dados.',
          definition: 'Gestão patrimonial, orçamental e administração das carreiras de professores e funcionários administrativos.',
          simpleExplanation: 'A Secretaria Geral trata das compras, orçamentos e carros/edifícios do Ministério. O GRH cuida dos concursos de professores, progressão na carreira docente, processamento de salários e avaliação de desempenho.',
          importantPoints: [
            'A nomeação do Director do GRH exige parecer prévio do Titular do Departamento Ministerial da Administração Pública (MAPTSS).',
            'O GRH é o responsável pela elaboração das folhas de salários e avaliação de desempenho dos professores e técnicos.',
            'A Secretaria Geral integra o Departamento de Contratação Pública.'
          ],
          examAlert: 'ATENÇÃO: A nomeação do Director do GRH do MED precisa de parecer prévio do MAPTSS (Art. 11.º, n.º 3).',
          questions: [
            {
              id: 'q-med-art11-1',
              question: 'A nomeação do Director do Gabinete de Recursos Humanos do MED deve ser antecedida de parecer prévio de qual entidade?',
              options: [
                'Ministério das Finanças',
                'Titular do Departamento Ministerial responsável pela Administração Pública (MAPTSS)',
                'Ministério do Interior',
                'Governador Provincial de Luanda'
              ],
              correctAnswer: 1,
              explanation: 'O n.º 3 do Artigo 11.º estabelece expressamente que a nomeação do Director do GRH é antecedida de parecer prévio do Titular da Administração Pública.',
              examContext: 'Gestão de Recursos Humanos na Educação'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art11-1',
              front: 'Quais são os 3 departamentos que compõem o Gabinete de Recursos Humanos do MED?',
              back: '1. Gestão por Competências e Desenvolvimento de Carreiras; 2. Formação e Avaliação de Desempenho; 3. Arquivo, Registo e Gestão de Dados.',
              articleRef: 'Artigo 11.º, n.º 3'
            }
          ]
        },
        {
          id: 'med-art-12-13',
          code: 'Artigos 12.º e 13.º',
          title: 'GEPE e Gabinete Jurídico e de Intercâmbio',
          legalText: 'Artigo 12.º: O GEPE elabora medidas de política, estudos, plano de construções e modelo-tipo de escolas e equipamentos escolares, além de gerir as estatísticas do Sector da Educação. Compreende: Departamento de Estudos e Estatística, Departamento de Planeamento, Monitoramento e Controlo e Departamento de Infra-Estruturas, Equipamentos e Meios de Ensino.\nArtigo 13.º: O Gabinete Jurídico e de Intercâmbio realiza assessoria jurídica, contencioso, elaboração de leis e emite licenças para funcionamento de escolas privadas e público-privadas. Compreende: Departamento de Produção Legislativa, Departamento do Contencioso e Departamento de Intercâmbio.',
          definition: 'Atribuições estratégicas de planeamento escolar físico/estatístico e regulação jurídica dos colégios privados.',
          simpleExplanation: 'O GEPE projeta as escolas e recolhe a estatística de alunos. O Gabinete Jurídico analisa as leis do ensino e autoriza o licenciamento de colégios e complexos escolares privados em Angola.',
          importantPoints: [
            'É ao GEPE que compete definir o modelo-tipo de construção de escolas e verificar o seu cumprimento (Art. 12.º h).',
            'É ao Gabinete Jurídico que compete emitir licenças às instituições de ensino privado e público-privado (Art. 13.º f).',
            'Estatística educativa alinhada com o Sistema de Estatística Nacional (INE).'
          ],
          examAlert: 'QUESTÃO TÍPICA: Qual órgão do MED define o modelo-tipo de construção das escolas públicas? O GEPE.',
          questions: [
            {
              id: 'q-med-art12-1',
              question: 'A qual Serviço de Apoio Técnico compete definir o modelo-tipo de construção de escolas e equipamentos escolares em Angola?',
              options: [
                'Secretaria Geral',
                'Gabinete de Estudos, Planeamento e Estatística (GEPE)',
                'Gabinete Jurídico',
                'Gabinete de Inspecção'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos da alínea h) do n.º 2 do Artigo 12.º, compete ao GEPE definir o modelo-tipo de construção de escolas.',
              examContext: 'Planeamento Educativo e Infra-estruturas MED'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art12-1',
              front: 'Qual órgão emite as licenças para o funcionamento de colégios privados em Angola?',
              back: 'O Gabinete Jurídico e de Intercâmbio do MED (Artigo 13.º, n.º 2 f).',
              articleRef: 'Artigo 13.º'
            }
          ]
        },
        {
          id: 'med-art-14-15',
          code: 'Artigos 14.º e 15.º',
          title: 'GTIC e Gabinete de Inspecção e Supervisão Pedagógica',
          legalText: 'Artigo 14.º: O GTIC promove o portal do MED, modernização tecnológica, comunicação social e discursos oficiais. Compreende o Departamento de Tecnologias de Informação e Departamento de Comunicação Institucional.\nArtigo 15.º: O Gabinete de Inspecção e Supervisão Pedagógica é o serviço responsável pelo acompanhamento, supervisão, avaliação e fiscalização da actividade desenvolvida no sistema de educação (escolas públicas, público-privadas e privadas). Compreende o Departamento de Inspecção e Departamento de Supervisão.',
          definition: 'Fiscalização do cumprimento do currículo nacional, qualidade das aulas e garantia do rendimento escolar.',
          simpleExplanation: 'A Inspecção e Supervisão Pedagógica envia inspectores às escolas para ver se os professores estão a cumprir o programa, se as notas são reais e se os colégios cumprem as normas higiénicas e pedagógicas do Estado.',
          importantPoints: [
            'Fiscalização abrange escolas públicas, público-privadas e privadas.',
            'Acompanhamento direto do cumprimento dos programas e currículos escolares.',
            'Promove a cultura de auto-avaliação nas instituições de ensino.'
          ],
          examAlert: 'FUNDAMENTAL PARA PROFESSORES: A Inspecção e Supervisão Pedagógica verifica o rendimento do sistema nos aspectos educativo e formativo.',
          questions: [
            {
              id: 'q-med-art15-1',
              question: 'Qual é o serviço de apoio técnico encarregue de fiscalizar e supervisionar a atividade pedagógica nas escolas públicas e privadas?',
              options: [
                'Gabinete de Recursos Humanos',
                'Gabinete de Inspecção e Supervisão Pedagógica',
                'Secretaria Geral',
                'Gabinete de Tecnologias'
              ],
              correctAnswer: 1,
              explanation: 'De acordo com o Artigo 15.º do Decreto Presidencial n.º 222/20, cabe ao Gabinete de Inspecção e Supervisão Pedagógica a fiscalização pedagógica do ensino.',
              examContext: 'Inspecção Escolar e Pedagogia'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art15-1',
              front: 'Quais departamentos formam a estrutura do Gabinete de Inspecção e Supervisão Pedagógica?',
              back: '1. Departamento de Inspecção; 2. Departamento de Supervisão.',
              articleRef: 'Artigo 15.º, n.º 3'
            }
          ]
        }
      ]
    },
    {
      id: 'med-cap-3-sec-3',
      title: 'Capítulo III — Serviços Executivos Directos',
      articles: [
        {
          id: 'med-art-17',
          code: 'Artigo 17.º',
          title: 'Direcção Nacional de Educação Pré-Escolar e Primário',
          legalText: 'A Direcção Nacional de Educação Pré-Escolar e Primário formula e controla a implementação da política educativa na infância e no ensino primário. Competências: conceber o calendário escolar para centros infantis e escolas primárias, orientação pedagógica, propor normas para o ensino primário e coordenar a saúde escolar.\nCompreende:\na) Departamento de Educação Pré-Escolar;\nb) Departamento do Ensino Primário;\nc) Departamento de Saúde Escolar.',
          definition: 'Direcção encarregada das creches, centros infantis, 1.ª à 6.ª classe e saúde da criança em idade escolar.',
          simpleExplanation: 'A DN de Educação Pré-Escolar e Primário trata do início da vida escolar das crianças angolanas, elaborando o calendário das escolas primárias e gerindo a saúde escolar.',
          importantPoints: [
            'Conceção do calendário escolar do ensino primário em articulação com as restantes direcções.',
            'Controlo de creches, centros infantis e escolas primárias públicas e privadas.',
            'Abrigamento do Departamento de Saúde Escolar.'
          ],
          examAlert: 'ONDE FICA A SAÚDE ESCOLAR? O Departamento de Saúde Escolar está integrado na Direcção Nacional de Educação Pré-Escolar e Primário (Art. 17.º, n.º 3 c).',
          questions: [
            {
              id: 'q-med-art17-1',
              question: 'Em qual Direcção Nacional do MED está integrado o Departamento de Saúde Escolar?',
              options: [
                'Direcção Nacional do Ensino Secundário',
                'Direcção Nacional de Educação Pré-Escolar e Primário',
                'Direcção Nacional de Jovens e Adultos',
                'Gabinete de Inspecção'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos da alínea c) do n.º 3 do Artigo 17.º, o Departamento de Saúde Escolar integra a Direcção Nacional de Educação Pré-Escolar e Primário.',
              examContext: 'Organização do Ensino Primário em Angola'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art17-1',
              front: 'Quais os 3 departamentos da Direcção Nacional de Educação Pré-Escolar e Primário?',
              back: '1. Departamento de Educação Pré-Escolar; 2. Departamento do Ensino Primário; 3. Departamento de Saúde Escolar.',
              articleRef: 'Artigo 17.º, n.º 3'
            }
          ]
        },
        {
          id: 'med-art-18',
          code: 'Artigo 18.º',
          title: 'Direcção Nacional do Ensino Secundário',
          legalText: 'A Direcção Nacional do Ensino Secundário responde pela política educativa do I e II Ciclo do Ensino Secundário Geral, Técnico-Profissional e Pedagógico. Competências: orientação metodológica do ensino secundário, desporto escolar, orientação vocacional e vínculo das escolas com o sector empresarial.\nCompreende:\na) Departamento do Ensino Secundário Geral;\nb) Departamento do Desporto Escolar;\nc) Departamento de Orientação Vocacional e Profissional.',
          definition: 'Direcção encarregada do 1.º ciclo (7.ª à 9.ª classe) e 2.º ciclo (10.ª à 12.ª/13.ª classe) e liceus, institutos técnicos e magistérios.',
          simpleExplanation: 'Esta direcção gere o ensino secundário geral, colégios técnicos e pedagógicos, organizando também o desporto escolar e a orientação vocacional dos alunos para a universidade e mercado de trabalho.',
          importantPoints: [
            'Supervisão do I Ciclo (7.ª a 9.ª classe) e II Ciclo (Liceus, Institutos Politécnicos e Magistérios).',
            'Promoção do Desporto Escolar e parceria com empresas para o ensino técnico.',
            'Compreende o Departamento de Orientação Vocacional e Profissional.'
          ],
          examAlert: 'ONDE FICA O DESPORTO ESCOLAR? Integra o Departamento do Desporto Escolar na Direcção Nacional do Ensino Secundário (Art. 18.º, n.º 3 b).',
          questions: [
            {
              id: 'q-med-art18-1',
              question: 'A qual Direcção Nacional compete formular propostas e planificar a organização do Desporto Escolar em Angola?',
              options: [
                'Direcção Nacional do Ensino Secundário',
                'Direcção Nacional de Educação Pré-Escolar',
                'Gabinete do Ministro',
                'Secretaria Geral'
              ],
              correctAnswer: 0,
              explanation: 'Nos termos do Artigo 18.º, o Departamento do Desporto Escolar faz parte da Direcção Nacional do Ensino Secundário.',
              examContext: 'Educação Física e Desporto Escolar'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art18-1',
              front: 'Quais são os 3 departamentos da Direcção Nacional do Ensino Secundário?',
              back: '1. Departamento do Ensino Secundário Geral; 2. Departamento do Desporto Escolar; 3. Departamento de Orientação Vocacional e Profissional.',
              articleRef: 'Artigo 18.º, n.º 3'
            }
          ]
        },
        {
          id: 'med-art-19-22',
          code: 'Artigos 19.º a 22.º',
          title: 'Educação de Jovens e Adultos e Disposições Finais',
          legalText: 'Artigo 19.º: A Direcção Nacional da Educação de Jovens e Adultos coordena a alfabetização, pós-alfabetização e recuperação do atraso escolar de jovens e adultos. Compreende: Departamento de Ensino Primário de Adultos e Departamento de Ensino Secundário de Adultos.\nArtigos 20.º a 22.º: O quadro de pessoal inclui a carreira geral e docente. Os regulamentos internos são aprovados por Decreto Executivo do Ministro. A criação de órgãos superintendidos faz-se por diploma próprio.',
          definition: 'Subsistema de combate ao analfabetismo e reinserção escolar de adultos em Angola.',
          simpleExplanation: 'Garante que jovens e adultos que não estudaram na idade própria possam concluir a alfabetização, o ensino primário e o ensino secundário de adultos.',
          importantPoints: [
            'Programas de alfabetização, pós-alfabetização e aceleração do atraso escolar.',
            'Departamento de Ensino Primário de Adultos e Departamento de Ensino Secundário de Adultos.',
            'Anexos com Quadro de Pessoal da Carreira Geral, Carreira Docente e Organigrama do MED.'
          ],
          examAlert: 'A carreira docente no MED integra a estrutura especial do Quadro de Pessoal do Ministério.',
          questions: [
            {
              id: 'q-med-art19-1',
              question: 'Quais são os dois departamentos que compõem a Direcção Nacional da Educação de Jovens e Adultos?',
              options: [
                'Departamento de Alfabetização e Departamento de Universidade',
                'Departamento de Ensino Primário de Adultos e Departamento de Ensino Secundário de Adultos',
                'Departamento de Ensino Técnico e Departamento de Licitações',
                'Departamento de Inspecção e Departamento Jurídico'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos do n.º 3 do Artigo 19.º do Decreto Presidencial n.º 222/20, compreende o Departamento de Ensino Primário de Adultos e o Departamento de Ensino Secundário de Adultos.',
              examContext: 'Alfabetização e Educação de Adultos em Angola'
            }
          ],
          flashcards: [
            {
              id: 'fc-med-art19-1',
              front: 'Qual o principal objetivo da Direcção Nacional da Educação de Jovens e Adultos?',
              back: 'Coordenar a alfabetização, pós-alfabetização e a recuperação do atraso escolar de jovens e adultos (Art. 19.º).',
              articleRef: 'Artigo 19.º'
            }
          ]
        }
      ]
    }
  ]
};
