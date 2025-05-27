/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Definisci qui i tuoi colori personalizzati
        // Questo dice a Tailwind come gestirli con le utility di opacità
        prim: "rgb(var(--clr-prim) / <alpha-value>)",
        sec: "rgb(var(--clr-sec) / <alpha-value>)",
        ter: "rgb(var(--clr-ter) / <alpha-value>)",
        customBg: "rgb(var(--clr-bg) / <alpha-value>)", // Rinominato per evitare conflitti con 'bg' di Tailwind
        customTxt: "rgb(var(--clr-txt) / <alpha-value>)", // Rinominato per evitare conflitti
        customBtn: "rgb(var(--clr-btn) / <alpha-value>)", // Rinominato
      },
    },
  },
  plugins: [/* require("tailwind-scrollbar") */],
};
