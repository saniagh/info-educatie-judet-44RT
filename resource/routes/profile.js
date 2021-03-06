const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Collection = require('mongoose').model('Collection');
const News = require('mongoose').model('News');
const UpdateProfileLogs = require('mongoose').model('UpdateProfileLogs');
const CommentCollection = require('mongoose').model("CommentCollection");
const CommentNews = require('mongoose').model("CommentNews");
const config = require('../../config');

const router = new express.Router();

const redis = require('redis');
const client = redis.createClient();

function validateProfileForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user credentials
    //we do not check for the lack of credentials but for length and type

    //longest name in the world is 898 characters long
    if (typeof payload.firstName !== 'string' || payload.firstName.trim().length > 30) {
        isFormValid = false;
        errors.firstName = "Please use a valid first/given name"
    }

    if (typeof payload.lastName !== 'string' || payload.lastName.trim().length > 30) {
        isFormValid = false;
        errors.lastName = "Please use a valid last/family name"
    }

    if (typeof payload.birthDate !== 'string' || payload.birthDate.trim().length > 50) {
        isFormValid = false;
        errors.birthDate = "Please use a valid birth date"
    }

    if (typeof payload.city !== 'string' || payload.city.trim().length > 100) {
        isFormValid = false;
        errors.city = "Please use a valid city name"
    }

    if (typeof payload.country !== 'string' || payload.country.trim().length > 100) {
        isFormValid = false;
        errors.country = "Please use a valid country name"
    }

    if (typeof payload.profession !== 'string' || payload.profession.trim().length > 100) {
        isFormValid = false;
        errors.country = "Please use a valid profession name"
    }

    if (typeof payload.companyName !== 'string' || payload.companyName.trim().length > 100) {
        isFormValid = false;
        errors.companyName = "Please provide a valid company name"
    }

    if (typeof payload.profilePictureLink !== 'string' || payload.profilePictureLink.trim().length > 10000) {
        isFormValid = false;
        errors.profilePictureLink = "Please use a valid profile picture link"
    }

    if (typeof payload.profileCover !== 'string' || payload.profileCover.trim().length > 10000) {
        isFormValid = false;
        errors.profileCover = "Please use a valid link for the cover picture"
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

router.post('/profile', (req, res) => {
    User.findOne({name: req.body.userName}, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: "Invalid action"
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "User is not a member"
            });
        }

        if (!req.headers.authorization) {
            return res.status(401).end();
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

            let boole = (userId.toString() === user._id.toString());

            Collection.find({userId: user._id}, (err, collections) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    })
                }

                if (!collections) {
                    res.json({
                        message: "NoCollections"
                    })
                }

                const data = {
                    userId: userId,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    profession: user.profession,
                    companyName: user.companyName,
                    city: user.city,
                    country: user.country,
                    profilePictureLink: user.profilePictureLink,
                    profileCover: user.profileCover,
                    ownUser: boole,
                    latestCollections: collections
                };

                return res.json({
                    message: 'Successfully fetched profile',
                    user: data
                });
            }).sort({time: -1}).limit(4);
        })
    });
});

// From node_redis issues, as suggested for recursive read and delete of keys
function scanDelComments(cursor, cb) {

    client.scan(cursor, 'MATCH', 'Comments of:*', 'COUNT', 100, (err, resp) => {
        if (err)
            return cb(err);
        let nextCursor = resp[0];
        let keys = resp[1].length;

        if (nextCursor === 0 && keys.length === 0) 
            return cb(null);

        client.del(resp[1], function(err) {
            if (err)
                return cb(err);
            if (nextCursor === 0)
                return cb(null);
            scanDelComments(nextCursor, cb);
        });
    });
}

function scanDelCollections(cursor, cb) {

    client.scan(cursor, 'MATCH', 'Collections of:*', 'COUNT', 100, (err, resp) => {
        if (err)
            return cb(err);
        let nextCursor = resp[0];
        let keys = resp[1].length;

        if (nextCursor === 0 && keys.length === 0)
            return cb(null);

        client.del(resp[1], function(err) {
            if (err)
                return cb(err);
            if (nextCursor === 0)
                return cb(null);
            scanDelCollections(nextCursor, cb);
        });
    });
}

router.post('/profile-edit', (req, res) => {

    const validationResult = validateProfileForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    if (!req.headers.authorization) {
        return res.status(401).end();
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

        if (userId === req.body.userId && userId === req.body.viewerId) {
            //if anybody tries to hack somebody else's profile, they will end up "hacking" their own profile :P

            Collection.updateMany({userId: userId}, {
                $set: {
                    profilePictureLink: req.body.profilePictureLink
                }
            }, () => {
            });

            News.updateMany({userId: userId}, {
                $set: {
                    profilePictureLink: req.body.profilePictureLink
                }
            }, () => {
            });

            CommentNews.updateMany({userId: userId}, {
                $set: {
                    profilePictureLink: req.body.profilePictureLink
                }
            }, () => {
            });

            CommentCollection.updateMany({userId: userId}, {
                $set: {
                    profilePictureLink: req.body.profilePictureLink
                }
            }, () => {
            });

            User.updateOne({_id: {$eq: userId}}, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthDate: req.body.birthDate,
                    city: req.body.city,
                    country: req.body.country,
                    profession: req.body.profession,
                    companyName: req.body.companyName,
                    profilePictureLink: req.body.profilePictureLink,
                    profileCover: req.body.profileCover
                }
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

                const logData = {
                    userId: userId,
                    profilePictureLink: req.body.profilePictureLink,
                    profileCover: req.body.profileCover,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthDate: req.body.birthDate,
                    city: req.body.city,
                    country: req.body.country,
                    profession: req.body.profession,
                    companyName: req.body.companyName,
                    profilePictureLinkOld: req.body.profilePictureLinkOld,
                    profileCoverOld: req.body.profileCoverOld,
                    firstNameOld: req.body.firstNameOld,
                    lastNameOld: req.body.lastNameOld,
                    birthDateOld: req.body.birthDateOld,
                    cityOld: req.body.cityOld,
                    countryOld: req.body.countryOld,
                    professionOld: req.body.professionOld,
                    companyNameOld: req.body.companyNameOld
                };

                client.del("users");
                client.del("logsProfile");
                client.del("collectionsAdmin");
                client.del("logsCollectionsCreate");
                client.del("Collections of:" + req.body.userId);
                client.del("collectionsBrowse");
                client.del("collectionsSearch");
                client.del("collectionsHome");
                client.del("logsNewsCreate");
                client.del("newsBrowse");
                client.del("newsHome");
                scanDelComments(0, (err) => {
                });
                scanDelCollections(0 ,(err) => {
                });

                const newLog = new UpdateProfileLogs(logData);
                newLog.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error while logging"
                        })
                    }

                    UpdateProfileLogs.find({}, (err, logs) => {
                        if (logs) {
                            client.set("logsProfile", JSON.stringify(logs));
                        }
                    });
                });

                return res.json({
                    message: 'Successfully updated profile',
                    successStatus: true
                });
            });
        }
        else return res.status(401).end;
    });
});

module.exports = router;