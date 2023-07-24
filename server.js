const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('views', path.resolve(__dirname, 'src', 'views')); 
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));

const routes = require('./src/routes/routes');
app.use(routes);

const port = 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
    console.log(`Acessar http://localhost:${port}`)
    console.log(`Servidor Iniciado na porta ${port}`);
});
