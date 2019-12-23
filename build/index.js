var express = require('express');
var path = require("path");

const port = process.env.PORT || 5000;

var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, function () {
  console.log('Online na porta ' + port);
});