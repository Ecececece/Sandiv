/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [

        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'border-pink': 'rgb(84,45,100)',
                'background-pink': 'rgb(244,160,180)',
                'button-shadow': 'rgb(255,251,232);',
                'text-pink': 'rgb(221,157,243)',
                'bar': 'rgb(137,91,155)',
                'body': 'rgb(255, 215, 215)',
                'ingredient-screen': 'rgb(0, 0, 0, 0.40)'
            },
            borderWidth: {
                '3': '3px',
            },
            fontFamily: {
                'sandiv': ['"sandiv"', 'sans-serif'],
            },
            spacing: {
                '41': '11rem',
                '73': '18.5rem',
                '190': '44rem',
            },
            height: {
                'homeBanner': '27rem'
            },
            width: {
                'homeBanner': '27rem'
            }
        },
    },
    plugins: [],
}