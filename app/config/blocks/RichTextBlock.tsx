import { ComponentConfig } from '@measured/puck';
import RichEditor from '~/components/RichEditor';

export type RichTextBlockProps = {
  state: any;
};

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  fields: {
    state: {
      type: 'custom',
      render: () => <></>,
    },
  },
  render({ puck, ...props }) {
    return <RichEditor isEditable={puck.isEditing} {...props} />;
  },
};
