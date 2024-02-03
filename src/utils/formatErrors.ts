import { SafeParseError } from 'zod';

export const formatErrors = (result: SafeParseError<unknown>) =>
  result.error.format() as unknown as {
    [key: string]: {
      _errors: string[];
    };
  };
