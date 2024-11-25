export const common = {
  title: 'Hallo Wereld!',
  login: 'Inloggen',
  logout: 'Uitloggen',
};

export const login = {
  title: 'Inloggen',
  username: 'Gebruikersnaam',
  password: 'Wachtwoord',
};

export const LoginFormComponent = {
  login: 'Inloggen',
  forgotPassword: 'Wachtwoord vergeten?',
  Email: 'E-mailadres',
  Password: 'Wachtwoord',
  RememberMe: 'Onthoud mij',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
    password: {
      ['invalid_type']: 'Ongeldig wachtwoord',
      ['too_small']: 'Wachtwoord is te kort',
    },
    userNotFound: {
      ['invalid_credentials']: 'Ongeldige inloggegevens',
    },
  },
};

export const ForgotPasswordRoute = {
  title: 'Wachtwoord vergeten',
  Email: 'E-mailadres',
  Submit: 'Verzenden',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
  },
};

export const ForgotPasswordFormComponent = {
  Explanation:
    'Ben je je wachtwoord vergeten? Vul je e-mailadres in en we sturen je een e-mail met instructies om je wachtwoord opnieuw in te stellen.',
  EmailInputLabel: 'E-mailadres',
  SubmitButton: 'Verzenden',
  Errors: {
    emailaddress: {
      ['invalid_string']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
  },
};

export const ForgetPasswordConfirmationComponent = {
  Title: 'Wachtwoord reset e-mail verzonden',
  ConfirmationMessage:
    'Er is een e-mail naar je e-mailadres gestuurd met instructies om je wachtwoord opnieuw in te stellen',
};
