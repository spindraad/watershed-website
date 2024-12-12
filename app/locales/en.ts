import { en as YearSelectorTranslations } from '~/routes/($lang)/nieuws/_index/YearSelector.translations';
export const { YearSelectorComponent } = YearSelectorTranslations;
import { en as ProjectSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ProjectSummary.translations';
export const { ProjectSummary } = ProjectSummaryTranslations;
import { en as EventSummaryTranslations } from '~/routes/($lang)/nieuws/_index/EventSummary.translations';
export const { EventSummary } = EventSummaryTranslations;
import { en as ArtistProfileSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ArtistProfileSummary.translations';
export const { ArtistProfileSummary } = ArtistProfileSummaryTranslations;
import { en as ArtistsSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ArtistsSummary.translations';
export const { ArtistsSummary } = ArtistsSummaryTranslations;

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

export const ResetPasswordRoute = {
  Title: 'Reset password',
  Explanation: 'Enter a new password for your account',
  MissingEmail: 'The email address for resetting the password is missing',
  MissingToken: 'The token for resetting the password is missing',
  ExpiredToken:
    'The token for resetting the password has expired. Request a new password on the login page.',
};

export const ChangePasswordFormComponent = {
  EmailInputLabel: 'Email address',
  PasswordInputLabel: 'Password',
  RepeatPasswordInputLabel: 'Repeat password',
  SubmitButton: 'Submit',
  Errors: {
    password: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
      ['too_large']: 'Password is too long',
    },
    confirmPassword: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
      ['too_large']: 'Password is too long',
      ['passwords_do_not_match']: 'Passwords do not match',
    },
  },
};

export const ResetPasswordConfirmationComponent = {
  Title: 'Password changed',
  ConfirmationMessage: 'Your password has been changed',
};

export const ChangePasswordRoute = {
  Title: 'Change password',
  Explanation: 'Enter a new password for your account',
};

export const NewsOverviewRoute = {
  Title: 'News',
};
