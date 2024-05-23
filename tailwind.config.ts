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
      },
      colors: {
        yellow: {
          light: '#E6D4A2'
        },
        gray: {
          dark: '#1E1E1E'
        }
      },
    },
  },
  plugins: [],
};
export default config;


// fontFamily: {
//   play: ["Play", "sans-serif"],
// },