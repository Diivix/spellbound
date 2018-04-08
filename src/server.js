
import fs from 'fs';
import https from 'https';
import app from './app';

let server;
if (process.env.NODE_ENV === 'production') {
    // As SSL cert is provided. E.g zeit.co hosting..
    server = https.createServer(app)
} else {
    var options = {
        key: fs.readFileSync('./certificates/localhost.key'),
        cert: fs.readFileSync('./certificates/localhost.cert'),
        requestCert: false,
        rejectUnauthorized: false
    };

    server = https.createServer(options, app)
}

let currentApp = app;

server.listen(process.env.SSL_PORT, function () {
    console.log('Express server listening on port ' + process.env.SSL_PORT);
});
