type FormErrorsProps = {
  errors: string[] | undefined;
  t?: (key: string) => string;
};

const FormErrors = ({ errors, t }: FormErrorsProps) => {
  if (!errors || errors.length === 0 || Array.isArray(errors) === false) {
    return null;
  }

  const errorsToDisplay = new Set(errors);

  return (
    <p className='flex flex-col items-center justify-center gap-2'>
      {Array.from(errorsToDisplay).map((error) => (
        <span key={error} className='text-xs text-error-secondary'>
          {t ? t(error) : error}
        </span>
      ))}
    </p>
  );
};
export default FormErrors;
