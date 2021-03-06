module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'test.com',
        win: {
          icon: 'public/lhquery.ico'
        }
      }
    }
  }
}
