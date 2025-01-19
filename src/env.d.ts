declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      PORT: string;

      MAIL_SERVICE: string;
      MAIL_PORT: string;
      MAIL_HOST: string;
      MAIL_ADMIN_USER: string;
      MAIL_ADMIN_PASS: string;
    }
  }
}

export {}