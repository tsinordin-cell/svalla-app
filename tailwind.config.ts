import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sea: {
          DEFAULT: '#1e5c82',
          dark: '#143f5c',
          light: '#ccdff0',
          xl: '#e8f2fa',
        },
        acc: {
          DEFAULT: '#c96e2a',
          dark: '#9e5318',
          light: '#fdf0e5',
        },
        svalla: {
          bg: '#e9f4f7',
          text: '#192830',
          text2: '#3d5865',
          text3: '#7a9dab',
        },
      },
      borderRadius: {
        '2xl': '14px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}

export default config
