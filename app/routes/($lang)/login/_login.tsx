import { ActionFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import LoginFormComponent from './LoginFormComponent';
import Heading from '~/components/Heading';
import { validateLogin, ValidationErrors } from '~/validations/flows/login';
import { verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/.server/session';
import { useActionData } from '@remix-run/react';

type ActionData = ValidationErrors & {
  userNotFound?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const results = await validateLogin(request);

  if (!results.success) {
    return json<ActionData>(results.errors, { status: 400 });
  }

  const formData = await request.formData();
  const redirectTo = (formData.get('redirectTo') as string | null) ?? '/';
  const remember = formData.get('remember') === 'on';
  const { emailaddress, password } = results.data;

  const user = await verifyLogin(emailaddress, password);

  if (!user) {
    return json<ActionData>(
      {
        userNotFound: 'invalid_credentials',
      },
      { status: 400 },
    );
  }

  return createUserSession({
    redirectTo,
    remember,
    request,
    userId: user.id,
  });
}

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Login',
      description: 'Login to your account',
    },
  ];
};

export default function LoginRoute() {
  const { t } = useTranslation('login');
  const actionData = useActionData<ActionData>();
  console.log(actionData);

  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('title')}</Heading>

      <div className="w-full max-w-lg">
        <LoginFormComponent action="/login" errors={actionData} />
      </div>
    </div>
  );
}
