/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                Primary: "#B79654",
                background: "#100F15",
                Secondary: "#54B1B7",
                darkSlate: "#1B1A22",
                darkText: "#999999",
                redText: "#F35556",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
