interface ErrorObject {
  _errors?: string[];

  [key: string]: ErrorObject | string[] | undefined;
}

type ExtractedErrors = {
  [key: string]: string[] | ExtractedErrors;
};

export const extractErrors = (errors: ErrorObject): ExtractedErrors =>
  Object.keys(errors).reduce<ExtractedErrors>((acc, key) => {
    const errorEntry = errors[key];

    if (key !== '_errors' && errorEntry) {
      if (
        '_errors' in errorEntry &&
        Array.isArray(errorEntry._errors) &&
        errorEntry._errors.length > 0
      ) {
        if (errorEntry._errors.length > 0) {
          acc[key] = errorEntry._errors;
        }
      } else {
        const subErrors = extractErrors(errorEntry as ErrorObject);
        if (Object.keys(subErrors).length > 0) {
          acc[key] = subErrors;
        }
      }
    } else if (key === '_errors' && Array.isArray(errorEntry)) {
      acc['root'] = errorEntry;
    }
    return acc;
  }, {});

export const extractTranslatedErrors = (
  formattedErrors: ErrorObject,
  t: (key: string) => string,
): ExtractedErrors => {
  const errors = extractErrors(formattedErrors);
  return translateErrors(errors, t);
};

export const translateErrors = (
  errors: ExtractedErrors,
  t: (key: string) => string,
) => {
  const translatedErrors: ExtractedErrors = {};

  Object.keys(errors).forEach((key) => {
    const currentError = errors[key];
    if (Array.isArray(currentError)) {
      translatedErrors[key] = currentError.map((error: string) => t(error));
    } else {
      translatedErrors[key] = translateErrors(currentError, t);
    }
  });

  return translatedErrors;
};
