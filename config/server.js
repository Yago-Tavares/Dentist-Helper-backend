const port = 3030;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors());


server.listen(process.env.PORT || port, function() {
    console.log('Listening on port ' + port);
});

module.exports = server;