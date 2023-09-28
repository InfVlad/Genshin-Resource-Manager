export { default } from 'next-auth/middleware';

/**
 * Just trying out auth with middleware
 */
export const config = {
  matcher: ['/dashboard'],
};
