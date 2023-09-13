import { expect, it, beforeAll } from 'vitest';
import type { inferProcedureInput } from '@trpc/server';
import { appRouter, type AppRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { mockSessionAuth, mockedCharacters } from '@/server/__mocks__/mockedData';

const publicCaller = appRouter.createCaller({ session: null, db });
const authedCaller = appRouter.createCaller({ session: mockSessionAuth, db: db });

beforeAll(async () => {
  await db.userCharacter.deleteMany();
});

it('User should not have characters created yet', async () => {
  // type Input = inferProcedureInput<AppRouter['userCharacter']['getAllChars']>;
  const result = await authedCaller.userCharacter.getAllChars();
  expect(result).lengthOf(0);
});
it('Should throw error UNAUTHORIZED', async () => {
  await expect(() => publicCaller.userCharacter.getAllChars()).rejects.toThrowError();
});
it('Should throw error UNAUTHORIZED', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = mockedCharacters[0];
  // const result = await publicCaller.userCharacter.createUserCharacter(character);
  await expect(() =>
    publicCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});