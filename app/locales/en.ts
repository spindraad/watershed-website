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
