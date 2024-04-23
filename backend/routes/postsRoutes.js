const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const requireAuth = require('../middleware/requireAuth')


// router.use(requireAuth)

const {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    updateImage,
} = require('../controllers/postController')

router.get("/", getPosts);
router.post("/addPost", requireAuth,  upload.single("file"),  addPost);
router.delete("/deletePost", requireAuth, deletePost);
router.put("/updatePost", requireAuth, updatePost);
router.put("/updateImage", requireAuth , upload.single("file"),  updateImage);


module.exports = router