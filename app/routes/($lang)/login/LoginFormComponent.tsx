import { useContext } from 'react';
import { Form } from '@remix-run/react';
import { SlButton, SlIcon } from '@shoelace-style/shoelace/dist/react';
import { ShoelaceContext } from '~/components/shoelace';

export default function LoginFormComponent() {
  const { SlInput } = useContext(ShoelaceContext);

  return (
    <Form>
      <SlIcon name="info-circle"></SlIcon>
      <SlInput name="email" type="email" label="Email address" required />
      <SlInput
        name="password"
        type="password"
        label="Password"
        required
        passwordToggle
      />
      <SlButton type="submit">Login</SlButton>
    </Form>
  );
}
