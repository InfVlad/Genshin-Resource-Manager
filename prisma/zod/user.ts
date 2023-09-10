import * as z from 'zod';
import {
  type CompleteAccount,
  relatedAccountSchema,
  type CompleteSession,
  relatedSessionSchema,
  type CompleteUserCharacter,
  relatedUserCharacterSchema,
} from './index';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[];
  sessions: CompleteSession[];
  UserCharacter: CompleteUserCharacter[];
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  userSchema.extend({
    accounts: relatedAccountSchema.array(),
    sessions: relatedSessionSchema.array(),
    UserCharacter: relatedUserCharacterSchema.array(),
  }),
);
