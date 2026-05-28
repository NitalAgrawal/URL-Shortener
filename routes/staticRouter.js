const express= require("express");
const URL = require("../models/url");
const router = express.Router();

console.log("staticRouter.js loaded. URL is:", URL);

router.get('/', async (req,res) => {
    console.log("Root route hit! URL is:", URL, "typeof URL.find:", typeof URL.find);
    const allurls = await URL.find({})
    return res.render("home",{
        urls: allurls,
    });
}); 

router.get('/signup',(req,res) => {
    console.log("Signup route hit!");
    return res.render("signup");
}
) 
module.exports = router;  