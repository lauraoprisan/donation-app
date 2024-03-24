const mongoose = require('mongoose')

const Schema = mongoose.schema

const userPostStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    isWaitingAdminResponse: {
        type: Boolean,
        required:false
    },
    isReconfirmationRequired: {
        type: Boolean,
        required:false
    },
    isInAction: {
        type: Boolean,
        required:false
    },
    isCompleted: {
        type: Boolean,
        required:false
    },
    hasDroppedOut: {
        type: Boolean,
        required:false
    },
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate

module.exports = mongoose.model('UserPostStatus', userPostStatusSchema)