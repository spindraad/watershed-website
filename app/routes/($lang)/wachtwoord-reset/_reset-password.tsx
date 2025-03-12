import { useTranslation } from 'react-i18next';
import {
  useActionData,
  useSearchParams,
  type ActionFunctionArgs,
  data,
} from 'react-router';
import invariant from 'tiny-invariant';
import { isAfter } from 'date-fns';
import { Prisma } from '@prisma/client';
import Heading from '~/components/Heading';
import ChangePasswordForm from '~/components/ChangePasswordForm';
import {
  validateChangePassword,
  ChangePasswordResponse,
  ValidationErrors,
} from '~/validations/flows/change-password';
import {
  deletePasswordResetSession,
  getPasswordResetSession,
  updatePassword,
} from '~/models/user.server';

type TokenErrorResponse = {
  success: false;
  errors: {
    token: {
      errorCode: string;
    };
  };
};

type ActionData = ChangePasswordResponse | TokenErrorResponse;

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const clonedRequest = request.clone();
    const formData = Object.fromEntries(await clonedRequest.formData());
    const token = formData.token as string | undefined;

    invariant(token, 'Token is required');

    const results = await validateChangePassword(request);

    if (!results.success) {
      return data<ActionData>(
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

      await updatePassword(resetSession.email, results.data.password);

      await deletePasswordResetSession(token);

      return data<ActionData>({
        success: true,
        data: {
          emailaddress: resetSession.email,
          password: '',
          confirmPassword: '',
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return data<ActionData>({
          success: false,
          errors: {
            token: { errorCode: 'MissingToken' },
          },
        });
      }

      return data<ActionData>({
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

  const token = params.get('token');
  const email = params.get('email');

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

  if (!email) {
    return (
      <div className="content space-y-4">
        <Heading level={1}>{t('Title')}</Heading>

        <p>{t('MissingEmail')}</p>
      </div>
    );
  }

  const errors = actionData?.errors as ValidationErrors | undefined;
  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('Title')}</Heading>

      <p>{t('Explanation')}</p>

      <ChangePasswordForm
        action="/wachtwoord-reset"
        emailAddress={email}
        token={token}
        errors={errors}
      />
    </div>
  );
}
