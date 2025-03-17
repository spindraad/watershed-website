import { SafeParseError, SafeParseSuccess } from 'zod';

export type ErrorData<Data> = {
  [Prop in keyof Data]: string;
};

export type SuccessValidation<Data> = SafeParseSuccess<Data>;
export type ErrorValidation<Data> = SafeParseError<Data> & {
  data: ErrorData<Data>;
};
export type ErrorResponse<Error, Data> = {
  errors: Error;
  data: ErrorData<Data>;
};
