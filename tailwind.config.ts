import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Japanese palette: matcha green, vermilion, persimmon
        primary: {
          DEFAULT: '#5B7C5A', // Matcha green (抹茶色)
          50: '#F0F5F0',
          100: '#DCE8DC',
          200: '#BDD1BD',
          300: '#9AB59A',
          400: '#7A9A7A',
          500: '#5B7C5A',
          600: '#4A6B4A',
          700: '#3A553A',
          800: '#2A3F2A',
          900: '#1A2A1A',
        },
        secondary: {
          DEFAULT: '#E8A87C', // Persimmon orange (柿色)
          50: '#FDF6F0',
          100: '#FAE8D8',
          200: '#F4D0AE',
          300: '#EDB580',
          400: '#E8A87C',
          500: '#D89164',
          600: '#B5764F',
          700: '#895A3B',
          800: '#5C3D28',
          900: '#2E1E14',
        },
        accent: {
          DEFAULT: '#C8553D', // Vermilion red (朱色)
          50: '#FDF0ED',
          100: '#FAD9D3',
          200: '#F5B5A9',
          300: '#EE8E7D',
          400: '#D86A55',
          500: '#C8553D',
          600: '#A84430',
          700: '#823324',
          800: '#562218',
          900: '#2B110C',
        },
        earth: {
          DEFAULT: '#7D6B5D',
          light: '#B5A595',
          dark: '#524840',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
