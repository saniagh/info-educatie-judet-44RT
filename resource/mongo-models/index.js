const mongoose = require('mongoose');

module.exports.connect = (uri) => {

    mongoose.connect(uri);
    // mongoose only runs with asynchronous actions
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Error on mongoose connection: ${err}`);
        process.exit(1);
    });

    // load models
    require('./authentication/user');
};
