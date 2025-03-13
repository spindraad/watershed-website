import { useContext, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { ShoelaceContext } from '~/components/shoelace';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { useFetcher } from 'react-router';

export default {
  title: 'Components/Confirm Deletion dialog',
  component: ConfirmDeleteDialog,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} satisfies Meta<typeof ConfirmDeleteDialog>;

type Story = StoryObj<typeof ConfirmDeleteDialog>;

export const Default: Story = {
  render() {
    return <RenderStory />;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/beheer/evenementen/verwijderen/',
        action: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return { ok: true };
        },
      },
    }),
  },
};

function RenderStory() {
  const { SlButton } = useContext(ShoelaceContext);
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  function handleOpenDialog() {
    setOpen(true);
  }

  function handleCloseDialog() {
    setOpen(false);
  }

  function handleDelete() {
    fetcher
      .submit(
        { id: '123' },
        {
          action: '/beheer/evenementen/verwijderen/',
          method: 'DELETE',
        },
      )
      .then(() => {
        console.log('Deleted');
        handleCloseDialog();
      });
  }

  const isDeleting = fetcher.state !== 'idle';

  return (
    <>
      <SlButton onClick={handleOpenDialog}>Open dialog</SlButton>
      <ConfirmDeleteDialog
        open={open}
        onDelete={handleDelete}
        onCancel={handleCloseDialog}
        itemName="item"
        isDeleting={isDeleting}
      ></ConfirmDeleteDialog>
    </>
  );
}
