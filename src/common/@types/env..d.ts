declare namespace NodeJS {
  interface ProcessEnv {
    // Server configuration
    APP_PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';

    // Database configuration
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;
    // Redis
    REDIS_PORT: number;
    REDIS_HOST: string;
  }
}
