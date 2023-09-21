import { cva } from 'class-variance-authority';

export const textVariants = cva('font-montserrat', {
  variants: {
    variant: {
      title: 'text-[1.625rem] font-extrabold text-gray-primary',
      body1: 'text-base font-normal',
      button: 'text-base font-semibold text-black',
      cardName: 'text-lg font-extrabold text-gray-primary',
      cardContent: 'text-sm font-semibold text-gray-primary',
      miniCard: 'break-all text-center text-base font-semibold text-[#bbb]',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});
