import Image from 'next/image';
import { Button } from '@/components';
import { cn } from '@/lib/utils';
import type { ElementType, WeaponType } from '@/types/characterTypes';

interface FilterButtonProps {
  image: ElementType | WeaponType;
  isActive: boolean;
  onClick: () => void;
}
export function FilterButton({ image, isActive, onClick }: FilterButtonProps) {
  return (
    <Button variant='filter' onClick={onClick}>
      <span
        className={cn(
          'absolute z-[-1] h-full w-full scale-0 rounded-full bg-[#38a6c2] transition-transform duration-200 ease-in',
          isActive && 'scale-150',
        )}
      />
      <Image src={`/images/elements/${image}.png`} fill alt={image} />
    </Button>
  );
}

export default FilterButton;
