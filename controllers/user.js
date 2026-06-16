//const {v4: uuidv4} = require('uuid')
const User= require('../models/user')
const {setUser} = require('../service/auth')

async function handleUserSignup(req,res){
    const { name,email,password}=req.body;
    await User.create({
        name,
        email,
        password, 
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const { email,password } = req.body;

    console.log("Login route hit!");

    const user = await User.findOne({
        email,
        password,
    });

    console.log("Found User:", user);

    if(!user){
        return res.render("login",{
            error:"Invalid Username or Password"
        });
    }

    const token = setUser(user);

    // console.log("Generated Token:", token);

     res.cookie("token", token);
 
    // console.log("Cookie Set Successfully");

    return res.redirect("/");
    // return res.json({token});
}
module.exports={
    handleUserSignup,
    handleUserLogin
}