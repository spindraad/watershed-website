import type { Meta, StoryObj } from '@storybook/react';
import ContentSelectionField from './ContentSelectionField';
import { fn } from '@storybook/test';

type SampleItem = {
  id: string;
  title: { nl: string; en: string };
  category: string;
};

const sampleLibrary: SampleItem[] = [
  { id: '1', title: { nl: 'Item Eén', en: 'Item One' }, category: 'A' },
  { id: '2', title: { nl: 'Item Twee', en: 'Item Two' }, category: 'B' },
  { id: '3', title: { nl: 'Item Drie', en: 'Item Three' }, category: 'A' },
  { id: '4', title: { nl: 'Item Vier', en: 'Item Four' }, category: 'C' },
  { id: '5', title: { nl: 'Item Vijf', en: 'Item Five' }, category: 'B' },
];

export default {
  title: 'Molecules/Content Selection Field',
  component: ContentSelectionField,
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
  tags: ['components', 'shoelace', 'input', 'selection'],
} satisfies Meta<typeof ContentSelectionField<SampleItem>>;

type Story = StoryObj<typeof ContentSelectionField<SampleItem>>;

export const Default: Story = {
  args: {
    id: 'content',
    name: 'selectedItems',
    label: 'Related Items',
    contentLibrary: sampleLibrary,
    selectedIds: [],
    displayField: 'title',
    searchFields: ['title', 'category'],
    multiSelect: true,
    onChange: fn(),
  },
};

export const WithSelectedItems: Story = {
  args: {
    id: 'content',
    name: 'selectedItems',
    label: 'Related Items',
    contentLibrary: sampleLibrary,
    selectedIds: ['1', '3'],
    displayField: 'title',
    searchFields: ['title', 'category'],
    multiSelect: true,
    onChange: fn(),
  },
};

export const SingleSelect: Story = {
  args: {
    id: 'content',
    name: 'category',
    label: 'Category',
    contentLibrary: sampleLibrary,
    selectedIds: ['2'],
    displayField: 'title',
    multiSelect: false,
    onChange: fn(),
  },
};

export const WithFormData: Story = {
  args: {
    id: 'content',
    name: 'relatedItems',
    label: 'Related Items',
    contentLibrary: sampleLibrary,
    selectedIds: ['1', '2'],
    displayField: 'title',
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
        <ContentSelectionField {...args} />
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
