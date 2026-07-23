import { DiplomaModule } from '../../types/minint';

export const policiaModule: DiplomaModule = {
  id: 'policia',
  title: 'Decreto Presidencial n.º 152/19 de 15 de Maio - Estatuto Orgânico da Polícia Nacional de Angola',
  shortTitle: 'Estatuto Orgânico da PNA',
  iconName: 'ShieldAlert',
  hierarchyLabel: 'Hierarquia IV: Estatuto Orgânico da PNA (Decreto Presidencial n.º 152/19)',
  hierarchyLevel: 4,
  description: 'Estrutura, organização, funcionamento, atribuições, especialidades operacionais, dependência hierárquica e regime estatutário do pessoal militarizado e civil da Polícia Nacional de Angola (PNA).',
  chapters: [
    {
      id: 'pna-cap-1',
      title: 'Capítulo I - Disposições Gerais (Natureza, Missão e Atribuições)',
      articles: [
        {
          id: 'pna-dp-152-19',
          code: 'Decreto Presidencial n.º 152/19',
          title: 'Aprovação e Âmbito de Aplicação do Estatuto Orgânico da PNA',
          legalText: 'Artigo 1.º (Aprovação): É aprovado o Estatuto Orgânico da Polícia Nacional de Angola, anexo ao presente Decreto Presidencial.\nArtigo 2.º (Revogação): É revogada toda a legislação que contrarie o disposto no presente Decreto Presidencial, nomeadamente o Decreto n.º 10/95, de 28 de Abril, e o Decreto n.º 20/93, de 11 de Junho.\nArtigo 4.º (Entrada em Vigor): O presente Decreto Presidencial entra em vigor na data da sua publicação (15 de Maio de 2019).',
          definition: 'Aprovação do novo quadro regulamentar da Polícia Nacional assinado pelo Presidente João Manuel Gonçalves Lourenço.',
          simpleExplanation: 'O Decreto Presidencial n.º 152/19 de 15 de maio atualizou a organização da Polícia Nacional de Angola para a nova realidade política e jurídica, revogando o antigo Decreto n.º 10/95.',
          importantPoints: [
            'Aprovado pelo Presidente da República, João Lourenço, em 15 de Maio de 2019.',
            'Revogou o Decreto n.º 10/95 de 28 de Abril e o Decreto n.º 20/93 de 11 de Junho.',
            'Apreciado previamente em Conselho de Ministros a 28 de Março de 2019.'
          ],
          examAlert: 'PERGUNTA FREQUENTE: Qual diploma aprova o atual Estatuto Orgânico da PNA? Resposta: Decreto Presidencial n.º 152/19 de 15 de Maio.',
          questions: [
            {
              id: 'q-dp-152-19-1',
              question: 'Qual diploma aprovou o atual Estatuto Orgânico da Polícia Nacional de Angola?',
              options: [
                'Decreto n.º 10/95 de 28 de Abril',
                'Decreto Presidencial n.º 152/19 de 15 de Maio',
                'Lei n.º 22/12 de 15 de Dezembro',
                'Despacho Presidencial n.º 20/93 de 11 de Junho'
              ],
              correctAnswer: 1,
              explanation: 'O Estatuto Orgânico vigente da PNA foi aprovado pelo Decreto Presidencial n.º 152/19 de 15 de maio, assinado pelo Presidente da República João Lourenço.',
              examContext: 'Concurso PNA / MININT'
            }
          ],
          flashcards: [
            {
              id: 'fc-dp-152-19-1',
              front: 'Qual é o diploma legal que rege o Estatuto Orgânico da PNA?',
              back: 'Decreto Presidencial n.º 152/19 de 15 de Maio.',
              articleRef: 'Decreto Presidencial n.º 152/19'
            }
          ]
        },
        {
          id: 'pna-art-1-2',
          code: 'Artigos 1.º e 2.º',
          title: 'Definição, Natureza, Missão e Tipos de Pessoal da PNA',
          legalText: 'Artigo 2.º (Definição e Natureza):\n1. A Polícia Nacional de Angola (PNA) é uma força militarizada, uniformizada e armada, com natureza de força de segurança pública, dotada de autonomia operacional, administrativa, financeira e patrimonial.\n2. A PNA tem por missão:\na) Assegurar e defender a legalidade democrática;\nb) Garantir a segurança pública e o exercício dos direitos e liberdades fundamentais dos cidadãos;\nc) Manter a ordem e tranquilidade públicas;\nd) Colaborar na execução da política de defesa nacional, nos termos da Constituição e da lei.\n3. A PNA exerce a sua missão em todo o território nacional, podendo a mesma ser prosseguida fora do território nacional, desde que legalmente mandatada para o efeito.\n4. A PNA é constituída por pessoal militarizado e por pessoal civil.\n5. Considera-se pessoal militarizado o profissional com funções policiais, armado, uniformizado, sujeito a hierarquia de comando, integrado nas carreiras especiais de oficiais, de subchefes e de agentes da PNA.\n6. Considera-se pessoal civil o funcionário não enquadrado no quadro do pessoal militarizado.',
          definition: 'Natureza jurídica e missão institucional da Polícia Nacional de Angola.',
          simpleExplanation: 'A PNA é uma força militarizada de segurança pública com autonomia operacional, financeira e patrimonial. Composta por pessoal militarizado (oficiais, subchefes e agentes) e pessoal civil.',
          importantPoints: [
            'Natureza: Força militarizada, uniformizada e armada de segurança pública.',
            'Autonomias: Operacional, administrativa, financeira e patrimonial.',
            'Quadros do Pessoal: Pessoal militarizado (oficiais, subchefes e agentes) e Pessoal civil.',
            'Âmbito: Todo o território nacional e no estrangeiro quando legalmente mandatada.'
          ],
          examAlert: 'MUITO COBRADO EM PROVA: A PNA possui 4 tipos de autonomia: operacional, administrativa, financeira e patrimonial!',
          questions: [
            {
              id: 'q-pna-art-2-1',
              question: 'Segundo o Artigo 2.º do Decreto Presidencial n.º 152/19, qual é a natureza jurídica da Polícia Nacional de Angola?',
              options: [
                'Uma associação pública sem fins lucrativos e sem autonomia financeira.',
                'Uma força militarizada, uniformizada e armada, com natureza de força de segurança pública.',
                'Um departamento de vigilância privada e comunitária dependente das Forças Armadas.',
                'Uma empresa pública dotada exclusivamente de autonomia técnica e administrativa.'
              ],
              correctAnswer: 1,
              explanation: 'O n.º 1 do Artigo 2.º define a PNA como uma força militarizada, uniformizada e armada, de segurança pública com autonomia operacional, administrativa, financeira e patrimonial.',
              examContext: 'Concurso PNA / MININT'
            },
            {
              id: 'q-pna-art-2-2',
              question: 'Como se divide o pessoal que constitui a Polícia Nacional de Angola?',
              options: [
                'Pessoal militar, pessoal paramilitar e pessoal estagiário.',
                'Pessoal militarizado (oficiais, subchefes e agentes) e pessoal civil.',
                'Pessoal contratado, pessoal permanente e pessoal terceirizado.',
                'Pessoal de infantaria, cavalaria e marinha.'
              ],
              correctAnswer: 1,
              explanation: 'Nos termos dos n.ºs 4, 5 e 6 do Artigo 2.º, a PNA é constituída por pessoal militarizado e pessoal civil.',
              examContext: 'Estatuto Orgânico PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-2-1',
              front: 'Quais são as 4 autonomias concedidas à PNA pelo Artigo 2.º?',
              back: '1. Autonomia Operacional\n2. Autonomia Administrativa\n3. Autonomia Financeira\n4. Autonomia Patrimonial',
              articleRef: 'Artigo 2.º, n.º 1 do Decreto Presidencial n.º 152/19'
            },
            {
              id: 'fc-pna-art-2-2',
              front: 'Quais são os 4 eixos centrais da missão da PNA?',
              back: 'a) Assegurar a legalidade democrática;\nb) Garantir a segurança pública e direitos fundamentais;\nc) Manter ordem e tranquilidade públicas;\nd) Colaborar na defesa nacional.',
              articleRef: 'Artigo 2.º, n.º 2 da PNA'
            }
          ]
        },
        {
          id: 'pna-art-3',
          code: 'Artigo 3.º',
          title: 'Dependência e Direcção Superior da PNA',
          legalText: '1. A PNA, enquanto força de segurança, é dirigida pelo Presidente da República, na qualidade de Comandante-em-Chefe das Forças Armadas Angolanas.\n2. Compete ao Departamento Ministerial responsável pela ordem interna e segurança pública (Ministério do Interior - MININT) auxiliar o Presidente da República na condução e direcção da PNA.',
          definition: 'Subordinação política e comando supremo da corporação policial.',
          simpleExplanation: 'O Presidente da República, enquanto Comandante-em-Chefe, dirige superiormente a PNA. O Ministro do Interior auxilia o Presidente na condução e supervisão da instituição.',
          importantPoints: [
            'Direção Suprema: Presidente da República na qualidade de Comandante-em-Chefe.',
            'Órgão Auxiliar de Direção: Departamento Ministerial da Ordem Interna e Segurança Pública (MININT).'
          ],
          examAlert: 'ATENÇÃO EM CONCURSO: Quem dirige a PNA é o Presidente da República (Comandante-em-Chefe), sendo auxiliado pelo Ministério do Interior!',
          questions: [
            {
              id: 'q-pna-art-3-1',
              question: 'Quem dirige superiormente a Polícia Nacional de Angola nos termos do Artigo 3.º?',
              options: [
                'O Comandante-Geral da PNA de forma soberana.',
                'O Presidente da República, na qualidade de Comandante-em-Chefe das Forças Armadas Angolanas.',
                'O Procurador-Geral da República.',
                'O Chefe do Estado Maior General das FAA.'
              ],
              correctAnswer: 1,
              explanation: 'A PNA é dirigida pelo Presidente da República, na qualidade de Comandante-em-Chefe, sendo auxiliado pelo Ministro do Interior (MININT).',
              examContext: 'Concurso PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-3-1',
              front: 'A quem compete auxiliar o Presidente da República na condução da PNA?',
              back: 'Ao Departamento Ministerial responsável pela ordem interna e segurança pública (Ministério do Interior - MININT).',
              articleRef: 'Artigo 3.º, n.º 2'
            }
          ]
        },
        {
          id: 'pna-art-4',
          code: 'Artigo 4.º',
          title: 'Atribuições Detalhadas da PNA',
          legalText: 'Artigo 4.º: Em situações de normalidade constitucional, as atribuições da PNA são as previstas no presente Estatuto e demais legislação aplicável, e em situações de excepção, as resultantes da legislação sobre a defesa nacional e sobre os estados de guerra, de sítio e de emergência.\n2. A PNA tem as seguintes atribuições principais (alíneas a-z):\n- Prevenir e reprimir a delinquência e a criminalidade;\n- Exercer o policiamento e controlo de fronteiras;\n- Garantir a segurança pessoal de membros dos órgãos de soberania e entidades protocolares;\n- Controlar a importação, posse e uso de armas de fogo e explosivos na posse de civis;\n- Regular, fiscalizar e licenciar o trânsito rodoviário, emissão de cartas de condução e livretes;\n- Fiscalizar empresas privadas de segurança e autoprotecção;\n- Garantir segurança nos portos, aeroportos, caminhos-de-ferro e zonas aduaneiras.',
          definition: 'Ações e competências funcionais atribuídas por lei à corporação policial.',
          simpleExplanation: 'O Artigo 4.º enumera todas as tarefas da PNA, desde a prevenção de crimes ao policiamento rodoviário, controlo de armas de fogo, segurança de entidades protocolares, proteção de fronteiras e fiscalização de empresas privadas de segurança.',
          importantPoints: [
            'Fiscalização do trânsito, emissão de cartas de condução e licença de escolas de condução.',
            'Controlo e licenciamento de armas de fogo e explosivos na posse de cidadãos singulares ou coletivos.',
            'Fiscalização de Empresas Privadas de Segurança (EPS) e sistemas de autoproteção.',
            'Segurança e vigilância de zonas aduaneiras, portos, aeroportos e caminhos-de-ferro.'
          ],
          examAlert: 'EXAME: Quem emite cartas de condução, livretes e controla as escolas de condução em Angola? Resposta: A PNA através da Direcção de Trânsito e Segurança Rodoviária!',
          questions: [
            {
              id: 'q-pna-art-4-1',
              question: 'Qual das seguintes tarefas NÃO é uma atribuição da PNA expressa no Artigo 4.º do Decreto Presidencial n.º 152/19?',
              options: [
                'Regularizar o trânsito rodoviário e emitir cartas de condução e livretes.',
                'Controlar e fiscalizar a atividade das empresas privadas de segurança.',
                'Aprovar o Orçamento Geral do Estado (OGE) e promulgar leis na Assembleia Nacional.',
                'Exercer o policiamento, fiscalização e controlo das fronteiras nacionais.'
              ],
              correctAnswer: 2,
              explanation: 'Aprovar o OGE e promulgar leis é competência do Poder Legislativo (Assembleia Nacional) e do Presidente da República, não sendo atribuição da PNA.',
              examContext: 'Atribuições da PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-4-1',
              front: 'A quem compete o controlo e fiscalização da posse de armas de fogo na posse de civis?',
              back: 'À Polícia Nacional de Angola (Artigo 4.º, n.º 2, alínea o).',
              articleRef: 'Artigo 4.º do Decreto Presidencial n.º 152/19'
            }
          ]
        }
      ]
    },
    {
      id: 'pna-cap-2',
      title: 'Capítulo II & III - Estrutura Orgânica e Comando Geral',
      articles: [
        {
          id: 'pna-art-5',
          code: 'Artigo 5.º',
          title: 'Estrutura Orgânica Geral da PNA',
          legalText: 'Artigo 5.º (Estrutura Orgânica): A estrutura orgânica da PNA compreende:\n1. Comando Geral da PNA (Comandante Geral e dois 2.os Comandantes Gerais).\n2. Órgãos de Apoio Consultivo (Conselho Superior de Polícia, Conselho Superior de Quadros, Conselho Superior de Justiça e Disciplina, Conselho de Comandantes).\n3. Serviços de Apoio Instrumental (Gabinete do Comandante Geral, Gabinetes dos 2.os Comandantes Gerais, Corpo de Conselheiros).\n4. Serviços de Apoio Técnico (Inspecção, Direcções Nacionais: Operações, Educação Patriótica, Comunicação, Trânsito, Informações, Pessoal, Finanças, Telecomunicações, Logística, Transportes, Infra-Estruturas, Saúde, Administração, Intercâmbio, Assessoria Jurídica, Estudos e Planeamento).\n5. Órgãos de Doutrina e Ensino Policial (Direcção de Doutrina, ISCPC, Academia de Polícia, Escola Prática de Polícia, Centro de Cavalaria e Cinotecnia, Colégio de Polícia).\n6. Unidades Centrais (PIR, PGF, Polícia Fiscal Aduaneira, PSP/Entidades Protocolares, Segurança de Objectivos Estratégicos, DIIP, Unidade de Aviação).\n7. Unidades Territoriais (Comandos Provinciais).',
          definition: 'Organograma e divisão funcional completa da Polícia Nacional.',
          simpleExplanation: 'A PNA organiza-se em 7 blocos principais: Comando Geral, Órgãos Consultivos, Apoio Instrumental, Apoio Técnico (Direcções Nacionais), Doutrina e Ensino (ISCPC, Academia, Escola Prática), Unidades Centrais (PIR, PGF, DIIP, etc.) e Unidades Territoriais (Comandos Provinciais).',
          importantPoints: [
            'O Comando Geral é formado pelo Comandante Geral e por DOIS 2.os Comandantes Gerais.',
            'Existem 4 Órgãos Consultivos: Polícia, Quadros, Justiça/Disciplina e Comandantes.',
            'As Unidades Centrais incluem PIR, PGF, Polícia Fiscal, DIIP e Unidade de Aviação.'
          ],
          examAlert: 'BOM SABER EM PROVA: Quantos 2.os Comandantes Gerais coadjuvam o Comandante Geral da PNA? Resposta: Exatamente DOIS (2) 2.os Comandantes Gerais!',
          questions: [
            {
              id: 'q-pna-art-5-1',
              question: 'Quantos 2.os Comandantes Gerais integram o Comando Geral da PNA juntamente com o Comandante Geral?',
              options: [
                'Apenas 1 (Um) 2.º Comandante Geral.',
                '2 (Dois) 2.os Comandantes Gerais.',
                '3 (Três) 2.os Comandantes Gerais.',
                '4 (Quatro) 2.os Comandantes Gerais.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 5.º, n.º 1 estabelece que o Comando Geral compreende o Comandante Geral e Dois 2.os Comandantes Gerais.',
              examContext: 'Estrutura do Comando Geral PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-5-1',
              front: 'Quais são os 4 Órgãos de Apoio Consultivo da PNA?',
              back: '1. Conselho Superior de Polícia\n2. Conselho Superior de Quadros\n3. Conselho Superior de Justiça e Disciplina\n4. Conselho de Comandantes',
              articleRef: 'Artigo 5.º, n.º 2 do Decreto Presidencial n.º 152/19'
            }
          ]
        },
        {
          id: 'pna-art-8-10',
          code: 'Artigos 8.º a 10.º',
          title: 'Comandante Geral da PNA: Nomeação, Competências e Forma dos Actos',
          legalText: 'Artigo 8.º: O Comandante Geral da PNA é a mais alta autoridade na hierarquia da Corporação e responde perante o Presidente da República e perante o Ministro do Interior.\nÉ nomeado e exonerado pelo Presidente da República e Comandante-em-Chefe.\nArtigo 9.º: Competências do Comandante Geral: Comandar e fiscalizar todos os órgãos; admitir, promover e graduar o pessoal militarizado até à subclasse de Oficial Superior; aprovar regulamentos internos e quadros de pessoal; propor a nomeação de Comissários.\nArtigo 10.º (Forma dos Actos): Os actos do Comandante Geral revestem a forma de: Despachos, Directivas, Circulares, Ordens de Serviço e Instrutivos.',
          definition: 'Regime jurídico da autoridade máxima policial e suas ferramentas de gestão.',
          simpleExplanation: 'O Comandante Geral é nomeado pelo Presidente da República. Tem competência para promover agentes até Oficial Superior e expressa as suas decisões por despachos, directivas, circulares, ordens de serviço e instrutivos.',
          importantPoints: [
            'Nomeação e exoneração: Exclusiva do Presidente da República (Comandante-em-Chefe).',
            'Promoções pelo Comandante Geral: Pessoal militarizado até Oficial Superior.',
            'Nomeação de Oficiais Comissários: Proposta do Comandante Geral aprovada pelo Presidente da República.',
            'Formas dos Actos: Despachos, directivas, circulares, ordens de serviço e instrutivos.'
          ],
          examAlert: 'EXAME: Até que subclasse o Comandante Geral da PNA pode promover diretamente o pessoal militarizado? Resposta: Até à subclasse de Oficial Superior!',
          questions: [
            {
              id: 'q-pna-art-9-1',
              question: 'Qual é o limite de competência do Comandante Geral da PNA para promover e patentear pessoal militarizado?',
              options: [
                'Apenas até à classe de Agentes.',
                'Até à subclasse de Oficial Subalterno.',
                'Até à subclasse de Oficial Superior, independentemente do cargo.',
                'Até à classe de Oficiais Comissários.'
              ],
              correctAnswer: 2,
              explanation: 'Nos termos da alínea j) do Artigo 9.º, o Comandante Geral admite, promove e patenteia o pessoal militarizado até à subclasse de Oficial Superior. A nomeação de Comissários é competência do Presidente da República.',
              examContext: 'Competências do Comandante Geral'
            },
            {
              id: 'q-pna-art-10-1',
              question: 'Quais são as formas jurídicas que revestem os actos administrativos emitidos pelo Comandante Geral da PNA?',
              options: [
                'Decretos Presidenciais, Leis Orgânicas e Resoluções Parlamentares.',
                'Despachos, Directivas, Circulares, Ordens de Serviço e Instrutivos.',
                'Sentenças Judiciais e Editais Municipais.',
                'Acórdãos, Portarias Ministeriais e Tratados.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 10.º fixa expressamente as 5 formas dos actos do Comandante Geral: Despachos, Directivas, Circulares, Ordens de Serviço e Instrutivos.',
              examContext: 'Atos Administrativos PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-10-1',
              front: 'Quais são as 5 formas dos actos emitidos pelo Comandante Geral da PNA?',
              back: '1. Despachos\n2. Directivas\n3. Circulares\n4. Ordens de Serviço\n5. Instrutivos',
              articleRef: 'Artigo 10.º da PNA'
            }
          ]
        }
      ]
    },
    {
      id: 'pna-cap-3',
      title: 'Capítulo III - Órgãos de Ensino Policial e Unidades Centrais',
      articles: [
        {
          id: 'pna-art-36-41',
          code: 'Artigos 36.º a 41.º',
          title: 'Doutrina e Estabelecimentos de Ensino Policial (ISCPC, Academia e Escola Prática)',
          legalText: 'Artigo 37.º (ISCPC): O Instituto Superior de Ciências Policiais e Criminais é a instituição de ensino superior da PNA destinada a formar oficiais de polícia e ministrar cursos de acesso à subclasse de Oficiais Comissários, gozando de autonomia científica e pedagógica.\nArtigo 38.º (Academia de Polícia): Ministra cursos de acesso às subclasses de Oficiais Subalternos e Superiores.\nArtigo 39.º (Escola Prática de Polícia): Ministra a formação básica inicial de acesso à Classe de Agentes e curso de acesso à Classe de Subchefes.\nArtigo 40.º: Centro de Formação e Adestramento de Cavalaria e Cinotecnia.\nArtigo 41.º: Colégio de Polícia (Ensino secundário geral com doutrina castrense).',
          definition: 'Subsistema de formação, doutrina e ensino especializado da corporação.',
          simpleExplanation: 'O ISCPC é a faculdade de ensino superior da PNA (forma Oficiais e Comissários). A Academia forma Oficiais Subalternos e Superiores. A Escola Prática forma Agentes e Subchefes. O Colégio de Polícia garante o ensino secundário.',
          importantPoints: [
            'ISCPC: Ensino Superior Policial (formação de oficiais comissários e licenciatura em ciências policiais).',
            'Academia de Polícia: Cursos para Oficiais Subalternos e Superiores.',
            'Escola Prática de Polícia: Recrutamento e formação inicial de Agentes e Subchefes.',
            'Centro de Cavalaria e Cinotecnia: Adestramento de cavalos e cães policiais (técnica animal).'
          ],
          examAlert: 'MUITO IMPORTANTE EM PROVA: Onde é feita a formação básica inicial de recruta para a Classe de AGENTES da PNA? Resposta: Na Escola Prática de Polícia!',
          questions: [
            {
              id: 'q-pna-art-39-1',
              question: 'Qual é a instituição de ensino da PNA responsável por ministrar a formação básica inicial de acesso à Classe de Agentes?',
              options: [
                'Instituto Superior de Ciências Policiais e Criminais (ISCPC).',
                'Academia de Polícia.',
                'Escola Prática de Polícia.',
                'Colégio de Polícia.'
              ],
              correctAnswer: 2,
              explanation: 'Nos termos do Artigo 39.º, a Escola Prática de Polícia tem por missão ministrar a formação básica inicial de acesso à Classe de Agentes e o curso para Subchefes.',
              examContext: 'Ensino Policial'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-37-1',
              front: 'Qual estabelecimento de ensino da PNA goza de autonomia científica e pedagógica para o ensino superior?',
              back: 'Instituto Superior de Ciências Policiais e Criminais (ISCPC) - Artigo 37.º',
              articleRef: 'Artigo 37.º do Decreto Presidencial n.º 152/19'
            }
          ]
        },
        {
          id: 'pna-art-42-48',
          code: 'Artigos 42.º a 48.º',
          title: 'Unidades Centrais e Especialidades Policiais (PIR, PGF, PFA, DIIP, Aviação)',
          legalText: 'Artigo 42.º (Polícia de Intervenção Rápida - PIR): Órgão de reserva do Comandante Geral vocacionado para operações de manutenção e reposição da ordem pública de elevada complexidade, intervenção táctica e inactivação de explosivos.\nArtigo 43.º (Polícia de Guarda Fronteiras - PGF): Segurança e protecção das fronteiras nacionais.\nArtigo 44.º (Polícia Fiscal Aduaneira - PFA): Fiscalização e prevenção de crimes e transgressões fiscais e aduaneiras.\nArtigo 45.º: Polícia de Segurança Pessoal e de Entidades Protocolares.\nArtigo 46.º: Polícia de Segurança de Objectivos Estratégicos (barragens, portos, aeroportos, ferrovia).\nArtigo 47.º (DIIP): Direcção de Investigação de Ilícitos Penais (investigação criminal sob direcção do Magistrado).\nArtigo 48.º: Unidade de Aviação.',
          definition: 'Especialidades centrais operacionais da Polícia Nacional.',
          simpleExplanation: 'Cada unidade central tem um papel vital: PIR é a força de elite/choque de reserva; PGF cuida das fronteiras; PFA combate o contrabando nas alfândegas; DIIP investiga os crimes; e a Unidade de Aviação dá apoio aéreo.',
          importantPoints: [
            'PIR: Força especial tática e inativação de explosivos (reserva direta do Comandante Geral).',
            'PGF: Inviolabilidade e patrulhamento das fronteiras terrestres e fluviais.',
            'DIIP: Investigação de crimes e instrução de processos-crime.',
            'Segurança de Objectivos Estratégicos: Proteção de barragens hidroelétricas, portos, aeroportos e vias férreas.'
          ],
          examAlert: 'COBRADO EM CONCURSOS: A PIR (Polícia de Intervenção Rápida) é o órgão de reserva tática à ordem direta de quem? Resposta: Do Comandante Geral da PNA!',
          questions: [
            {
              id: 'q-pna-art-42-1',
              question: 'A Polícia de Intervenção Rápida (PIR) é um órgão de reserva vocacionado para operações táticas e reposição da ordem pública à ordem direta de quem?',
              options: [
                'Do Administrador Municipal de Luanda.',
                'Do Comandante Geral da PNA.',
                'Do Governador Provincial.',
                'Do Diretor da Alfândega.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 42.º define a PIR como o órgão de reserva sob a ordem direta do Comandante Geral da PNA.',
              examContext: 'Unidades Centrais da PNA'
            },
            {
              id: 'q-pna-art-47-1',
              question: 'Qual é o órgão central da PNA competente para investigar crimes e instruir processos-crime sob direção do Magistrado do Ministério Público?',
              options: [
                'Direcção de Investigação de Ilícitos Penais (DIIP).',
                'Polícia Fiscal Aduaneira.',
                'Direcção de Trânsito e Segurança Rodoviária.',
                'Corpo de Conselheiros.'
              ],
              correctAnswer: 0,
              explanation: 'Conforme o Artigo 47.º, a DIIP é o órgão incumbido de coordenar a investigação criminal e instruir processos-crimes da competência da PNA.',
              examContext: 'Investigação Criminal PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-42-1',
              front: 'Quais as principais atribuições da Polícia de Intervenção Rápida (PIR)?',
              back: 'Manutenção/reposição da ordem de elevada complexidade, intervenção táctica em situações de alto risco, gestão de incidentes críticos e inactivação de explosivos.',
              articleRef: 'Artigo 42.º da PNA'
            }
          ]
        },
        {
          id: 'pna-art-49-50',
          code: 'Artigos 49.º e 50.º',
          title: 'Unidades Territoriais e Níveis de Comando da PNA',
          legalText: 'Artigo 49.º (Comandos Provinciais): Em cada província funciona um Comando Provincial, na dependência exclusiva do Comandante Geral da PNA, dirigido por um Comandante Provincial coadjuvado por dois 2.os Comandantes Provinciais.\nArtigo 50.º (Níveis de Comando): Os Comandos Provinciais compreendem 4 níveis de comando:\na) Comando Provincial;\nb) Comando Municipal e Unidades Provinciais de Especialidade;\nc) Esquadras;\nd) Postos de Polícia.',
          definition: 'Desconcentração territorial e cadeia de comando local da Polícia.',
          simpleExplanation: 'Na vertente territorial, a PNA estrutura-se em Comandos Provinciais (dirigidos por um Comandante Provincial e dois 2.os Comandantes). A hierarquia desce até aos Comandos Municipais, Esquadras e Postos Policiais.',
          importantPoints: [
            'Comando Provincial: Dependência exclusiva do Comandante Geral da PNA.',
            'Coadjuação: Cada Comandante Provincial é coadjuvado por DOIS 2.os Comandantes Provinciais.',
            '4 Níveis de Comando Territorial: Comando Provincial -> Comando Municipal -> Esquadra -> Posto de Polícia.'
          ],
          examAlert: 'RECORRENTE EM PROVA: Quais são os 4 níveis de comando territorial da PNA do maior para o menor? Provincial, Municipal, Esquadras e Postos de Polícia!',
          questions: [
            {
              id: 'q-pna-art-50-1',
              question: 'Qual é a sequência correta dos 4 níveis de comando das Unidades Territoriais da PNA segundo o Artigo 50.º?',
              options: [
                'Comando Geral -> Comando Regional -> Posto -> Esquadra.',
                'Comando Provincial -> Comando Municipal -> Esquadras -> Postos de Polícia.',
                'Esquadra -> Posto de Polícia -> Município -> Província.',
                'Comando Nacional -> Comando Provincial -> Batalhão -> Pelotão.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 50.º fixa rigorosamente os 4 níveis: a) Comando Provincial; b) Comando Municipal; c) Esquadras; d) Postos de Polícia.',
              examContext: 'Organização Territorial PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-50-1',
              front: 'Por quem é dirigido e coadjuvado o Comando Provincial da PNA?',
              back: 'Dirigido por um Comandante Provincial, coadjuvado por DOIS 2.os Comandantes Provinciais (Artigo 49.º).',
              articleRef: 'Artigo 49.º do Decreto Presidencial n.º 152/19'
            }
          ]
        }
      ]
    },
    {
      id: 'pna-cap-4-5',
      title: 'Capítulo IV & V - Regime Estatutário, Pessoal e Direitos',
      articles: [
        {
          id: 'pna-art-51-55',
          code: 'Artigos 51.º a 55.º',
          title: 'Regime Deontológico, Prisional, Patrocínio Judiciário e Dispensa de Serviço',
          legalText: 'Artigo 51.º: O pessoal militarizado da PNA rege-se por um código deontológico próprio e regime disciplinar específico. O pessoal civil rege-se pelo regime da Função Pública.\nArtigo 52.º (Regime Penitenciário): A prisão preventiva e cumprimento de penas do pessoal militarizado em estabelecimentos prisionais comuns efectua-se em REGIME DE SEPARAÇÃO dos restantes detidos civis.\nArtigo 53.º (Patrocínio Judiciário): O pessoal da PNA tem direito a assistência e patrocínio judiciário pago pela PNA por actos praticados em serviço.\nArtigo 55.º: Dispensa de serviço a pedido do agente ou por iniciativa do Comandante Geral como medida disciplinar.',
          definition: 'Direitos, deveres, proteção jurídica e prerrogativas do agente policial.',
          simpleExplanation: 'Se um polícia for preso preventiva ou definitivamente, deve ficar obrigatoriamente separado dos presos civis. Se for processado judicialmente por atos cometidos em serviço, a PNA paga os advogados para a sua defesa.',
          importantPoints: [
            'Separação Prisional: Agentes policiais cumprem pena ou prisão preventiva separados de reclusos civis.',
            'Patrocínio Judiciário Gratuito: A PNA contrata advogados para defender o agente processado por atos de serviço.',
            'Pessoal Civil: Sujeito ao regime geral dos funcionários públicos.'
          ],
          examAlert: 'ATENÇÃO EM EXAME: Um agente da PNA detido preventivamente pode ficar na mesma cela que cidadãos civis? Resposta: NÃO! O Artigo 52.º exige o regime de SEPARAÇÃO!',
          questions: [
            {
              id: 'q-pna-art-52-1',
              question: 'Nos termos do Artigo 52.º do Decreto Presidencial n.º 152/19, como deve ser executada a prisão preventiva de um elemento militarizado da PNA em cadeias comuns?',
              options: [
                'Livremente misturado com os restantes presos civis perigosos.',
                'Em regime obrigatório de separação dos restantes detidos civis.',
                'Em regime de prisão domiciliária sem vigilância.',
                'Apenas no estrangeiro.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 52.º determina expressamente que a prisão preventiva do pessoal militarizado da PNA deve efectuar-se em regime de separação dos restantes detidos ou presos civis.',
              examContext: 'Direitos e Prerrogativas do Agente'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-53-1',
              front: 'O agente da PNA tem direito a advogado pago pela corporação quando responde em tribunal?',
              back: 'Sim! Tem direito a assistência e patrocínio judiciário pago pela PNA para todos os processos por actos praticados em serviço (Artigo 53.º).',
              articleRef: 'Artigo 53.º do Estatuto Orgânico da PNA'
            }
          ]
        },
        {
          id: 'pna-art-56-61',
          code: 'Artigos 56.º a 61.º',
          title: 'Regime de Pessoal: Provimento de Cargos, Serviço Permanente e Identificação (NIP)',
          legalText: 'Artigo 56.º: Para Comandante de Unidade Central, Director Nacional e Comandante Provincial concorrem Oficiais Comissários com curso superior.\nArtigo 57.º (Serviço Permanente): O serviço policial é de carácter permanente e obrigatório. O agente está obrigado a intervir para evitar crimes mesmo fora da sua área de responsabilidade.\nArtigo 60.º (Identificação e NIP): O pessoal militarizado considera-se identificado quando fardado. Quando não fardado, deve exibir o cartão de identificação. Usa obrigatoriamente a placa com o NIP (Número de Identificação Policial).\nArtigo 61.º: A deslocação da residência para o local de trabalho e vice-versa é equiparada a acto de serviço.',
          definition: 'Estatuto de trabalho, disponibilidade permanente e identificação do polícia.',
          simpleExplanation: 'O serviço policial é permanente (24 horas por dia). O acidente ocorrido na deslocação da casa para o trabalho é considerado acidente em serviço. Todo o agente fardado usa a placa visível com o seu NIP.',
          importantPoints: [
            'Requisito para Diretores e Comandantes Provinciais: Ser Oficial Comissário com Curso Superior.',
            'Disponibilidade 24h: Dever de atuar e intervir perante a preparação de crimes mesmo fora de serviço/turno.',
            'NIP: Número de Identificação Policial obrigatório na farda.',
            'Acidente de Trajeto: A deslocação entre a residência e o posto de trabalho é equiparada a serviço.'
          ],
          examAlert: 'COBRADO EM EXAME: O percurso entre a casa do agente e o seu posto de trabalho é considerado em serviço? Resposta: SIM! É equiparado a acto de serviço nos termos do Artigo 61.º!',
          questions: [
            {
              id: 'q-pna-art-61-1',
              question: 'Segundo o Artigo 61.º do Estatuto Orgânico da PNA, como é considerada a deslocação do agente da sua residência para o local de trabalho?',
              options: [
                'Como tempo privado de lazer sem qualquer proteção legal.',
                'Como equiparada para todos os efeitos a efectuada em serviço.',
                'Como falta injustificada se ocorrer fora de hora.',
                'Como atividade privada não relacionada com a corporação.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 61.º estatui claramente que a deslocação do pessoal da PNA da residência para o local de trabalho e vice-versa é considerada para todos os efeitos como efectuada em serviço.',
              examContext: 'Direito do Trabalho Policial'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-60-1',
              front: 'O que significa a sigla NIP exibida na farda do agente da PNA?',
              back: 'Número de Identificação Policial (Artigo 60.º, n.º 3).',
              articleRef: 'Artigo 60.º da PNA'
            },
            {
              id: 'fc-pna-art-57-1',
              front: 'Qual é o caráter do serviço prestado pelo pessoal militarizado da PNA?',
              back: 'Serviço de carácter permanente e obrigatório, não podendo o agente recusar-se a cumprir a missão (Artigo 57.º).',
              articleRef: 'Artigo 57.º do Decreto Presidencial n.º 152/19'
            }
          ]
        },
        {
          id: 'pna-art-62-65',
          code: 'Artigos 62.º a 65.º',
          title: 'Estandarte, Requisição de Forças e Disposições Finais',
          legalText: 'Artigo 62.º: As entidades públicas ou privadas que necessitem de serviços da PNA devem dirigir pedidos aos Comandos Provinciais, Municipais ou Esquadras.\nArtigo 63.º (Estandarte): Têm direito a estandarte próprio: Comando Geral, PIR, PGF, Polícia Fiscal Aduaneira, PSP/Entidades Protocolares, Segurança de Objectivos Estratégicos, Unidade de Aviação, DIIP, Estabelecimentos de Ensino Policial e Comandos Provinciais.\nArtigo 65.º: Os recursos financeiros para suporte do Estatuto são definidos pelo OGE.',
          definition: 'Disposições finais, requisição de policiamento e símbolos institucionais.',
          simpleExplanation: 'As unidades centrais, estabelecimentos de ensino policial, comandos provinciais e o comando geral têm direito ao uso de estandarte próprio.',
          importantPoints: [
            'Estandarte Próprio: Concedido ao Comando Geral, Unidades Centrais (PIR, PGF, PFA, DIIP, etc.), Escolas de Polícia e Comandos Provinciais.',
            'Requisição de Policiamento: Efetuada junto dos Comandos Provinciais, Municipais ou Esquadras.'
          ],
          examAlert: 'RECAPITULAÇÃO FINAL: O Decreto Presidencial n.º 152/19 de 15 de Maio estrutura integralmente a PNA em Angola.',
          questions: [
            {
              id: 'q-pna-art-63-1',
              question: 'Quais das seguintes entidades da PNA têm direito ao uso de estandarte próprio nos termos do Artigo 63.º?',
              options: [
                'Apenas os postos policiais comunitários de bairro.',
                'Comando Geral, PIR, PGF, Polícia Fiscal, DIIP, Estabelecimentos de Ensino e Comandos Provinciais.',
                'Apenas os sindicatos civis do Ministério do Interior.',
                'Nenhuma unidade policial pode ter estandarte.'
              ],
              correctAnswer: 1,
              explanation: 'O Artigo 63.º enumera expressamente as unidades com direito a estandarte próprio, incluindo o Comando Geral, Unidades Centrais, Escolas Policiais e Comandos Provinciais.',
              examContext: 'Símbolos da PNA'
            }
          ],
          flashcards: [
            {
              id: 'fc-pna-art-63-1',
              front: 'Quais unidades territoriais da PNA têm direito a estandarte próprio?',
              back: 'Os Comandos Provinciais (Artigo 63.º, alínea j).',
              articleRef: 'Artigo 63.º'
            }
          ]
        }
      ]
    }
  ]
};
