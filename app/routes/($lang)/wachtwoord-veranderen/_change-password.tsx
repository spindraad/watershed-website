import { useTranslation } from 'react-i18next';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData, useSearchParams } from '@remix-run/react';
import Heading from '~/components/Heading';
import ChangePasswordForm from '~/components/ChangePasswordForm';
import {
  validateChangePassword,
  ChangePasswordResponse,
  ChangePasswordErrorResponse,
} from '~/validations/flows/change-password';
import { changeUserPasswordType, updatePassword } from '~/models/user.server';
import { createUserSession } from '~/.server/session';
import { getErrorMessage } from '~/utils/errors';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const result = await validateChangePassword(request);

    if (!result.success) {
      return json<ChangePasswordResponse>(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    try {
      const user = await updatePassword(
        result.data.emailaddress,
        result.data.password,
      );

      await changeUserPasswordType(result.data.emailaddress, 'ACTIVE');

      return createUserSession({
        redirectTo: '/account',
        remember: false,
        request,
        userId: user.id,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error('Error changing password:', message);

      return json<ChangePasswordErrorResponse>(
        {
          success: false,
          errors: {
            password: [{ errorCode: 'custom', message: 'unknown_error' }],
          },
        },
        { status: 500 },
      );
    }
  } else {
    return new Response(null, { status: 405 });
  }
}

export default function ChangePasswordRoute() {
  const [params] = useSearchParams();
  const { t } = useTranslation('ChangePasswordRoute');
  const actionData = useActionData<ChangePasswordErrorResponse>();

  const emailAddress = params.get('email') ?? '';
  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('Title')}</Heading>

      <p>{t('Explanation')}</p>

      <ChangePasswordForm
        action="/wachtwoord-veranderen"
        emailAddress={emailAddress}
        errors={actionData?.errors}
      />
    </div>
  );
}
