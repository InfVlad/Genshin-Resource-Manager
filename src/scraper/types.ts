import type { z } from 'zod';
import type { characterDataSchema, imageUrlSchema } from './validation';

export type CharacterData = z.infer<typeof characterDataSchema>;

export type ImageUrl = z.infer<typeof imageUrlSchema>;
