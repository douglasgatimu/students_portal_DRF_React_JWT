// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or your specific framework plugin

export default defineConfig({
  plugins: [react()],
  // If you have a separate postcss.config.js, you usually don't need this block:
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('tailwindcss'), // <-- THIS IS THE PROBLEM IF IT'S HERE
  //       require('autoprefixer'),
  //     ],
  //   },
  // },
});