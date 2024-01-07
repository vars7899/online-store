/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#FBB860",
          100: "#FAAF4C",
          200: "#FAA638",
          300: "#F99D24",
          400: "#F99410",
          500: "#EF8A06",
          600: "#DB7E06",
          700: "#C77305",
          800: "#B36705",
          900: "#9F5C04",
        },
        offWhite: "#f1f1f1",
        platinum: "#E0E0E0",
        black: "var(--black)",
        gold: "#e3b130",
        purple: "var(--purple)",
        sand: "var(--sand)",
        silver: "var(--silver)",
      },
      fontFamily: {
        bowlby: "Konkhmer Sleokchher, cursive",
        audio: "Audiowide, cursive",
        poppins: "Poppins",
      },
      boxShadow: {
        "3xl": "rgba(0, 0, 0, 0.56) 0px 20px 25px 4px;",
      },
    },
  },
  plugins: [],
};
