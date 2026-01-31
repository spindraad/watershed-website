import { z, ZodIssueCode } from 'zod';

const validator = z
  .object({
    emailaddress: z.string().min(1).email(), // invalid_email, too_small
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

interface ChangePasswordBaseResponse {
  success: boolean;
}

export interface ChangePasswordErrorResponse extends ChangePasswordBaseResponse {
  success: false;
  errors: ValidationErrors;
}

export interface ChangePasswordSuccessResponse extends ChangePasswordBaseResponse {
  success: true;
  data: ValidationResult;
}

export type ChangePasswordResponse =
  | ChangePasswordErrorResponse
  | ChangePasswordSuccessResponse;

export async function validateChangePassword(
  request: Request,
): Promise<ChangePasswordResponse> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());
  const payload = {
    emailaddress: formData.emailaddress,
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
