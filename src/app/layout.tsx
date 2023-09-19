import './globals.css';
import type { Metadata } from 'next';
import { montserrat } from './fonts';
import NextAuthProvider from './_auth/AuthProvider';
import TrpcProvider from './_trpc/Provider';

export const metadata: Metadata = {
  title: 'Genshin Resource Manager',
  description:
    'Genshin Impact tool designed to help you manage your resources and plan your journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={montserrat.variable}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
