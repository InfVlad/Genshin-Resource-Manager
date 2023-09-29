import Image from 'next/image';
import type { CharacterName, RarityType, ElementType } from '../types/characterTypes';
import { Text } from '@/components';

interface MiniCardProps {
  name: CharacterName;
  rarity: RarityType;
  element: ElementType;
  onClick: () => void;
}

export const MiniCard = ({ name, element, rarity, onClick }: MiniCardProps) => {
  const bgColor = rarity === '4 Stars' ? 'bg-purple-st' : 'bg-golden-st';
  return (
    <div
      onClick={onClick}
      className='group m-[5px] flex h-[9.125rem] w-[6.625rem] cursor-pointer flex-col'
    >
      <div className='relative h-[6.625rem] w-[6.625rem] overflow-hidden rounded-[0.3125rem] shadow-[0_0_4px_0_rgba(0,0,0,0.8)]'>
        <div
          className={`h-[6.625rem] w-[6.625rem] transition-all duration-200 ease-linear group-hover:brightness-[150%] ${bgColor}`}
        />
        <Image alt={name} src={`/images/characters/${name.replace(/\s/, '')}.png`} fill />
        <span className='absolute bottom-[0.125rem] right-[0.125rem] z-[1] m-[0.0625rem] flex h-[1.875rem] w-[1.875rem] items-center justify-center overflow-hidden rounded-full bg-[#282828e6]'>
          <div className='relative z-10 flex h-[27px] w-[27px] items-center justify-center rounded-full'>
            <Image alt={name} src={`/images/elements/${element}.png`} fill />
          </div>
        </span>
      </div>
      <Text variant='miniCard' className='group-hover:text-shadow-blue '>
        <span className='group-hover:text-white'>{name}</span>
      </Text>
    </div>
  );
};
export default MiniCard;
