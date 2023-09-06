import type { allCharactersData } from '@/data/charactersData';

type BaseData = (typeof allCharactersData)[number];

export type CharacterName = BaseData['name'];
export type WeaponType = BaseData['weapon'];
export type ElementType = BaseData['element'];
export type RarityType = BaseData['rarity'];
export type LocalSpecialityType = BaseData['localSpecialty'];
