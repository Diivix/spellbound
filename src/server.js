import http from 'http';
import app from './app';
import config from './config';

const server = http.createServer(app)
let currentApp = app;

server.listen(config.server.http_port, function () {
    console.log('Express server listening on port ' + config.server.http_port);
});

// Allow hot reloading of app
if (module.hot) {
    module.hot.accept('./app', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}