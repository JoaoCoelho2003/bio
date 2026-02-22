/** @type {import('tailwindcss').Config} */

import animations from '@midudev/tailwind-animations'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#9ca3af',
            maxWidth: 'none',
            a: {
              color: '#4ade80',
              '&:hover': {
                color: '#34d399',
              },
            },
            strong: {
              color: '#4ade80',
              fontWeight: '600',
            },
            h1: {
              color: '#4ade80',
            },
            h2: {
              color: '#4ade80',
            },
            h3: {
              color: '#4ade80',
            },
            h4: {
              color: '#4ade80',
            },
            code: {
              color: '#4ade80',
              backgroundColor: '#1a1a1a',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#4ade80',
            },
            hr: {
              borderColor: '#4ade80',
              opacity: '0.3',
            },
            ul: {
              listStyleType: 'disc',
            },
            'ul > li::marker': {
              color: '#4ade80',
            },
            'ol > li::marker': {
              color: '#4ade80',
            },
          },
        },
      },
    },
  },
  plugins: [
    animations,
    require('@tailwindcss/typography'),
  ],
}