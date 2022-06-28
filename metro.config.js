/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const MetroConfig = require('@ui-kitten/metro-config');

// /**
//  * @see https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
//  */
// const evaConfig = {
//   evaPackage: '@eva-design/eva',
// };

// module.exports = MetroConfig.create(evaConfig, {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },
// });

const MetroConfig = require('@ui-kitten/metro-config');
const defaultConfig = require('metro-config/src/defaults').getDefaultValues();

const evaConfig = {
  evaPackage: '@eva-design/eva',
};

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
});
