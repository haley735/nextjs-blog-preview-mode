/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'clarendon': ['clarendon-urw', 'serif'],
        // 'clarendon-bold': ['clarendon-urw', 'serif', 700, 'normal'],
        'look-script': ['look-script', 'san-serif'],
        // 'look-script-bold': ['look-script', 'san-serif', 700, 'normal']
        'gotham-black': ['Gotham-Black', 'san-serif'],
        'gotham-light': ['Gotham-Light', 'san-serif'],
        'gotham-bold': ['Gotham-Bold', 'san-serif'],
        'gotham-medium': ['Gotham-Medium', 'san-serif'],
        'gotham-book': ['Gotham-Book', 'san-serif'],

      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        crimson: '#8C0B42',
        lightgrey: '#D3D3D3',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      letterSpacing: {
        '1': '0em',
        '2': '0.025em',
        '3': '0.05em',
        '4': '0.1em',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }

        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }

        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
      
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }

        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [
  ],
  variants: {
    display: ['responsive', 'group-hover', 'group-focus'],
   },
}
