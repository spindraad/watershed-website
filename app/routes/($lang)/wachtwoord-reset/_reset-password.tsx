import { useTranslation } from 'react-i18next';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData, useSearchParams } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { isAfter } from 'date-fns';
import { Prisma } from '@prisma/client';
import Heading from '~/components/Heading';
import ResetPasswordForm from './ResetPasswordForm';
import {
  validateResetPassword,
  ResetPasswordResponse,
  ValidationErrors,
} from '~/validations/flows/reset-password';
import { getPasswordResetSession, updatePassword } from '~/models/user.server';

type TokenErrorResponse = {
  success: false;
  errors: {
    token: {
      errorCode: string;
    };
  };
};

type ActionData = ResetPasswordResponse | TokenErrorResponse;

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const clonedRequest = request.clone();
    const formData = Object.fromEntries(await clonedRequest.formData());
    const token = formData.token as string | undefined;
    console.log(formData);

    invariant(token, 'Token is required');

    const results = await validateResetPassword(request);

    if (!results.success) {
      return json<ActionData>(
        {
          success: false,
          errors: results.errors,
        },
        { status: 400 },
      );
    }

    try {
      const resetSession = await getPasswordResetSession(token);
      const { expiresAt } = resetSession;

      if (isAfter(new Date(), expiresAt)) {
        throw new Error('Expired token');
      }

      await updatePassword(
        resetSession.email,
        results.data.password,
        resetSession.token,
      );

      return json<ActionData>({
        success: true,
        data: {
          password: 'password',
          confirmPassword: 'password',
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return json<ActionData>({
          success: false,
          errors: {
            token: { errorCode: 'MissingToken' },
          },
        });
      }

      return json<ActionData>({
        success: false,
        errors: {
          token: { errorCode: 'ExpiredToken' },
        },
      });
    }
  } else {
    return new Response(null, { status: 405 });
  }
}

export default function ResetPasswordRoute() {
  const [params] = useSearchParams();
  const { t } = useTranslation('ResetPasswordRoute');
  const actionData = useActionData<ActionData>();
  console.log({ actionData });

  const token = params.get('token');

  if (actionData) {
    if (actionData.success) {
      return (
        <div className="content space-y-4">
          <Heading level={1}>{t('Title')}</Heading>

          <p>{t('Success')}</p>
        </div>
      );
    }

    const { errors } = actionData as TokenErrorResponse;

    if (errors.token) {
      return (
        <div className="content space-y-4">
          <Heading level={1}>{t('Title')}</Heading>

          <p>{errors.token.errorCode}</p>
        </div>
      );
    }
  }

  if (!token) {
    return (
      <div className="content space-y-4">
        <Heading level={1}>{t('Title')}</Heading>

        <p>{t('MissingToken')}</p>
      </div>
    );
  }

  const errors = actionData?.errors as ValidationErrors | undefined;
  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('Title')}</Heading>

      <p>{t('Explanation')}</p>

      <ResetPasswordForm
        action="/wachtwoord-reset"
        token={token}
        errors={errors}
      />
    </div>
  );
}
