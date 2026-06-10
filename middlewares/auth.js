const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;
    if(
        !authorizationHeaderValue ||
        !authorizationHeaderValue.startsWith("Bearer"))
        return next();

        const token = authorizationHeaderValue.split('Bearer')[1]
        const user=getUser(token);

        req.user= user;
        return next();
}

function restrictTo(roles) {
    return function (req,res,next){
        if(!req.user) return res.redirect("/login")
    }; //3898
}

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
        restrictToLoggedinUserOnly,
        checkAuth,
    }