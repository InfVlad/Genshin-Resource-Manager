import * as fs from 'fs';
import type { CharacterData } from './types';

export const createDataFolder = () => {
  if (!fs.existsSync('./src/data')) {
    fs.mkdirSync('./src/data', { recursive: true });
  }
};

export const createAllCharactersDataFile = (charactersData: CharacterData[]) => {
  const fileContent = `export const allCharactersData = ${JSON.stringify(
    charactersData,
  )} as const;\n
  export type ValidCharacterNames = (typeof allCharactersData)[number]['name'];\n
  export const charactersNamesList = allCharactersData.map(({ name }) => name);
  `;
  fs.writeFileSync('./src/data/charactersData.ts', fileContent, 'utf-8');
};

export const createMaterialsListFile = (materialsList: string[]) => {
  const fileContent = `export const materialsList = ${JSON.stringify(
    materialsList,
  )} as const;\n
    `;
  fs.writeFileSync('./src/data/materials.ts', fileContent, 'utf-8');
};
