const manifestJSON = require('./public/manifest');

module.exports = {
  pwa: {
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
