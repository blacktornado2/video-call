module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env', // This is the alias you'll use for imports
        path: '.env',
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
  ]
};
