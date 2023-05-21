module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{ico,png,jpg,jpeg,svg}'],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
