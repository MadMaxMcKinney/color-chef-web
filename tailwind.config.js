/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var']
            },
            colors: {
                'dark-brown': '#3A300A'
            }
        }
    },
    plugins: []
};
