import type { Meta, StoryObj } from '@storybook/react';
import LocalisedInput from './LocalisedInput';
import { fn, waitFor, within, expect } from '@storybook/test';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Localised Input',
  component: LocalisedInput,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      story: {
        height: '250px',
      },
    },
  },
} satisfies Meta<typeof LocalisedInput>;

type Story = StoryObj<typeof LocalisedInput>;

export const Default: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input',
  },
};

export const WithFormData: Story = {
  args: {
    id: 'input',
    name: 'input',
    label: 'This is a simple text input with multiple values',
    value: {
      nl: 'Dit is de Nederlandse waarde',
      en: 'This is the English value',
      pap: 'Esaki ta e balor na Papiamentu',
    },
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
        action: async ({ request }) => {
          const formData = await request.formData();
          const values = Object.fromEntries(formData);

          console.log(values);

          return values;
        },
      },
    }),
  },

  render: (args) => {
    return (
      <form data-testid="form">
        <LocalisedInput {...args} />
        <button type="submit">Submit</button>
      </form>
    );
  },

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    const form = canvas.getByTestId('form') as HTMLFormElement;
    let formData: FormData;
    const submitHandler = fn();

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      formData = new FormData(form);
      submitHandler();
    });

    await step('Submit the form', async () => {
      form.requestSubmit();
    });

    await waitFor(() => expect(submitHandler).toHaveBeenCalled());
    await waitFor(() => expect(formData).toBeDefined());
    await waitFor(() => expect(formData.get('input.nl')).toBe(args.value?.nl));
    await waitFor(() => expect(formData.get('input.en')).toBe(args.value?.en));
    await waitFor(() =>
      expect(formData.get('input.pap')).toBe(args.value?.pap),
    );
  },
};

export const WithErrors: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input with some errors',
    errors: {
      nl: { _errors: ['Dit is een foutmelding'] },
      pap: { _errors: ['Esaki ta un mensahe di error'] },
    },
  },

  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
  },
};
