const express = require('express');
const User = require('mongoose').model('User');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const router = new express.Router();

router.get('/credentials', (req, res) => {

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

            res.json({
                userId: userId,
                userName: userName
            })
        });
    }
});

module.exports = router;