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
            const userName = decoded.userName;
            const positionInArray = req.body.positionInArray;
            const eventType = req.body.eventType;
            const length = playerPositions.length;
            const started = req.body.started;
            const profilePictureLink = decoded.profilePictureLink;

            let catIndex = 0;

            for (let i = 0; i < length; i++) {
                if (playerPositions[i] && playerPositions[i].role === "cat") {
                    catIndex = i;
                }
            }

            let lengthExp = require('../../variable.js');

            if (started === "true" && lengthExp.invulnerability === false) {
                for (let i = 0; i < length; i++) {
                    if (playerPositions[i] && playerPositions[i].role === "mouse") {
                        const mouse = playerPositions[i];
                        const cat = playerPositions[catIndex];
                        if (mouse.left === cat.left && mouse.top === cat.top) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.left === cat.left && cat.top + 120 === mouse.top) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.top === cat.top && cat.left + 120 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (cat.top + 120 === mouse.top && cat.left + 120 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (cat.top + 120 === mouse.top && cat.left + 80 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.left === cat.left && cat.top + 80 === mouse.top) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.top === cat.top && cat.left + 80 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (cat.top + 80 === mouse.top && cat.left + 80 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (cat.top + 80 === mouse.top && cat.left + 40 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.left === cat.left && cat.top + 40 === mouse.top) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (mouse.top === cat.top && cat.left + 40 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                        else if (cat.top + 40 === mouse.top && cat.left + 40 === mouse.left) {
                            playerPositions[i].left = -1000;
                            playerPositions[i].top = -1000;
                            playerPositions[catIndex].score++;
                            playerPositions[i].score--;
                        }
                    }
                }
            }


            if (typeof playerPositions[positionInArray] === 'undefined') {
                playerPositions[positionInArray] = {
                    top: 500,
                    left: 500,
                    userId: userId,
                    userName: userName,
                    profilePictureLink: profilePictureLink,
                    score: 0,
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
                    userName: userName,
                    positionInArray: positionInArray,
                    profilePictureLink: profilePictureLink,
                    score: playerPositions[positionInArray].score,
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
                    userName: userName,
                    positionInArray: positionInArray,
                    profilePictureLink: profilePictureLink,
                    score: playerPositions[positionInArray].score,
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
                    userName: userName,
                    positionInArray: positionInArray,
                    profilePictureLink: profilePictureLink,
                    score: playerPositions[positionInArray].score,
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
                    userName: userName,
                    positionInArray: positionInArray,
                    profilePictureLink: profilePictureLink,
                    score: playerPositions[positionInArray].score,
                    connected: playerPositions[positionInArray].connected,
                    role: playerPositions[positionInArray].role,
                    wasCat: playerPositions[positionInArray].wasCat
                }
            }

            res.json({
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
            const userName = decoded.userName;
            const profilePictureLink = decoded.profilePictureLink;

            if (typeof playerPositions[positionInArray] === 'undefined') {
                playerPositions[positionInArray] = {
                    top: 500,
                    left: 500,
                    userId: userId,
                    userName: userName,
                    profilePictureLink: profilePictureLink,
                    score: 0,
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
            if (lengthExp.length === 0 || playerPositions.length >= lengthExp.length)
                lengthExp.length = playerPositions.length;

            const length = playerPositions.length;
            const userName = decoded.userName;
            const profilePictureLink = decoded.profilePictureLink;

            let restarted = false;

            //console.log("Players are invulnerable");
            // spawn protect
            setTimeout(() => {
                lengthExp.invulnerability = false;
               // console.log("players are vulnerable");
                // return to normal value
                setTimeout(() => {
                    //console.log("players are no longer vulnerable");
                    lengthExp.invulnerability = true;
                }, 7000)
            }, 3000);

            // not equal in type
            if (currentCatPositionInArray == lengthExp.length) {
                lengthExp.currentCatPositionInArray = 0;
                lengthExp.invulnerability = true;
                restarted = true;
                let newGamePositions = playerPositions.map((player) => {
                    //console.log("Restarting game");
                    return {
                        top: 500,
                        left: 500,
                        userId: player.userId,
                        userName: userName,
                        profilePictureLink: profilePictureLink,
                        score: player.score,
                        positionInArray: player.positionInArray,
                        role: "mouse",
                        connected: player.connected,
                        wasCat: false
                    }
                });
                playerPositions = newGamePositions;
            }
            else {
                for (let i = 0; i < length; i++) {
                    if (playerPositions[i].left < 0 || playerPositions[i].top < 0 && playerPositions[i].connected === true) {
                        playerPositions[i].left = 500;
                        playerPositions[i].top = 500;
                        lengthExp.invulnerability = true;
                    }
                }

                if (playerPositions[currentCatPositionInArray] && playerPositions[currentCatPositionInArray].connected === true) {
                    playerPositions[currentCatPositionInArray % length].wasCat = true;
                    playerPositions[currentCatPositionInArray % length].role = "cat";
                }
                else for (let i = currentCatPositionInArray; i < lengthExp.length; i++) {
                    if (playerPositions[i].connected === true) {
                        lengthExp.currentCatPositionInArray = i;
                        playerPositions[currentCatPositionInArray % length].wasCat = true;
                        playerPositions[currentCatPositionInArray % length].role = "cat";
                    }
                }
                if (currentCatPositionInArray % length > 0)
                    playerPositions[(currentCatPositionInArray % length) - 1].role = "mouse";
            }

            res.json({
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