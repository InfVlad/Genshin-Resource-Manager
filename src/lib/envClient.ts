import { z } from 'zod';
import { zodEnvErrorLogger } from './utils';
const envClientSchema = z.object({
  NEXT_PUBLIC_DATABASE_URL: z.string().nonempty(),
});

const envClientParseResult = envClientSchema.safeParse({
  NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export const envClient = zodEnvErrorLogger(envClientParseResult, 'client');

/**
 * This declaration allows to have typesafe autocomplete when using process.env
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envClientSchema> {}
  }
}
