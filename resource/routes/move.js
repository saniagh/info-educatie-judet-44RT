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

            let lengthExp = require('../../variable.js');

            // cat moves and attacks the mice
            if (lengthExp.currentCatPositionInArray !== lengthExp.length && playerPositions[lengthExp.currentCatPositionInArray].role === "cat") {

                let n = lengthExp.length, cat = playerPositions[lengthExp.currentCatPositionInArray];

                for (let j = 0; j < n; j++) {
                    if (playerPositions[j].role === "mouse") {

                        const mouse = playerPositions[j];

                        if (eventType == '37' && cat.left - (mouse.left + 40) < 0 && cat.left - (mouse.left + 40) > -160) {
                            // mouse has been caught from the left and is ported out of view
                            mouse.left = -1000;
                            mouse.top = -1000;
                        }

                        if (eventType == '38' && (cat.left + 160) - mouse.left > 0 && (cat.left + 160) - mouse.left < 160) {
                            // mouse has been caught from the right
                            mouse.left = -1000;
                            mouse.top = -1000;
                        }

                        if (eventType == '39' && cat.top - (mouse.top + 40) < 0 && cat.top - (mouse.top + 40) > -160) {
                            // mouse has been caught from the top
                            mouse.left = -1000;
                            mouse.top = -1000;
                        }

                        if (eventType == '40' && (cat.top + 160) - mouse.top > 0 && (cat.top + 160) - mouse.top < 160) {
                            // mouse has been caught from the bottom
                            mouse.left = -1000;
                            mouse.top = -1000;
                        }

                    }
                }
            }

            // the mice runs into the cat.
            if (lengthExp.currentCatPositionInArray !== lengthExp.length && playerPositions[lengthExp.currentCatPositionInArray].role === "mouse") {

                let mouse = playerPositions[positionInArray],
                    cat = playerPositions[lengthExp.currentCatPositionInArray];

                if (eventType == '37' && (cat.left + 160) - mouse.left > 0 && (cat.left + 160) - mouse.left < 160) {
                    // mice ran into the cat from the left
                    mouse.left = -1000;
                    mouse.top = -1000;
                }

                if (eventType == '38' && cat.left - (mouse.left + 40) < 0 && cat.left - (mouse.left + 40) > -160) {
                    // mice ran into the cat from the right
                    mouse.left = -1000;
                    mouse.top = -1000;
                }

                if (eventType == '39' && (cat.top + 160) - mouse.top > 0 && (cat.top + 160) - mouse.top < 160) {
                    // mice ran into the cat from the top
                    mouse.left = -1000;
                    mouse.top = -1000;
                }

                if (eventType == '40' && cat.top - (mouse.top + 40) < 0 && cat.top - (mouse.top + 40) > -160) {
                    // mice ran into the cat from the bottom
                    mouse.left = -1000;
                    mouse.top = -1000;
                }

            }

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

            if (eventType == '37' && playerPositions[positionInArray].top > 0 && playerPositions[positionInArray].left - 40 > 0) {
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
            else if (eventType == '38' && playerPositions[positionInArray].top - 40 > 0 && playerPositions[positionInArray].left > 0) {
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
            else if (eventType == '39' && playerPositions[positionInArray].top > 0 && playerPositions[positionInArray].left + 40 > 0) {
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

            else if (eventType == '40' && playerPositions[positionInArray].top + 40 > 0 && playerPositions[positionInArray].left > 0) {
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

            let lengthExp = require('../../variable.js');

            const currentCatPositionInArray = req.body.currentCatPositionInArray;
            if (lengthExp.length === 0)
                lengthExp.length = playerPositions.length;

            const length = playerPositions.length;

            let restarted = false;

            // not equal in type
            if (currentCatPositionInArray == lengthExp.length) {
                lengthExp.currentCatPositionInArray = 0;
                restarted = true;
                let newGamePositions = playerPositions.map((player) => {
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
                });
                playerPositions = newGamePositions;
            }
            else {
                console.log(currentCatPositionInArray);

                for (let i = 0 ; i < length ; i++) {
                    if (playerPositions[i].left < 0 || playerPositions[i].top < 0) {
                        playerPositions[i].left = 500;
                        playerPositions[i].top = 500;
                    }
                }

                playerPositions[currentCatPositionInArray % length].wasCat = true;
                playerPositions[currentCatPositionInArray % length].role = "cat";

                if (currentCatPositionInArray % length > 0)
                    playerPositions[(currentCatPositionInArray % length) - 1].role = "mouse";
            }
            res.send({
                playerPositions: playerPositions,
                restarted: restarted
            })
        });
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