export default function (plop) {
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
        type: 'input',
        name: 'storybookTitle',
        message: 'What is the title of the Storybook story?',
        default(answers) {
          return answers.name;
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
        type: 'input',
        name: 'storybookTitle',
        message: 'What is the title of the Storybook story?',
        default(answers) {
          return answers.name;
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
          templateFiles: 'scaffold-templates/plop/form/**',
          base: 'scaffold-templates/plop/form',
        },
      ];
    },
  });
}
