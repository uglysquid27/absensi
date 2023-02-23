/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/ts/**/*.ts",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
