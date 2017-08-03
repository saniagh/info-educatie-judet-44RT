const express = require('express');
const validator = require('validator');
const passport = require('passport');
const User = require('mongoose').model('User');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const router = new express.Router();

function validateProfileForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (typeof payload.profilePictureLink !== 'string' || payload.profilePictureLink.trim().length > 10000) {
        isFormValid = false;
        errors.profilePictureLink = "Please use a valid profile picture link"
    }

    if (!isFormValid) {
        message = "Check the specified fields for errors"
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

router.get("/profile", (req, res) => {
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

            User.findOne({_id: userId}, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        message: "User not found"
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                return res.json({
                    profilePictureLink: user.profilePictureLink
                })
            })

        })
    }
});

router.post('/profilePicture', (req, res) => {

    const validationResult = validateProfileForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

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

        User.updateOne({_id: {$eq: userId}}, {
            $set: {profilePictureLink: req.body.profilePictureLink}
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return res.json({
                message: 'Successfully updated profile',
                successStatus: true
            });
        });

    })
});

module.exports = router;