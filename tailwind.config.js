/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                25: "28rem",
                100: "30rem",
                120: "rem",
            },
            width: {
                140: "40rem",
                100: "35rem",
                130: "30rem",
                115: "15rem",
                118: "18rem",
                120: "20rem",
            },
            top: {
                100: "20rem",
            },
            hueRotate: {
                150: "150deg",
            },
            screens: {
                xs: "250px",
                xsm: "330px",
                xm: "290px",
                xl: "500px",
            },
        },
    },
    plugins: [],
}
