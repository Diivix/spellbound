import fs from 'fs';
import http from 'http';
import app from './app';

const server = http.createServer(app)

server.listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.SSL_PORT);
});
