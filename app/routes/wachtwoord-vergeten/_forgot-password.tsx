import { useTranslation } from 'react-i18next';
import { ActionFunctionArgs, json } from '@remix-run/node';
import Heading from '~/components/Heading';
import ForgetPasswordFormComponent from '~/routes/wachtwoord-vergeten/ForgetPasswordFormComponent';
import {
  validateForgetPassword,
  ValidationErrors,
} from '~/validations/flows/forget-password';
import { useActionData } from '@remix-run/react';
import ForgetPasswordConfirmation from '~/routes/wachtwoord-vergeten/ForgetPasswordConfirmation';

type SuccessActionData = {
  success: true;
};

type ErrorActionData = {
  success: false;
  errors: ValidationErrors;
};

type ActionData = SuccessActionData | ErrorActionData;

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const result = await validateForgetPassword(request);

    if (!result.success) {
      return json<ActionData>(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    return json<ActionData>({ success: true });
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
