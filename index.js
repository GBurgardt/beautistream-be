const express = require('express');
const cors = require('cors')
const app = express();
const scrappingService = require('./src/scrapping-service')

app.use(cors());

app.get('/linkotes-scrap', function (req, res) {
    scrappingService.getAcestreamLinks().then(
        resp => res.send(resp)
    )

});


var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem')
    // key: fs.readFileSync('key.pem'),
    // cert: fs.readFileSync('cert.pem')
}

http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);

// app.listen(3000, function () {
//     console.log('On in port: 3000');
// });