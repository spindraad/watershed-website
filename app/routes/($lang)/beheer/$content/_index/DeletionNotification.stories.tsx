import type { Meta, StoryObj } from '@storybook/react';
import DeletionNotification from './DeletionNotification';
import { useContext, useRef } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { SlAlert } from '@shoelace-style/shoelace';

export default {
  title: 'Molecules/Deletion notification',
  component: DeletionNotification,
  tags: ['route-components', 'content', 'shoelace'],
} satisfies Meta<typeof DeletionNotification>;

type Story = StoryObj<typeof DeletionNotification>;

export const Default: Story = {
  render() {
    return <RenderStory />;
  },
};

function RenderStory() {
  const { SlButton } = useContext(ShoelaceContext);
  const notifyRef = useRef<SlAlert>(null);

  function showNotification() {
    notifyRef.current?.toast();
  }

  function handleNotifyClose() {
    notifyRef.current?.hide();
  }

  return (
    <>
      <SlButton onClick={showNotification}>Trigger notification</SlButton>
      <DeletionNotification
        ref={notifyRef}
        itemName="Poetry event"
        onClose={handleNotifyClose}
      />
    </>
  );
}
