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
        //         {
        //           type: 'modify',
        //           path: 'app/locales/en.ts',
        //           pattern: `
        // import { en } from '${answers.routeFolder}';
        // export const { ${answers.name} } = en;
        //           `,
        //         },
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
}
