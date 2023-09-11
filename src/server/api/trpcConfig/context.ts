import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { inferAsyncReturnType } from '@trpc/server';
import { getUserAuthSession } from '@/server/auth/auth';
import type { Session } from 'next-auth';
import { db } from '@/server/db';

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    db,
  };
};

export async function createTRPCContext(_opts: FetchCreateContextFnOptions) {
  // const { req, resHeaders } = opts;
  const session = await getUserAuthSession();

  return createInnerTRPCContext({
    session,
  });
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
