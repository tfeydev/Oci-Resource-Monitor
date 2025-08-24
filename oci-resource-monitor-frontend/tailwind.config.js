// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: { maxWidth: { '7xl': '80rem' } } },
  plugins: [],
};
