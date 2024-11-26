import { z, ZodIssueCode } from 'zod';

const validator = z.object({
  emailaddress: z.string().min(1).email(), // invalid_type, invalid_email, too_small
});

export type ValidationResult = z.infer<typeof validator>;
export type ValidationErrors = z.inferFlattenedErrors<
  typeof validator,
  { errorCode: ZodIssueCode }
>['fieldErrors'];

interface ForgetPasswordBaseResponse {
  success: boolean;
}

interface ForgetPasswordErrorResponse extends ForgetPasswordBaseResponse {
  success: false;
  errors: ValidationErrors;
}

interface ForgetPasswordSuccessResponse extends ForgetPasswordBaseResponse {
  success: true;
  data: ValidationResult;
}

type ForgetPasswordResponse =
  | ForgetPasswordErrorResponse
  | ForgetPasswordSuccessResponse;

export async function validateForgetPassword(
  request: Request,
): Promise<ForgetPasswordResponse> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());

  const result = validator.safeParse(formData);

  if (!result.success) {
    const errors = result.error.flatten((issue) => ({
      errorCode: issue.code,
    })).fieldErrors;

    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
