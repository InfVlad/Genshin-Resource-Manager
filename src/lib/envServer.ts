import { z } from 'zod';
import { zodEnvErrorLogger } from './utils';

const envServerSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  NEXTAUTH_SECRET: z.string().nonempty(),
  DISCORD_CLIENT_ID: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
});

const envServerParseResult = envServerSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
});

export const envServer = zodEnvErrorLogger(envServerParseResult, 'server');

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envServerSchema> {}
  }
}
