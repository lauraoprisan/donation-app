const express = require('express')
const router = express.Router()

router.get("/", (req,res)=>{
    res.json({msg: "GET all cases"})
})

router.get("/:id", (req,res)=>{
    res.json({msg: "GET a single case"})
})
module.exports = router