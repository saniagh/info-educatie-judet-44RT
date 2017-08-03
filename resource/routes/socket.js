import axios from 'axios';
import qs from 'qs';

module.exports = function (socket) {
    socket.on("resetPlayer", function () {
        socket.emit("resetPlayer", () => {});
    });
    socket.on('userConnected', function () {
        socket.broadcast.emit('userConnected');
    });
    socket.on('mustUpdatePositions', function () {
        socket.broadcast.emit('mustUpdatePositions')
    });
    socket.on('selectCat', function () {
        socket.broadcast.emit("selectCat");
    });
    socket.on('userDisconnected', function (data) {

        axios({
            method: 'post',
            url: '/move/removePlayer',
            headers: {
                'Authorization': `bearer ${data.token}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'positionInArray': data.positionInArray
            })
        }).then((response) => {
            socket.broadcast.emit("userDisconnected", {playerPositions: response.data.playerPositions, markedTerritory: response.data.markedTerritory})
        }).catch((err) => {
            console.log(err);
        });

    })
};