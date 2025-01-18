/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7A3B12',
        secondary: '#28282B',
        lightstone: '#F7EEE7',
      }
    },
   
  },
 
  plugins:[require('@tailwindcss/forms')], // Add the plugin here
  
}