'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import AccountSection from '@/partials/auth/signup/accountSection';
import PersonalSection from '@/partials/auth/signup/personalSection';
import VerificationSection from '@/partials/auth/signup/verificationSection';
import TosSection from '@/partials/auth/signup/tosSection';

import NextButton from '@/partials/auth/signup/prevNext';
import PrevButton from '@/partials/auth/signup/prev';

import {
  signupFormInitial,
  signupFromErrorsInitial,
} from '@/constants/forms/signup.initial';
import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';

import {
  clientValidate,
  serverValidate,
} from '@/utils/validate/signup.validate';
import { signup } from '@/actions/auth';

const SignupFrom = () => {
  const t = useTranslations('auth.signup');

  const [state, setState] = useState<SignupFormState>(signupFormInitial);
  const [errors, setErrors] = useState<SignupFormErrors>(
    signupFromErrorsInitial,
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupAction = signup.bind(null, state);

  const [formState, formAction] = useFormState(signupAction, {
    messages: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const steps = [
    <AccountSection
      key={0}
      values={state}
      handleChange={handleChange}
      errors={errors}
    />,
    <PersonalSection
      key={1}
      values={state}
      handleChange={handleChange}
      errors={errors}
    />,
    <TosSection key={2} />,
    <VerificationSection key={3} />,
  ];

  const prevStep = () => {
    setErrors((prev) => ({
      ...prev,
      [currentStep]: [],
      global: [],
    }));
    setCurrentStep((prev) => (prev === 0 ? prev : prev - 1));
  };

  const nextStep = async () => {
    if ([0, 1].includes(currentStep)) {
      setIsSubmitting(true);

      const clientErrors = clientValidate(currentStep, state, (key: string) =>
        t(`errors.${key}`),
      );

      if (clientErrors && clientErrors !== true) {
        setErrors(clientErrors);
        setIsSubmitting(false);
        return;
      }

      if ([0, 1].includes(currentStep)) {
        const res = await serverValidate(currentStep, state, t);

        if (res && res !== true) {
          setErrors(res.errors);
          setIsSubmitting(false);
          return;
        }
      }

      setIsSubmitting(false);
      setErrors(signupFromErrorsInitial);
    }

    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
  };

  useEffect(() => {
    if (formState !== true) {
      setErrors({
        ...signupFromErrorsInitial,
        global: formState.messages,
      });
    } else {
      console.log('success');
      setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
    }
  }, [formState]);

  return (
    <form className='flex flex-col gap-4 font-semibold' action={formAction}>
      {steps[currentStep]}
      {/* <FormErrors errors={errors.global} t={t} />*/}
      <div className='flex items-center justify-center gap-4'>
        <PrevButton
          currentStep={currentStep}
          max={steps.length}
          onPrev={prevStep}
        />
        <NextButton
          currentStep={currentStep}
          max={steps.length}
          submitting={isSubmitting}
          onNext={nextStep}
        />
      </div>
    </form>
  );
};

export default SignupFrom;
