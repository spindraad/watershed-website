import type { Meta, StoryObj } from '@storybook/react';
import LocalisedRichTextEditor from './LocalisedRichTextEditor';
import { fn, waitFor, within, expect } from '@storybook/test';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Molecules/Localised Rich Text Editor',
  component: LocalisedRichTextEditor,
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
    },
  },
  tags: ['components', 'shoelace', 'input', 'localisation', 'richtext'],
} satisfies Meta<typeof LocalisedRichTextEditor>;

type Story = StoryObj<typeof LocalisedRichTextEditor>;

export const Default: Story = {
  args: {
    id: 'editor',
    name: 'content',
    label: 'Content',
  },
};

export const WithFormData: Story = {
  args: {
    id: 'editor',
    name: 'content',
    label: 'Content with multiple values',
    value: {
      nl: '<p>Dit is de <strong>Nederlandse</strong> inhoud.</p>',
      en: '<p>This is the <strong>English</strong> content.</p>',
      pap: '<p>Esaki ta e <strong>kontenido</strong> na Papiamentu.</p>',
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
        <LocalisedRichTextEditor {...args} />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    );
  },

  play: async ({ canvasElement, step }) => {
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
    await waitFor(() =>
      expect(formData.get('content.nl')).toContain('Nederlandse'),
    );
    await waitFor(() =>
      expect(formData.get('content.en')).toContain('English'),
    );
    await waitFor(() =>
      expect(formData.get('content.pap')).toContain('Papiamentu'),
    );
  },
};

export const WithErrors: Story = {
  args: {
    id: 'editor',
    name: 'content',
    label: 'Content with some errors',
    errors: {
      nl: { _errors: ['Dit veld is verplicht'] },
      pap: { _errors: ['E kampo aki ta obligatorio'] },
    },
  },

  parameters: {
    docs: {
      story: {
        height: '550px',
      },
    },
  },
};

export const WithoutToolbar: Story = {
  args: {
    id: 'editor',
    name: 'content',
    label: 'Simple editor without toolbar',
    showToolbar: false,
    value: {
      nl: '<p>Simpele tekst zonder opmaak.</p>',
      en: '<p>Simple text without formatting.</p>',
      pap: '<p>Teksto simpel sin formato.</p>',
    },
  },
};
