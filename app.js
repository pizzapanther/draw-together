var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.use('/socket-io',
  express.static('node_modules/socket.io-client/dist'));

app.get('/', function (request, response) {
  response.render('draw.hbs');
});

app.get('/paint', function (request, response) {
  response.render('paint.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  
  client.on('draw', function (coords) {
    console.log('Coords', coords);
    io.emit('do-draw', coords);
  });
});

var PORT = process.env.PORT || 8000;
http.listen(PORT, function () {
  console.log('Listening on port 8000');
});

