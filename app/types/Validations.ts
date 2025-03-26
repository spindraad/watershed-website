import { SafeParseError, SafeParseSuccess } from 'zod';
import { LocalisedValue } from '~/types/Content';

export type Data<Payload> = {
  [Prop in keyof Payload]: Payload[Prop] extends LocalisedValue ? LocalisedValue
  : Payload[Prop];
};

export type SuccessValidation<Payload> = SafeParseSuccess<Payload>;
export type ErrorValidation<Payload> = SafeParseError<Payload> & {
  data: Data<Payload>;
};
export type ErrorResponse<Error, Payload> = {
  errors: Error;
  data: Data<Payload>;
};
