const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req,res) =>{
    res.render("home")
})

router.get("*", (req, res)=> {
    res.redirect('/')
})
module.exports = router