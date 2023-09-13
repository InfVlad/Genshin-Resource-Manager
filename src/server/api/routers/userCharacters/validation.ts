import { userCharacterSchema } from '@/../prisma/zod/usercharacter';
import { charactersNamesList } from '@/data/charactersData';
import type { CharacterName } from '@/types/characterTypes';
import { z } from 'zod';

const charNamesList = new Set(charactersNamesList);

export const userCharacterSchemaWithRefine = userCharacterSchema
  .omit({ userId: true, id: true })
  .extend({
    name: userCharacterSchema.shape.name.refine((value) =>
      charNamesList.has(value as CharacterName),
    ),
  })
  .refine((value) => value.desiredLevel >= value.currentLevel, {
    message: 'Current level cannot be higher than desired level',
  })
  .refine((value) => value.desiredAscension >= value.currentAscension, {
    message: 'Current ascension cannot be higher than desired ascension',
  })
  .refine((value) => value.basicAttacksDesired >= value.basicAttacksCurrent, {
    message: 'Current basic attacks cannot be higher than desired basic attacks',
  })
  .refine((value) => value.elementalSkillDesired >= value.elementalSkillCurrent, {
    message: 'Current elemental skill cannot be higher than desired elemental skill',
  })
  .refine((value) => value.burstSkillDesired >= value.burstSkillCurrent, {
    message: 'Current burst skill cannot be higher than desired burst skill',
  });

export const updateCharacterSchema = userCharacterSchema
  .extend({
    name: userCharacterSchema.shape.name.refine((value) =>
      charNamesList.has(value as CharacterName),
    ),
  })
  .refine((value) => value.desiredLevel >= value.currentLevel, {
    message: 'Current level cannot be higher than desired level',
  })
  .refine((value) => value.desiredAscension >= value.currentAscension, {
    message: 'Current ascension cannot be higher than desired ascension',
  })
  .refine((value) => value.basicAttacksDesired >= value.basicAttacksCurrent, {
    message: 'Current basic attacks cannot be higher than desired basic attacks',
  })
  .refine((value) => value.elementalSkillDesired >= value.elementalSkillCurrent, {
    message: 'Current elemental skill cannot be higher than desired elemental skill',
  })
  .refine((value) => value.burstSkillDesired >= value.burstSkillCurrent, {
    message: 'Current burst skill cannot be higher than desired burst skill',
  });

export const deleteSchema = z.object({
  id: z.string().cuid(),
});
