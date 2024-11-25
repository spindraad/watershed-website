export const common = {
  title: 'Hello World!',
  login: 'Login',
  logout: 'Logout',
};

export const login = {
  title: 'Login',
  username: 'Username',
  password: 'Password',
};

export const LoginFormComponent = {
  login: 'Login',
  forgotPassword: 'Forgot password?',
  Email: 'Email address',
  Password: 'Password',
  RememberMe: 'Remember me',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
    password: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
    },
    userNotFound: {
      ['invalid_credentials']: 'Invalid credentials',
    },
  },
};

export const ForgotPasswordRoute = {
  title: 'Forgot password',
  Email: 'Email address',
  Submit: 'Submit',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
  },
};

export const ForgotPasswordFormComponent = {
  Explanation:
    'Forgot your password? Enter your email address and we will send you an email with instructions to reset your password',
  EmailInputLabel: 'Email address',
  SubmitButton: 'Submit',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
  },
};

export const ForgetPasswordConfirmationComponent = {
  Title: 'Password reset email sent',
  ConfirmationMessage:
    'An email has been sent to your email address with instructions to reset your password',
};
