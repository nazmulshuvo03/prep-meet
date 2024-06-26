/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Or 'media'
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Roboto", "serif"],
        mono: ["Menlo", "monospace"],
      },
      gridTemplateColumns: {
        6: "repeat(6, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
