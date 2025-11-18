/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#bef264", // Xanh lá nhạt
          DEFAULT: "#84cc16", // Xanh lá chính
          dark: "#3f6212",
        },
        teal: {
          dark: "#115e59", // Xanh đậm (Footer/CTA)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
