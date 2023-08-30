import { z } from 'zod';

export const characterDataSchema = z.object({
  name: z.string().nonempty(),
  weapon: z.string().nonempty(),
  element: z.string().nonempty(),
  rarity: z.string().nonempty(),
  weeklyBossMaterial: z.string().nonempty(),
  normalBossMaterial: z.string().nonempty(),
  specialMaterial: z.string().nonempty(),
  localSpecialty: z.string().nonempty(), //
  ascensionGems: z.object({
    ascensionGemTier1: z.string().nonempty(),
    ascensionGemTier2: z.string().nonempty(),
    ascensionGemTier3: z.string().nonempty(),
    ascensionGemTier4: z.string().nonempty(),
  }),
  talentBook: z.object({
    talentBookTier1: z.string().nonempty(),
    talentBookTier2: z.string().nonempty(),
    talentBookTier3: z.string().nonempty(),
  }),
  commonMaterial: z.object({
    commonMaterialTier1: z.string().nonempty(),
    commonMaterialTier2: z.string().nonempty(),
    commonMaterialTier3: z.string().nonempty(),
  }),
  normalAttack: z.string().nonempty(),
  elementalSkill: z.string().nonempty(),
  elementalBurst: z.string().nonempty(),
});

export const imageUrlSchema = z.object({
  url: z.string().nonempty(),
  imageName: z.string().nonempty(),
});

/**
 * In case of a missing a property, it outputs a more readable the error message.
 * Otherwise it returns the parsed data
 */
export const zodCharErrorLogger = <T>(
  parseResult: z.SafeParseReturnType<T, T>,
  charName: string,
) => {
  if (!parseResult.success) {
    const { fieldErrors } = parseResult.error.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${(errors as string[]).join(', ')}` : field,
      )
      .join('\n  ');
    console.error(parseResult.error.issues);
    throw new Error(`There was an error when parsing ${charName}'s data: \n ${errorMessage}`);
  } else {
    return parseResult.data;
  }
};
