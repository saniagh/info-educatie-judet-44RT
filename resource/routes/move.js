const express = require('express');
const User = require('mongoose').model('User');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const router = new express.Router();

let playerPositions = [];
let currentCatPositionInArray = -1;

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
                    role: "mouse",
                    connected: true,
                    wasCat: false
                }
            }
            else if (eventType == '38') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top - 40,
                    left: playerPositions[positionInArray].left,
                    userId: userId,
                    positionInArray: positionInArray,
                    role: "mouse",
                    connected: true,
                    wasCat: false
                }
            }
            else if (eventType == '39') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top,
                    left: playerPositions[positionInArray].left + 40,
                    userId: userId,
                    positionInArray: positionInArray,
                    role: "mouse",
                    connected: true,
                    wasCat: false
                }
            }

            else if (eventType == '40') {
                playerPositions[positionInArray] = {
                    top: playerPositions[positionInArray].top + 40,
                    left: playerPositions[positionInArray].left,
                    userId: userId,
                    positionInArray: positionInArray,
                    role: "mouse",
                    connected: true,
                    wasCat: false
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
                    positionInArray: positionInArray
                };
            }

            res.send({
                playerPositions: playerPositions
            })

        });
    }
});

router.get("/makeCat", (req, res) => {
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

            console.log(playerPositions);

            Object.keys(playerPositions).map((key) => {
                if (playerPositions[key].connected === true && playerPositions[key].wasCat === false && playerPositions[key].role === "role")
                    playerPositions[key].wasCat = true;
                    playerPositions[key].role = "cat"
            });

            res.send({
                playerPositions: playerPositions
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