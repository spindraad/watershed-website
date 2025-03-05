import { ComponentConfig } from '@measured/puck';
import { SlButton } from '@shoelace-style/shoelace/dist/shoelace.js';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

export type ButtonBlockProps = {
  primary?: SlButton['variant'];
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  label: 'Button',
  fields: {
    primary: {
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
    primary: 'primary',
  },
  render: (props) => {
    return <ButtonBlockComponent {...props} />;
  },
};

// Create a function component that can be used to invoke the ShoelaceContext
function ButtonBlockComponent({ primary }: ButtonBlockProps) {
  const { SlButton } = useContext(ShoelaceContext);

  const variant: SlButton['variant'] = primary ? 'primary' : 'default';

  return <SlButton variant={variant}>Click me</SlButton>;
}
