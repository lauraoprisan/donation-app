const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')


router.use(requireAuth)

const {
    getStatusesOfUserId,
    savePost,
} = require('../controllers/userPostStatusController')

router.get('/getStatusesOfUserId', getStatusesOfUserId)
router.post("/savePost", savePost)

module.exports = router