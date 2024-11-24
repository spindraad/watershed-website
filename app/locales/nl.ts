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
