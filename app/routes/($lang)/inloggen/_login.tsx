import type { Route } from './+types/_login';
import { useActionData, data, redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import LoginFormComponent from './LoginFormComponent';
import Heading from '~/components/Heading';
import { validateLogin, ValidationErrors } from '~/validations/flows/login';
import { isUserPasswordActive, verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/.server/session';
import i18nServer from '~/modules/i18n.server';

export const handle = {
  i18n: ['LoginRoute', 'LoginFormComponent'],
};

type ActionData = ValidationErrors & {
  userNotFound?: string;
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'LoginRoute');

  return {
    metaTranslations: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
    },
  };
}

export async function action({ request }: Route.ActionArgs) {
  const results = await validateLogin(request);

  if (!results.success) {
    return data<ActionData>(results.errors, { status: 400 });
  }

  const formData = await request.formData();
  const redirectTo = (formData.get('redirectTo') as string | null) ?? '/';
  const remember = formData.get('remember') === 'on';
  const { emailaddress, password } = results.data;

  const passwordIsActive = await isUserPasswordActive(emailaddress);

  if (!passwordIsActive) {
    return redirect(
      `/wachtwoord-veranderen?email=${encodeURIComponent(emailaddress)}`,
    );
  }

  const user = await verifyLogin(emailaddress, password);

  if (!user) {
    return data<ActionData>(
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

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data.metaTranslations.title,
    },
    {
      name: 'description',
      content: data.metaTranslations.description,
    },
  ];
};

export default function LoginRoute() {
  const { t } = useTranslation('LoginRoute');
  const actionData = useActionData<ActionData>();

  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('Title')}</Heading>

      <div className="w-full max-w-lg">
        <LoginFormComponent action="/inloggen" errors={actionData} />
      </div>
    </div>
  );
}
