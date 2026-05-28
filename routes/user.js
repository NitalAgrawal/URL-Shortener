const express = require("express");
const {handleUserSignup} =require('../controllers/user')
const router = express.Router();

router.post('/',handleUserSignup);
router.post('/login',handleUserSignup);
module.exports= router; 
