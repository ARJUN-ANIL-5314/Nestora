export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-b": "#3D52A0",
        "light-b": "#7091E6",
        "light-p": "#EDE8F5",
        "light-g": "#ADBBDA",
      },
      boxShadow: {
        "custom-shadow": "0px 0px 2px #3D52A0",
      },
    },
  },
  plugins: [],
};
