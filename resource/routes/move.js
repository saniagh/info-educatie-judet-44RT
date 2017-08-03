const express = require('express');
const User = require('mongoose').model('User');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const router = new express.Router();

let playerPositions = [];

router.post('/movePlayer', (req, res) => {
    if (req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            const userId = decoded.sub;
            const positionInArray = req.body.positionInArray;
            const eventType = req.body.eventType;

            if (typeof playerPositions[positionInArray] === 'undefined') {
                playerPositions[positionInArray] = {
                    top: 500,
                    left: 500,
                    userId: userId,
                    positionInArray: positionInArray,
                    role: "mouse",
                    connected: true,
                    wasCat: false
                }
            }

            if (eventType == '37') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top,
                    left: playerPositions[positionInArray].left - 40,
                    userId: userId,
                    positionInArray: positionInArray,
                    connected: playerPositions[positionInArray].connected,
                    role: playerPositions[positionInArray].role,
                    wasCat: playerPositions[positionInArray].wasCat
                }
            }
            else if (eventType == '38') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top - 40,
                    left: playerPositions[positionInArray].left,
                    userId: userId,
                    positionInArray: positionInArray,
                    connected: playerPositions[positionInArray].connected,
                    role: playerPositions[positionInArray].role,
                    wasCat: playerPositions[positionInArray].wasCat
                }
            }
            else if (eventType == '39') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top,
                    left: playerPositions[positionInArray].left + 40,
                    userId: userId,
                    positionInArray: positionInArray,
                    connected: playerPositions[positionInArray].connected,
                    role: playerPositions[positionInArray].role,
                    wasCat: playerPositions[positionInArray].wasCat
                }
            }

            else if (eventType == '40') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top + 40,
                    left: playerPositions[positionInArray].left,
                    userId: userId,
                    positionInArray: positionInArray,
                    connected: playerPositions[positionInArray].connected,
                    role: playerPositions[positionInArray].role,
                    wasCat: playerPositions[positionInArray].wasCat
                }
            }

            res.send({
                top: playerPositions[positionInArray].top,
                left: playerPositions[positionInArray].left,
                playerPositions: playerPositions
            });

        })
    }
});

router.post("/playerPositions", (req, res) => {
    if (req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            const positionInArray = req.body.positionInArray;
            const userId = decoded.sub;

            if (typeof playerPositions[positionInArray] === 'undefined') {
                playerPositions[positionInArray] = {
                    top: 500,
                    left: 500,
                    userId: userId,
                    positionInArray: positionInArray,
                    role: "mouse",
                    connected: true,
                    wasCat: false
                };
            }

            res.send({
                playerPositions: playerPositions
            })

        });
    }
});

router.post("/makeCat", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            const currentCatPositionInArray = req.body.currentCatPositionInArray;
            const length = playerPositions.length;

            if (currentCatPositionInArray == length) {
                console.log("game finished");
                res.send({
                    playerPositions: playerPositions,
                    finished: true
                })
            }

            if (currentCatPositionInArray < length) {
                console.log(currentCatPositionInArray);

                playerPositions[currentCatPositionInArray].wasCat = true;
                playerPositions[currentCatPositionInArray].role = "cat";

                if (currentCatPositionInArray > 0)
                    playerPositions[currentCatPositionInArray - 1].role = "mouse";

                res.send({
                    playerPositions: playerPositions,
                    finished: false
                })
            }
        });
    }
});

router.get("/restartGame", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            let newGamePositions = playerPositions.map((player) => {{
                console.log("restarting game");
                return {
                    top: 500,
                    left: 500,
                    userId: player.userId,
                    positionInArray: player.positionInArray,
                    role: "mouse",
                    connected: player.connected,
                    wasCat: false
                }
            }
            });
            playerPositions = newGamePositions;

            res.json({
                playerPositions: playerPositions
            })

        })
    }
});

router.post("/removePlayer", (req, res) => {
    if (req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            const positionInArray = req.body.positionInArray;
            const userId = decoded.sub;

            playerPositions[positionInArray] = {
                ...playerPositions[positionInArray],
                top: -500,
                left: -500,
                connected: false
            };

            res.send({
                playerPositions: playerPositions
            })

        })
    }
});

module.exports = router;