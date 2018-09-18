const port = 3030;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors());


server.listen(process.env.PORT || 3030, function() {
    console.log('Listening on')
});

module.exports = server;