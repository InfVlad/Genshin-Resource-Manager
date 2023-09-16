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

it('Should return "Character Created Successfully"', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = mockedCharacters[0];
  const result = await authedCaller.userCharacter.createUserCharacter(character);
  expect(result.message).toBe(`Character ${character.name} created successfully`);
});
it('Should return "Character Created Successfully"', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = mockedCharacters[1];
  const result = await authedCaller.userCharacter.createUserCharacter(character);
  expect(result.message).toBe(`Character ${character.name} created successfully`);
});
it('Should throw Error, Character Exists', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = mockedCharacters[1];
  await expect(() =>
    authedCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});
it('Should throw Error, Invalid Character Name', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = mockedCharacters[2];
  await expect(() =>
    authedCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});

it('Should throw Error, Current Basic attack level should be lower or equal to Desired', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = { ...mockedCharacters[1], basicAttacksCurrent: 6 };
  await expect(() =>
    authedCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});
it('Should throw Error, Current Burst skill level should be lower or equal to Desired', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = { ...mockedCharacters[1], burstSkillCurrent: 18 };
  await db.userCharacter.deleteMany();
  await expect(() =>
    authedCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});

it('Should throw Error, Desired ascension should be equal or lower than 6', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = { ...mockedCharacters[0], desiredAscension: 14 };
  await expect(() =>
    authedCaller.userCharacter.createUserCharacter(character),
  ).rejects.toThrowError();
});
it('Should update the character successfully', async () => {
  type Input = inferProcedureInput<AppRouter['userCharacter']['createUserCharacter']>;
  const character: Input = { ...mockedCharacters[3], basicAttacksCurrent: 1 };
  const creationResult = await authedCaller.userCharacter.createUserCharacter(character);
  const updateInput = { ...creationResult.char, basicAttacksCurrent: 5 };
  const result = await authedCaller.userCharacter.updateUserCharacter(updateInput);
  expect(result.message).toBe(`Character ${character.name} updated successfully`);
  expect(result.char.basicAttacksCurrent).toBe(5);
});
