import { type ActionFunctionArgs, redirect } from 'react-router';

import { logout } from '~/.server/session';

export const action = async ({ request }: ActionFunctionArgs) =>
  logout(request);

export const loader = async () => redirect('/');
