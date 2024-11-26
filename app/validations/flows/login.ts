import { z, ZodIssueCode } from 'zod';

const validator = z.object({
  emailaddress: z.string().min(1).email(), // invalid_type, invalid_email, too_small
  password: z.string().min(8), // invalid_type, too_small
});

export type ValidationResult = z.infer<typeof validator>;
export type ValidationErrors = z.inferFlattenedErrors<
  typeof validator,
  { errorCode: ZodIssueCode }
>['fieldErrors'];

interface LoginBaseResponse {
  success: boolean;
}

interface LoginErrorResponse extends LoginBaseResponse {
  success: false;
  errors: ValidationErrors;
}

interface LoginSuccessResponse extends LoginBaseResponse {
  success: true;
  data: ValidationResult;
}

type LoginResponse = LoginErrorResponse | LoginSuccessResponse;

export async function validateLogin(request: Request): Promise<LoginResponse> {
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
