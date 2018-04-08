const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
// const app = require('./src/app');
const config = require('./webpack.dev.js');

const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(process.env.SSL_PORT, function () {
    console.log('Express server listening on port ' + process.env.SSL_PORT);
});
