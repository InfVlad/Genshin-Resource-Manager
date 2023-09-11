import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// import type { GetServerSidePropsContext } from 'next';

export const getUserAuthSession = () => {
  return getServerSession(authOptions);
};

export const checkAuth = async () => {
  const session = await getUserAuthSession();
  if (!session) redirect('/api/auth/signin');
};
