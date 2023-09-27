import { Button } from './ui/Button/Button';
import { Text } from './ui/Text/Text';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return (
    <Button variant='base' className='group relative' onClick={onClick}>
      <span className='pointer-events-none absolute h-[49px] w-[200px] rounded-[40px] bg-[#ece5d8]' />
      <span className='shadow-button pointer-events-none absolute h-[53px] w-[202px] rounded-[40px] border-[3px] border-solid border-white opacity-0 transition-all duration-150 group-hover:opacity-100' />
      <Text variant='button' className='z-10'>
        {children}
      </Text>
    </Button>
  );
};

export default HeaderButton;
