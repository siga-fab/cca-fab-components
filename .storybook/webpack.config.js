const path = require('path');
const includePath = path.resolve(__dirname, '..');
module.exports = {
  module: {
    rules: [
      {
        test: [/\.stories\.tsx?$/, /index\.ts$/],
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              parser: 'typescript',
            },
          },
        ],
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
      },
      {
        test: [/\.css$/],
        include: includePath,
        use: ['to-string-loader', 'css-loader'],
      },
    ],
  },
};
