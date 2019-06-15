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

app.listen(3000, function () {
    console.log('On in port: 3000');
});