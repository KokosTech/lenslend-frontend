type SignupFormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
};

type SignupFormErrors = {
  email: string[];
  username: string[];
  password: string[];
  confirmPassword: string[];
  firstName: string[];
  lastName: string[];
  dateOfBirth: string[];
  phone: string[];
  global: string[];
};

export type { SignupFormState, SignupFormErrors };
