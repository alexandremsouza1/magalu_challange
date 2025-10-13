module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum - tipos permitidos de commit
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação, ponto e vírgula, etc
        'refactor', // Refatoração de código
        'perf',     // Melhoria de performance
        'test',     // Adição ou correção de testes
        'build',    // Mudanças no sistema de build
        'ci',       // Mudanças em CI/CD
        'chore',    // Outras mudanças (configs, etc)
        'revert',   // Reverter commit anterior
      ],
    ],
    
    // Type sempre obrigatório
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    
    // Scope opcional mas quando usado deve ser lowercase
    'scope-case': [2, 'always', 'lower-case'],
    
    // Subject (descrição) obrigatório
    'subject-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-full-stop': [2, 'never', '.'],
    'subject-min-length': [2, 'always', 3],
    'subject-max-length': [2, 'always', 100],
    
    // Header (type + scope + subject) não pode ser muito longo
    'header-max-length': [2, 'always', 100],
    
    // Body e footer opcionais
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
  
  // Configuração customizada para monorepo (opcional)
  prompt: {
    messages: {
      type: 'Selecione o tipo de mudança que você está commitando:',
      scope: 'Qual é o escopo desta mudança (opcional):',
      subject: 'Escreva uma descrição curta e imperativa da mudança:\n',
      body: 'Forneça uma descrição mais detalhada da mudança (opcional):\n',
      breaking: 'Liste as BREAKING CHANGES (opcional):\n',
      footer: 'Liste os issues fechados por esta mudança (opcional). Ex: #31, #34:\n',
      confirmCommit: 'Você tem certeza que deseja proceder com o commit acima?',
    },
    questions: {
      type: {
        description: 'Tipo do commit',
        enum: {
          feat: {
            description: 'Uma nova funcionalidade',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Uma correção de bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Mudanças apenas na documentação',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Mudanças que não afetam o significado do código (espaços, formatação, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Uma mudança de código que não corrige bug nem adiciona funcionalidade',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Uma mudança de código que melhora a performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adição de testes faltando ou correção de testes existentes',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Mudanças que afetam o sistema de build ou dependências externas',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Mudanças em arquivos e scripts de configuração de CI',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: 'Outras mudanças que não modificam src ou arquivos de teste',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverte um commit anterior',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'Qual é o escopo desta mudança (frontend, backend, api, etc)',
      },
    },
  },
};