const express=require("express");
const path = require("path");
const auth = require("../middlewares/auth");
const router=express.Router();

router.get("/register",(req,res)=>{
    const filePath = path.join(__dirname, '../views/register.html');
    res.sendFile(filePath);
});

router.get("/login",(req,res)=>{
    const filePath = path.join(__dirname, '../views/login.html');
    res.sendFile(filePath);
});

router.get("/secrete",auth,(req,res)=>{
    const filePath = path.join(__dirname, '../views/secret.html');
    res.sendFile(filePath);
});

router.get("/me",auth,(req,res)=>{
    const data=req.user;
    res.send(user);
})

module.exports=router;
