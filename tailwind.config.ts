import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'golden-st':
          'linear-gradient(160deg, rgba(105, 84, 83, 0.565) 0%, rgba(161, 112, 78, 0.565) 39%, rgba(228, 171, 82, 0.565) 100%)',
        'purple-st':
          'linear-gradient(160deg, rgba(89, 84, 130, 0.565) 0%, rgba(120, 102, 157, 0.565) 39%, rgba(183, 133, 201, 0.565) 100%)',
        'green-st':
          'linear-gradient(160deg, rgba(72, 87, 92, 0.565) 0%, rgba(72, 107, 103, 0.565) 39%, rgba(98, 152, 113, 0.565) 100%)',
        'gray-st':
          'linear-gradient(160deg, rgba(79, 88, 100, 0.565) 0%, rgba(95, 102, 115, 0.565) 39%, rgba(135, 147, 156, 0.565) 100%)',
      },
      colors: {
        'gray-primary': '#CCC',
        'gray-secondary': '#7C7C7C',
        'yellow-primary': '#FFD780',
        'white-primary': '#ECE5D8',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.shadow-button': {
          boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, 0.5), 0 0 7px 0 hsla(39, 34%, 89%, 0.7)',
        },
      });
    }),
  ],
};
export default config;
