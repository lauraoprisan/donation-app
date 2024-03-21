const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const {
    getCases,
    addCase,
    deleteCase,
} = require('../controllers/caseController')

router.get("/", getCases);
router.post("/addCase", addCase);
router.delete("/deleteCase/", deleteCase);


module.exports = router