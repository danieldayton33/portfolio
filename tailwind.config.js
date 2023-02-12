/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './@components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                quaternary: 'var(--color-quaternary)',
                quinary: 'var(--color-quinary)',
            },
            fontFamily: {
                ubuntu: ['var(--font-ubuntu-normal)', 'sans-serif'],
                ubuntuBold: ['var(--font-ubuntu-bold)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
