import { API_URL } from '@/configs/api';
import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';
import { signupFromErrorsInitial } from '@/constants/forms/signup.initial';
import { signupSchemas } from '@/schemas/signup.schema';
import { formatErrors } from '@/utils/formatErrors';
import { extractTranslatedErrors } from '../extractErrors';
import extractServerErrors from '@/utils/extractServerErrors';

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

    const extractedErrors = await extractServerErrors(res, t);
    if (extractedErrors) {
      return extractedErrors;
    }

    return unhandledErrors;
  } catch (e) {
    return unhandledErrors;
  }
};

export { clientValidate, serverValidate };
