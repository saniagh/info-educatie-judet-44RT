const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

export let currentCatPositionInArray = 0;

io.sockets.on('resetGame', () => {
    currentCatPositionInArray = 0;
});