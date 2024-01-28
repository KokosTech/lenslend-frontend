type FormErrorsProps = {
  errors: string[] | undefined;
  t?: (key: string) => string;
};

const FormErrors = ({ errors, t }: FormErrorsProps) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <p className='flex flex-col items-center justify-center gap-2'>
      {errors.map((error) => (
        <span key={error} className='text-xs text-error-secondary'>
          {t ? t(error) : error}
        </span>
      ))}
    </p>
  );
};
export default FormErrors;
