const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      packageJson: {
        name: 'backend',
        version: '0.0.1',
        main: 'main.js',
        types: 'main.d.ts',
        dependencies: {
          express: '^4.21.2',
          cors: '^2.8.5',
          'firebase-admin': '^13.3.0',
          'firebase-functions': '^6.3.2',
          'class-validator': '^0.14.2',
          'class-transformer': '^0.5.1'
        },
        engines: {
          node: '22'
        }
      },
      externalDependencies: ['express', 'cors', 'firebase-admin', 'firebase-functions', 'class-validator', 'class-transformer'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '../package.json',
          to: 'package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            return JSON.stringify({
              name: pkg.name,
              version: pkg.version,
              dependencies: {
                express: pkg.dependencies.express,
                cors: pkg.dependencies.cors,
                'firebase-admin': pkg.dependencies['firebase-admin'],
                'firebase-functions': pkg.dependencies['firebase-functions'],
                'class-validator': pkg.dependencies['class-validator'],
                'class-transformer': pkg.dependencies['class-transformer']
              },
              engines: pkg.engines
            }, null, 2);
          }
        }
      ]
    })
  ],
};
