const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {

        // payload from request and our own, empty, fields
        const userData = {
            email: email.trim(),
            password: password.trim(),
            name: req.body.name.trim(),
            registerDate: Date.now(),
        };

        //Insert the new user into the MongoDB
        const newUser = new User(userData);
        newUser.save((err) => {

            // error
            if (err) {
                return done(err);
            }
            return done(null);
        });
    });
