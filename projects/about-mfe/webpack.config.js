const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({ 
  name: 'about_mfe',
  filename: 'remoteEntry.js',

  exposes: {
    './AboutModule': './projects/about-mfe/src/app/about/about.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
