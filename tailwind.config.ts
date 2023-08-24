import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens:{
        sm:"450px",
      },
      colors:{
        primary:{light:'#ad00c4', dark: "#4e0058"},
        text:{dark:"#121212"},
        dark: "#000000",
        light: "#fefdfe",
        dim: "#160018"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(({ addVariant, e }:{ addVariant:any, e:any }) => {
      addVariant("dim", ({ modifySelectors, separator }:{ modifySelectors:any, separator:any }) => {
  modifySelectors(({ className }:{className:any}) => {
    const newClass = e(`${separator}${className}`);
    return `:is(.dim .dim${newClass})`;
  });
});
    })
  ],
}
export default config
