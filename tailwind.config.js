/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Or 'media'
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#3498db",
          secondary: "#e74c3c",
          accent: "#2ecc71",
          background: "#f8f9fa",
          text: "#333333",
        },
        dark: {
          primary: "#2980b9",
          secondary: "#c0392b",
          accent: "#27ae60",
          background: "#2c3e50",
          text: "#ecf0f1",
        },
      },
    },
  },
  plugins: [],
};
