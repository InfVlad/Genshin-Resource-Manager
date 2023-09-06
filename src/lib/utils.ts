import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { z } from 'zod';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}

/**
 * In case of a missing environment variable in the .env, it outputs a more readable the error message.
 * Otherwise it returns the parsed data
 */
export const zodEnvErrorLogger = <T>(
  envParseResult: z.SafeParseReturnType<T, T>,
  envType: 'server' | 'client',
) => {
  if (!envParseResult.success && 'error' in envParseResult) {
    const { fieldErrors } = envParseResult?.error.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${(errors as string[]).join(', ')}` : field,
      )
      .join('\n  ');
    console.error(envParseResult.error.issues);
    throw new Error(
      `There is an error with the ${envType} environment variables\n Missing environment variables:\n  ${errorMessage}`,
    );
  } else {
    return envParseResult.data;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
