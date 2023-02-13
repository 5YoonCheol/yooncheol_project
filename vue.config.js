const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
let active = true;
if(process.env.VUE_APP_MODE === 'prod' || process.env.VUE_APP_MODE === 'dev') {
  active = false;
}
module.exports = {
  productionSourceMap: active,
  // npm run build 타겟 디렉토리
  outputDir: './yooncheol-front/',

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
  devServer: {
    https: false,
    host: 'localhost:8080'
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_PJT_NM;
      return args;
    });
  },
  configureWebpack: config => {

    if(!active) {
      config.mode = 'production';
      config.optimization = {
        minimize: true
      }

      config.output.filename = '[name].js?h=[hash]';
      config.output.chunkFilename = '[name].js?h=[hash]';
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    } else {
      config.devtool = 'source-map';
      config.output.filename = '[name].js';
      config.output.chunkFilename = '[name].js?h=[hash]';

    }
  }
};
