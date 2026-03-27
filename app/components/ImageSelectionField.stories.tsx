import type { Meta, StoryObj } from '@storybook/react';
import ImageSelectionField from './ImageSelectionField';
import { fn } from '@storybook/test';

export default {
  title: 'Molecules/Image Selection Field',
  component: ImageSelectionField,
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
  },
  tags: ['components', 'shoelace', 'input', 'media'],
} satisfies Meta<typeof ImageSelectionField>;

type Story = StoryObj<typeof ImageSelectionField>;

export const Default: Story = {
  args: {
    id: 'image',
    name: 'image',
    label: 'Featured Image',
    onChange: fn(),
  },
};

export const WithValue: Story = {
  args: {
    id: 'image',
    name: 'image',
    label: 'Featured Image',
    value: {
      url: 'https://picsum.photos/400/300',
      alt: 'A sample image',
    },
    onChange: fn(),
  },
};

export const WithErrors: Story = {
  args: {
    id: 'image',
    name: 'image',
    label: 'Featured Image',
    errors: {
      url: ['Image is required'],
      alt: ['Alt text is required'],
    },
    onChange: fn(),
  },
};

export const WithFormData: Story = {
  args: {
    id: 'image',
    name: 'featuredImage',
    label: 'Featured Image',
    value: {
      url: 'https://picsum.photos/400/300',
      alt: 'A sample image',
    },
  },

  render: (args) => {
    return (
      <form
        data-testid="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log('Form data:', Object.fromEntries(formData));
        }}
      >
        <ImageSelectionField {...args} />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    );
  },
};
