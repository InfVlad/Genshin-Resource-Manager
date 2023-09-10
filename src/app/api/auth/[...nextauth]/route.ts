import { db } from '@/server/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import { envServer } from '@/lib/envServer';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

const discordScopes = ['identify', 'email'];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    DiscordProvider({
      clientId: envServer.DISCORD_CLIENT_ID,
      clientSecret: envServer.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: discordScopes.join(' ') } },
    }),
    GoogleProvider({
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
const handler = NextAuth(authOptions) as unknown;
export { handler as GET, handler as POST };
