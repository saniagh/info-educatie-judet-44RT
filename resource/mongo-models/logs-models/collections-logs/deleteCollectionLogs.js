const mongoose = require('mongoose');

const DeleteCollectionLogsSchema = new mongoose.Schema({

    userId: String,
    userName: String,
    ownerId: String,
    collectionId: String,
    collectionName: String,
    collectionDescriptionRaw: String,
    profilePictureLink: String,
    qrLink: String,
    picturesArray: [
        {
            pictureName: {
                type: String,
            },
            pictureLink: {
                type: String,
            },
            pictureDescriptionRaw: {
                type: String,
            }
        }
    ],
    deletedByAdmin: {
        type: Boolean,
        default: false
    },
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('DeleteCollectionLogs', DeleteCollectionLogsSchema);