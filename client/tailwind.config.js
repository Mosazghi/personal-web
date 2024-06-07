/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1d2021",
                secondary: "#32302f",
                "secondary-dark": "#326fa8",
            },
        },
    },
    plugins: [],
};
