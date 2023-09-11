// import { computersRouter } from './computers';
import { router } from './trpc';
import { userCharacterRoutes } from './routers/userCharacters/userCharacter';

export const appRouter = router({
  userCharacter: userCharacterRoutes,
});

export type AppRouter = typeof appRouter;
