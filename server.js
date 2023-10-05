const api= require('./api.js');
const server = require('http').createServer(api);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    transports: ['websocket'], // specify WebSocket as the transport

  });
const PORT= 3000;
const sockets = require('./sockets');
sockets.listen(io);


server.listen(PORT, ()=>{
    console.log('Listening on PORT ' + PORT);
})

