const jwt=require("jsonwebtoken");
require("dotenv").config();

module.exports=function(req,res,next){
    const token=req.header("x-auth-token");
    if(!token) return res.status(401).send("Access denied, No token provided");
    try{
        const decoded=jwt.verify(token,process.env.JWTKEY);
        req.user=decoded;
        // console.log("decoded: ",decoded);
        next();
    }
    catch(ex){
        return res.status(400).send("Invalid Token!!");
    }
}