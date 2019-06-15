const express = require('express');
const app = express();

const requestService = require('./src/request-service')
const scrappingService = require('./src/scrapping-service')

app.get('/', function (req, res) {

    // requestService.getIdAcestreamByIdCanal(13)
    //     .then(
    //         resp => {
    //             res.send(resp);
    //         }
    //     )

    scrappingService.getAcestreamLinks().then(

        resp => res.send(resp)
    )

});

app.listen(3000, function () {
    console.log('On in port: 3000');
});