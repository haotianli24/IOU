/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: '#34d0d3',         // Teal color
        'middle-blue': '#3fb2e9', // Middle Blue color
        'darker-blue': '#434bab', // Darker Blue color
        gradient1: '#69b34c',     // Green
        gradient2: '#acb334',     // Light Green
        gradient3: '#fab733',     // Yellow
        gradient4: '#ff8e15',     // Orange
        gradient5: '#FF4e11',     // Red
        gradient6: '#ff0d0d' ,
        bronze: '#e09f6e'
      },
    },
  },
  plugins: [],
};
