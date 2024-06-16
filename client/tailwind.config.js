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
    corePlugins: {
        // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
        preflight: false,
    },
    plugins: [],
};
