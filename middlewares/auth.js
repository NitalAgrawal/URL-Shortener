const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie ) return next();

        const token = tokenCookie
        const user=getUser(token);

        req.user= user;
        return next();
}
 
function restrictTo(roles = []) {
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end('UnAuthorized')

        return next();
    };
}


// function restrictTo(roles) {
//     return function (req,res,next){
//         if(!req.user) return res.redirect("/login")
//     }; //3898
// }

// async function restrictToLoggedinUserOnly(req,res,next){
//    // // const userUid = req.cookies?.uid;
//        const userUid = req.headers["Authorization"];

//     if(!userUid) return res.redirect("/login");
//    //  // if the user is not logged in then it is redirected to login url
//     const token=userUid.split('Bearer')[0]// "Bearer [23u123ukhdbheu]"
//      const user = getUser(token)
//     if(!user) return res.redirect("/login");
//     req.user = user;
//     next();

//     }

//     async function checkAuth(req,res,next) {
//      //   //const token = req.cookies?.uid;
//       const userUid = req.headers["authorization"];
//       const token=userUid.split('Bearer')[0]
//      const user = getUser(token)
//     req.user = user;
//     next();
//     }

    module.exports = {
        checkForAuthentication,
        restrictTo,
        // restrictToLoggedinUserOnly,
        // checkAuth,
    }