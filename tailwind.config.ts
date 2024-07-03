import type { Config } from "tailwindcss";

const config: Config = {
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'hpbg': "url('/images/hpbackground.avif')",
        'quidditch': "url('/images/homefeed/Quidditch_pitch.webp')",
      },
      colors: {
        gryffindor: {
          red: '#740001',
          gold: '#FFC500',
        },
        hufflepuff: {
          yellow: '#EEE117',
          black: '#000000',
        },
        ravenclaw: {
          blue: '#0E1A40',
          bronze: '#946B2D', 
        },
        slytherin: {
          green: '#2A623D',
          silver: '#AAAAAA',
        },
        yellow: {
          light: '#E6D4A2',
          DEFAULT: '#D3A625'
        },
        gray: {
          DEFAULT: '#1E1E1E',
          dark: '#1E1E1E'
        },
        black:
        {
          light: '#1C2024',
          DEFAULT: '#000000'
        },
        white:
        {
          light: '#FFFFFF',
          DEFAULT: '#F0F0EE'
        },
        blue:
        {
          DEFAULT: '#1C2024',
        }
        
      },
    },
  },
  plugins: [],
};
export default config;