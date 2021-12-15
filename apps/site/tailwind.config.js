const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  content: [
    // add the site build
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    // dynamically add whatever is used in the libs
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../../tailwind-workspace-preset.js')],
};
