const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const {
    getPosts,
    addPost,
    deletePost,
} = require('../controllers/postController')

router.get("/", getPosts);
router.post("/addPost", addPost);
router.delete("/deletePost/", deletePost);


module.exports = router