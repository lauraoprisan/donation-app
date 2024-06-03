const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth)

const {
    getAllStatuses,
    getStatusesOfUserId,
    savePost,
    deleteStatus,
    changeStatusToInWaiting,
    setUpWaitingStatus,
    deleteAllStatusesOfPost,
    changeStatusToInAction,
    changeStatusesToOnHoldExceptForUserId,
} = require('../controllers/userPostStatusController')

router.get('/getAllStatuses', getAllStatuses)
router.get('/getStatusesOfUserId', getStatusesOfUserId)
router.post("/savePost", savePost)
router.delete("/deleteStatus", deleteStatus)
router.put('/changeStatusToInWaiting', changeStatusToInWaiting )
router.post('/setUpWaitingStatus', setUpWaitingStatus) //if the post is not previously saved, create a new status
router.delete('/deleteAllStatusesOfPost', deleteAllStatusesOfPost)
router.put('/changeStatusToInAction', changeStatusToInAction)
router.put('/changeStatusesToOnHoldExceptForUserId', changeStatusesToOnHoldExceptForUserId)

module.exports = router