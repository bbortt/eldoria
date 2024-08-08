/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 140,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,

  // js and ts rules:
  arrowParens: 'avoid',

  // jsx and tsx rules:
  bracketSameLine: false,

  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson'],
};

module.exports = config;
