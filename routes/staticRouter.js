const express= require("express");
const URL = require("../models/url");
const router = express.Router();

console.log("staticRouter.js loaded. URL is:", URL);

router.get('/', async (req,res) => {
    console.log("Root route hit! URL is:", URL, "typeof URL.find:", typeof URL.find);
    if(!req.user) return res.redirect('/login')
    const allurls = await URL.find({ createdBy: req.user._id})
    return res.render("home",{
        urls: allurls,
    });
}); 

router.get('/signup',(req,res) => {
    console.log("Signup route hit!");
    return res.render("signup");
});
router.get('/login',(req,res) => {
    console.log("login route hit!");
    return res.render("login");
}
) 
module.exports = router;  