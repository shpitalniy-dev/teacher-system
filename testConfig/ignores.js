/*
  Disable webpack-specific 'loaders' for tests
  extensions: [".styl",".css",".png",".jpg",".gif",".svg",".ico"]
*/
require.extensions['.less'] = function () {
    return null;
};