import { cva } from 'class-variance-authority';

export const buttonVariants = cva('font-montserrat', {
  variants: {
    variant: {
      base: 'm-[0.125rem] flex h-[3.3125rem] w-[12.625rem] cursor-pointer items-center justify-center rounded-[2.5rem]',
      filter:
        'relative isolate flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center overflow-hidden rounded-[0.3125rem] border border-solid border-[#38a6c266] bg-black bg-opacity-40 hover:bg-[#49b0ca66]',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});
