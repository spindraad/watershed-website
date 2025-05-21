export default function (plop) {
  const tags = [
    { name: 'Navigation', value: 'navigation' },
    { name: 'Deprecated', value: 'deprecated' },
    { name: 'News', value: 'news' },
    { name: 'Artists', value: 'artists' },
    { name: 'Authentication', value: 'authentication' },
    { name: 'Content', value: 'content' },
    { name: 'Input', value: 'input' },
    { name: 'Shoelace', value: 'shoelace' },
    { name: 'Events', value: 'events' },
    { name: 'Text', value: 'text' },
    { name: 'Localisation', value: 'localisation' },
    { name: 'UI/styling', value: 'ui-styling' },
    { name: 'Misc', value: 'misc' },
    { name: 'Testing', value: 'testing' },
  ];

  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
      {
        type: 'list',
        name: 'path',
        message: 'Where should this component be placed?',
        choices: ['components', 'routes'],
        default: 'components',
      },
      {
        when(answers) {
          return answers.path === 'routes';
        },
        type: 'input',
        name: 'routeFolder',
        message: 'In which route: ',
        suffix: '~/routes/($lang)/',
      },
      {
        type: 'list',
        name: 'category',
        message: 'What type of component is this?',
        choices: [
          { name: 'Atoms', value: 'Atoms' },
          { name: 'Molecules', value: 'Molecules' },
          { name: 'Organisms', value: 'Organisms' },
          { name: 'Templates', value: 'Templates' },
        ],
      },
      {
        type: 'checkbox',
        name: 'tags',
        choices: tags,
      },
      {
        type: 'input',
        name: 'storybookTitle',
        message: 'What is the title of the Storybook story?',
        default(answers) {
          // Split the name by uppercase letters
          return answers.name.split(/(?<![A-Z])(?=[A-Z])/).join(' ');
        },
      },
    ],
    actions(answers) {
      return [
        {
          type: 'addMany',
          destination:
            answers?.path === 'components' ?
              'app/components'
            : `app/routes/($lang)/${answers.routeFolder}`,
          templateFiles: 'scaffold-templates/plop/component/**',
          base: 'scaffold-templates/plop/component',
        },
      ];
    },
  });

  plop.setGenerator('form', {
    description: 'Create a new form',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the form?',
      },
      {
        type: 'input',
        name: 'validation',
        message: 'What is the name of the validation flow?',
      },
      {
        type: 'list',
        name: 'path',
        message: 'Where should this form be placed?',
        choices: ['components', 'routes'],
        default: 'components',
      },
      {
        when(answers) {
          return answers.path === 'routes';
        },
        type: 'input',
        name: 'routeFolder',
        message: 'In which route: ',
        suffix: '~/routes/($lang)/',
      },
      {
        type: 'checkbox',
        name: 'tags',
        choices: tags,
      },
      {
        type: 'input',
        name: 'storybookTitle',
        message: 'What is the title of the Storybook story?',
        default(answers) {
          // Split the name by uppercase letters
          return answers.name.split(/(?<![A-Z])(?=[A-Z])/).join(' ');
        },
      },
    ],
    actions(answers) {
      return [
        {
          type: 'addMany',
          destination:
            answers?.path === 'components' ?
              'app/components'
            : `app/routes/($lang)/${answers.routeFolder}`,
          templateFiles: 'scaffold-templates/plop/form/component/**',
          base: 'scaffold-templates/plop/form/component',
        },
        {
          type: 'addMany',
          destination: 'app/validations/flows',
          templateFiles: 'scaffold-templates/plop/form/validation/**',
          base: 'scaffold-templates/plop/form/validation',
        },
      ];
    },
  });

  plop.setHelper('ifeq', function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
}
