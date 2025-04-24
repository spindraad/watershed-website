declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    SENDGRID_API_KEY: string;
    SESSION_SECRET: string;
    BUCKET_NAME: string;
    BUCKET_KEY_ID: string;
    BUCKET_SECRET_KEY: string;
  }
}
