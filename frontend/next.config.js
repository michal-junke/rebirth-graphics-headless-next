const path = require('path');
const glob = require('glob');

module.exports = {
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }
                ],
              }
            }
          },
        ]
      },
    );
    return config;
  },
};
