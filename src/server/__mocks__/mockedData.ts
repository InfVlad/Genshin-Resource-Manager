import type { UserCharacter } from '@prisma/client';
import type { Session } from 'next-auth';

type inputChar = Omit<UserCharacter, 'userId' | 'id'>;

export const mockUser = {
  id: 'cln94jbn10000v4yo67n1cs1g',
  email: 'test@example.com',
  name: 'Test User',
};

export const mockSessionAuth: Session = {
  expires: '1',
  user: mockUser,
};

export const mockedCharacters: inputChar[] = [
  {
    name: 'Hu Tao',
    basicAttacksCurrent: 1,
    basicAttacksDesired: 5,
    burstSkillCurrent: 1,
    burstSkillDesired: 5,
    currentAscension: 1,
    desiredAscension: 6,
    elementalSkillCurrent: 1,
    elementalSkillDesired: 6,
    currentLevel: 1,
    desiredLevel: 90,
  },
  {
    name: 'Venti',
    basicAttacksCurrent: 5,
    basicAttacksDesired: 5,
    burstSkillCurrent: 5,
    burstSkillDesired: 5,
    currentAscension: 6,
    desiredAscension: 6,
    elementalSkillCurrent: 6,
    elementalSkillDesired: 6,
    currentLevel: 89,
    desiredLevel: 90,
  },
  {
    name: 'Jhon',
    basicAttacksCurrent: 1,
    basicAttacksDesired: 5,
    burstSkillCurrent: 1,
    burstSkillDesired: 5,
    currentAscension: 6,
    desiredAscension: 6,
    elementalSkillCurrent: 1,
    elementalSkillDesired: 6,
    currentLevel: 1,
    desiredLevel: 90,
  },
  {
    name: 'Xingqiu',
    basicAttacksCurrent: 1,
    basicAttacksDesired: 5,
    burstSkillCurrent: 1,
    burstSkillDesired: 5,
    currentAscension: 6,
    desiredAscension: 6,
    elementalSkillCurrent: 1,
    elementalSkillDesired: 6,
    currentLevel: 1,
    desiredLevel: 90,
  },
];
