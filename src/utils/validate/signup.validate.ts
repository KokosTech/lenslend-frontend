import { API_URL } from '@/configs/api';
import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';
import { signupFromErrorsInitial } from '@/constants/forms/signup.initial';
import { signupSchemas } from '@/schemas/signup.schema';
import { formatErrors } from '@/utils/formatErrors';
import { extractTranslatedErrors } from '../extractErrors';

type ValidationError = {
  constraints: {
    [key: string]: string;
  };
  property: string;
};

type ValidationErrorsResponse = {
  errors: ValidationError[];
};

type ErrorResponse = {
  code: string;
  message: string; // field in this case
};

const unhandledErrors = {
  errors: {
    ...signupFromErrorsInitial,
    global: ['something went wrong'],
  },
};

const clientValidate = (
  step: number,
  data: SignupFormState,
  t: (key: string) => string,
): SignupFormErrors | boolean => {
  const result = signupSchemas[step].safeParse(data);

  if (!result.success) {
    const formatted = formatErrors(result);
    const newErrors: Partial<SignupFormErrors> = extractTranslatedErrors(
      formatted,
      t,
    );

    return {
      ...signupFromErrorsInitial,
      ...newErrors,
    };
  }

  return true;
};

const serverValidate = async (
  step: number,
  data: Partial<SignupFormState>,
  t: (key: string) => string,
) => {
  try {
    const res = await fetch(
      `${API_URL}/auth/validate/${step ? 'personal' : 'account'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (res.ok) {
      return true;
    }

    if (res.status === 400) {
      const body = (await res.json()) as ValidationErrorsResponse;

      const serverErrors = body.errors.reduce(
        (acc, { constraints, property }) => ({
          ...acc,
          [property]: Object.keys(constraints).map((key) =>
            t(`errors.server.${key}`),
          ),
        }),
        {},
      );

      return {
        errors: {
          ...signupFromErrorsInitial,
          ...serverErrors,
        },
      };
    }

    if (res.status === 409) {
      const body = (await res.json()) as ErrorResponse;

      return {
        errors: {
          ...signupFromErrorsInitial,
          [body.message]: [t(`errors.server.${body.code}`)],
        },
      };
    }

    return unhandledErrors;
  } catch (e) {
    return unhandledErrors;
  }
};

export { clientValidate, serverValidate };
