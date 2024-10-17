declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    SENDGRID_API_KEY: string;
  }
}
