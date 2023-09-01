import type { CharacterData, ImageUrl } from './types';
import { downloadImage } from './imageDownloader';
import { getCharacterData } from './fetchCharacterData';
import { IMAGES_BASE_URL, CHARACTERS_LIST_URL } from './constants';
import { getCharactersUrls } from './fetchCharsUrls';
import {
  createAllCharactersDataFile,
  createDataFolder,
  createMaterialsListFile,
} from './fileCreators';

function getCharImageUrls(charactersData: CharacterData[], charImagePath: string) {
  const urlList: ImageUrl[] = [];
  charactersData.forEach((character) => {
    urlList.push({
      url: `${IMAGES_BASE_URL}${charImagePath}${character.name.replace(/\s/, '')}.png`,
      imageName: `${character.name.replace(/\s/, '')}.png`,
    });
  });
  return urlList;
}
function getMaterialImageUrls(materialsList: string[], charMaterialPath: string) {
  const urlList: ImageUrl[] = [];
  materialsList.forEach((material) => {
    const imageName = material.replace(/\W/g, '');
    urlList.push({
      url: `${IMAGES_BASE_URL}${charMaterialPath}${imageName}.png`,
      imageName: `${imageName}.png`,
    });
  });
  return urlList;
}

function getMaterials(charactersDataList: CharacterData[]) {
  const materialsList = new Set<string>([]);

  charactersDataList.forEach((char) => {
    materialsList.add(char.weeklyBossMaterial);
    materialsList.add(char.normalBossMaterial);
    materialsList.add(char.specialMaterial);
    materialsList.add(char.localSpecialty);
    materialsList.add(char.ascensionGems.ascensionGemTier1);
    materialsList.add(char.ascensionGems.ascensionGemTier2);
    materialsList.add(char.ascensionGems.ascensionGemTier3);
    materialsList.add(char.ascensionGems.ascensionGemTier4);
    materialsList.add(char.talentBook.talentBookTier1);
    materialsList.add(char.talentBook.talentBookTier2);
    materialsList.add(char.talentBook.talentBookTier3);
    materialsList.add(char.commonMaterial.commonMaterialTier1);
    materialsList.add(char.commonMaterial.commonMaterialTier2);
    materialsList.add(char.commonMaterial.commonMaterialTier3);
  });
  materialsList.delete('');
  return [...materialsList];
}
async function dataScraper() {
  try {
    /**
     * Firs step is getting the wiki's url for each character inside the main "Characters" table
     */
    const charactersUrls = await getCharactersUrls(CHARACTERS_LIST_URL);
    console.log('Fetching Characters Data...');
    /**
     * Second step is getting the data of each character from its respective wiki's page,
     * all data is validated with Zod
     */
    const charactersData = await Promise.all(
      charactersUrls.map((characterUrl) => getCharacterData(characterUrl)),
    );
    console.log('Retrieved Characters Data Successfully');
    /**
     * Now its time to save the character data
     */
    createDataFolder();
    createAllCharactersDataFile(charactersData);
    console.log('File with Characters Data Created Successfully');

    const characterImageUrlsList = getCharImageUrls(charactersData, '/char/small/');
    console.log('Downloading Character Images');

    const charImageDownloads = characterImageUrlsList.map(({ url, imageName }) => {
      return downloadImage(url, './public/images/characters', imageName);
    });
    await Promise.all(charImageDownloads);

    console.log('Character Images Downloaded Successfully');

    console.log('Checking for Materials');
    const materialsList = getMaterials(charactersData);
    const materialImageUrls = getMaterialImageUrls(materialsList, '/mats/');

    console.log(`${materialsList.length} Materials found`);
    createMaterialsListFile(materialsList);
    console.log('File with Materials Data Created Successfully');

    console.log('Downloading Materials Images');
    await Promise.all(
      materialImageUrls.map(({ url, imageName }) => {
        return downloadImage(url, './public/images/materials', imageName);
      }),
    );
    console.log('Materials Images Downloaded Successfully');
  } catch (error) {
    console.error(error);
  }
}

void dataScraper();
