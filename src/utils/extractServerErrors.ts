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

export type ExtractedServerErrors = {
  errors: {
    [key: string]: string[];
  };
} | null;

const extractServerErrors = async (
  res: Response,
  t?: (key: string) => string,
): Promise<ExtractedServerErrors> => {
  if (res.status === 400) {
    const body = (await res.json()) as ValidationErrorsResponse;

    const serverErrors = body.errors.reduce(
      (acc, { constraints, property }) => ({
        ...acc,
        [property]: Object.keys(constraints).map((key) =>
          t ? t(`errors.server.${key}`) : key,
        ),
      }),
      {},
    );

    return {
      errors: {
        ...serverErrors,
      },
    };
  }

  if (res.status === 409) {
    const body = (await res.json()) as ErrorResponse;

    return {
      errors: {
        [body.message]: [t ? t(`errors.server.${body.code}`) : body.code],
      },
    };
  }

  return null;
};

export default extractServerErrors;
