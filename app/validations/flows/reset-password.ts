import { z, ZodIssueCode } from 'zod';

const validator = z
  .object({
    password: z.string().min(8), // too_small
    confirmPassword: z.string().min(8), // too_small
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwords_do_not_match',
  });

export type ValidationResult = z.infer<typeof validator>;
export type ValidationErrors = z.inferFlattenedErrors<
  typeof validator,
  { errorCode: ZodIssueCode; message?: string }
>['fieldErrors'];

interface ResetPasswordBaseResponse {
  success: boolean;
}

interface ResetPasswordErrorResponse extends ResetPasswordBaseResponse {
  success: false;
  errors: ValidationErrors;
}

interface ResetPasswordSuccessResponse extends ResetPasswordBaseResponse {
  success: true;
  data: ValidationResult;
}

export type ResetPasswordResponse =
  | ResetPasswordErrorResponse
  | ResetPasswordSuccessResponse;

export async function validateResetPassword(
  request: Request,
): Promise<ResetPasswordResponse> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());
  const payload = {
    password: formData['new-password'],
    confirmPassword: formData['new-password-confirm'],
  };

  const result = validator.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten((issue) => {
      const result: { errorCode: ZodIssueCode; message?: string } = {
        errorCode: issue.code,
      };

      if (issue.code === 'custom') {
        result.message = issue.message;
      }

      return result;
    }).fieldErrors;

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
