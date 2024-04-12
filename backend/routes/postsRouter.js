const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    updateImage,
} = require('../controllers/postController')

router.get("/", getPosts);
router.post("/addPost",  upload.single("file"),  addPost);
router.delete("/deletePost/", deletePost);
router.put("/updatePost/", updatePost);
router.put("/updateImage",  upload.single("file"),  updateImage);


module.exports = router