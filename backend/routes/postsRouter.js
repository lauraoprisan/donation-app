const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const {
    getPosts,
    addPost,
    deletePost,
    updatePost,
} = require('../controllers/postController')

router.get("/", getPosts);
router.post("/addPost",  upload.single("file"),  addPost);
router.delete("/deletePost/", deletePost);
router.put("/updatePost/", updatePost);


module.exports = router