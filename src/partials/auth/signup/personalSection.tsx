import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';

import Input from '@/components/common/input';
import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';

const PersonalSection = ({
  handleChange,
  values,
  errors,
}: {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  values: SignupFormState;
  errors: SignupFormErrors;
}) => {
  const t = useTranslations('auth.signup');

  return (
    <>
      <Input
        id='firstName'
        placeholder={t('first_name')}
        type='text'
        name='firstName'
        icon='IconSignature'
        value={values.firstName}
        onChange={handleChange}
        errors={errors.firstName}
        required
      />
      <Input
        id='lastName'
        placeholder={t('last_name')}
        type='text'
        name='lastName'
        icon='IconSignature'
        value={values.lastName}
        onChange={handleChange}
        errors={errors.lastName}
        required
      />
      <Input
        id='dateOfBirth'
        placeholder={t('date_of_birth')}
        type='date'
        name='dateOfBirth'
        icon='IconCalendar'
        value={values.dateOfBirth}
        onChange={handleChange}
        errors={errors.dateOfBirth}
        required
      />
      <Input
        id='phone'
        placeholder={t('phone')}
        type='text'
        name='phone'
        icon='IconPhone'
        value={values.phone}
        onChange={handleChange}
        errors={errors.phone}
        required
      />
    </>
  );
};

export default PersonalSection;
