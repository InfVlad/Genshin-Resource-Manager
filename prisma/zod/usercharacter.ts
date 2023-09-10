import * as z from 'zod';
import { type CompleteUser, relatedUserSchema } from './index';

export const userCharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  currentLevel: z
    .number()
    .int()
    .min(1, { message: 'The character current level must be higher than 0' })
    .max(90, { message: 'The character current level must be lower than 90' }),
  desiredLevel: z
    .number()
    .int()
    .min(1, { message: 'The character desired level must be higher than 0' })
    .max(90, { message: 'The character desired level must be lower than 90' }),
  currentAscension: z
    .number()
    .int()
    .min(1, { message: 'The character currentAscension must be higher than 0' })
    .max(6, { message: 'The character currentAscension must be lower than 6' }),
  desiredAscension: z
    .number()
    .int()
    .min(1, { message: 'The character desiredAscension must be higher than 0' })
    .max(6, { message: 'The character desiredAscension must be lower than 6' }),
  basicAttacksCurrent: z
    .number()
    .int()
    .min(1, { message: 'The character basicAttacksCurrent must be higher than 0' })
    .max(10, { message: 'The character basicAttacksCurrent must be lower than 10' }),
  basicAttacksDesired: z
    .number()
    .int()
    .min(1, { message: 'The character basicAttacksDesired must be higher than 0' })
    .max(10, { message: 'The character basicAttacksDesired must be lower than 10' }),
  elementalSkillCurrent: z
    .number()
    .int()
    .min(1, { message: 'The character elementalSkillCurrent must be higher than 0' })
    .max(10, { message: 'The character elementalSkillCurrent must be lower than 10' }),
  elementalSkillDesired: z
    .number()
    .int()
    .min(1, { message: 'The character elementalSkillDesired must be higher than 0' })
    .max(10, { message: 'The character elementalSkillDesired must be lower than 10' }),
  burstSkillCurrent: z
    .number()
    .int()
    .min(1, { message: 'The character burstSkillCurrent must be higher than 0' })
    .max(10, { message: 'The character burstSkillCurrent must be lower than 10' }),
  burstSkillDesired: z
    .number()
    .int()
    .min(1, { message: 'The character burstSkillDesired must be higher than 0' })
    .max(10, { message: 'The character burstSkillDesired must be lower than 10' }),
  userId: z.string(),
});

export interface CompleteUserCharacter extends z.infer<typeof userCharacterSchema> {
  user: CompleteUser;
}

/**
 * relatedUserCharacterSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserCharacterSchema: z.ZodSchema<CompleteUserCharacter> = z.lazy(() =>
  userCharacterSchema.extend({
    user: relatedUserSchema,
  }),
);
