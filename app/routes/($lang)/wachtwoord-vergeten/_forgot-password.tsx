import { useTranslation } from 'react-i18next';
import { type ActionFunctionArgs, data, useActionData } from 'react-router';
import Heading from '~/components/Heading';
import ForgetPasswordFormComponent from './ForgetPasswordFormComponent';
import {
  validateForgetPassword,
  ValidationErrors,
} from '~/validations/flows/forget-password';
import ForgetPasswordConfirmation from './ForgetPasswordConfirmation';
import { createPasswordResetSession } from '~/models/user.server';
import { sendPasswordResetMail } from '~/.server/mail';

type SuccessActionData = {
  success: true;
};

type ErrorActionData = {
  success: false;
  errors: ValidationErrors;
};

type ActionData = SuccessActionData | ErrorActionData;

export const handle = {
  i18n: 'ForgotPasswordRoute',
};
export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const result = await validateForgetPassword(request);

    if (!result.success) {
      return data<ActionData>(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    const passwordResetSession = await createPasswordResetSession(
      result.data.emailaddress,
    );
    await sendPasswordResetMail(
      result.data.emailaddress,
      passwordResetSession.token,
    );

    return data<ActionData>({ success: true });
  } else {
    return new Response(null, { status: 405 });
  }
}

export default function ForgotPasswordRoute() {
  const { t } = useTranslation('ForgotPasswordRoute');
  const actionData = useActionData<typeof action>();

  if (actionData?.success) {
    return (
      <div className="content space-y-4">
        <ForgetPasswordConfirmation />
      </div>
    );
  }

  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('title')}</Heading>

      <ForgetPasswordFormComponent
        action="/wachtwoord-vergeten"
        errors={actionData?.errors}
      />
    </div>
  );
}
