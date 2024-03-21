const mongoose = require('mongoose')

const Schema = mongoose.schema

const userCaseStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
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

module.exports = mongoose.model('UserCaseStatus', userCaseStatusSchema)