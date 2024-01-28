import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';

const signupFormInitial: SignupFormState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
};

const signupFromErrorsInitial: SignupFormErrors = {
  email: [],
  username: [],
  password: [],
  confirmPassword: [],
  firstName: [],
  lastName: [],
  dateOfBirth: [],
  phone: [],
  global: [],
};

export { signupFormInitial, signupFromErrorsInitial };
