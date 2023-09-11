// import { cookies } from 'next/headers';
import { getUserAuthSession } from '@/server/auth/auth';
import { appRouter } from '../../server/api/root';
import { loggerLink } from '@trpc/client';
import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { experimental_nextCacheLink as nextCacheLink } from '@trpc/next/app-dir/links/nextCache';
import { db } from '../../server/db';
import SuperJSON from 'superjson';

/**
 * This client invokes procedures directly on the server without fetching over HTTP.
 */

export const serverClient = createTRPCNextAppDirServer<typeof appRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (_op) => true,
        }),
        nextCacheLink({
          revalidate: 1,
          router: appRouter,
          async createContext() {
            const session = await getUserAuthSession();
            return {
              session,
              db,
            };
          },
        }),
      ],
    };
  },
});
