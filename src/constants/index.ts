import * as dotenv from 'dotenv';
dotenv.config();

export const envConstant = {
  PORT: Number(process.env.PORT) || 3000,

  EXTENSION_ID: process.env.EXTENSION_ID,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'm9NBTSZWT1OcNBRY',

  BASE_URL: process.env.BASE_URL || 'http://localhost:3001',

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  GOOGLE_LOGIN_REDIRECT_ENDPOINT:
    process.env.GOOGLE_LOGIN_REDIRECT_ENDPOINT || '/api/v1/auth/callback',

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,

  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
