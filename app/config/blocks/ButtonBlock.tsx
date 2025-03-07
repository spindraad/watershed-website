import { ComponentConfig } from '@measured/puck';
import { SlButton } from '@shoelace-style/shoelace/dist/shoelace.js';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

export type ButtonBlockProps = {
  variant?: SlButton['variant'];
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  label: 'Button',
  fields: {
    variant: {
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Neutral', value: 'neutral' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
        { label: 'Text', value: 'text' },
      ],
    },
  },
  defaultProps: {
    variant: 'primary',
  },
  render: (props) => {
    return <ButtonBlockComponent {...props} />;
  },
};

// Create a function component that can be used to invoke the ShoelaceContext
function ButtonBlockComponent({ variant }: ButtonBlockProps) {
  const { SlButton } = useContext(ShoelaceContext);

  return <SlButton variant={variant}>Click me</SlButton>;
}
