/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1d2021",
                secondary: "#fe8019",
                "secondary-dark": "#d65d0e",
            },
        },
    },
    plugins: [],
};
