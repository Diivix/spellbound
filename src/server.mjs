import fs from 'fs';
import http from 'http';
import app from './app';

let server;
if (process.env.NODE_ENV === 'production') {
    // As SSL cert is provided. E.g zeit.co hosting..
    server = http.createServer(app)
} else {
    // var options = {
    //     key: fs.readFileSync('./certificates/localhost.key'),
    //     cert: fs.readFileSync('./certificates/localhost.cert'),
    //     requestCert: false,
    //     rejectUnauthorized: false
    // };
    server = http.createServer(app)
    // server = http.createServer(options, app)
}

server.listen(process.env.SSL_PORT, function () {
    console.log('Express server listening on port ' + process.env.SSL_PORT);
});
