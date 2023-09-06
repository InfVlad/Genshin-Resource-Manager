module.exports = {
  // This will lint and format TypeScript and                                             //JavaScript files
  '**/*.(ts|tsx|js)': ['eslint --fix', 'prettier --write'],

  // this will Format MarkDown and JSON
  '**/*.(md|json)': 'prettier --write',
};
