const {User, validate}=require("../models/user");
const bcrypt=require("bcrypt");
const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.post("/register",async(req,res)=>{
    const {name, email, password}=req.body;
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user=await User.findOne({email});
    if(user) return res.status(400).send("User already exist");
    let hpass;
    
    const salt=await bcrypt.genSalt(10);
    const hashedpass=await bcrypt.hash(password,salt);
    user=new User({
        name:name,
        email:email,
        password:hashedpass
    })
    await user.save();
    const jwttoken=jwt.sign({_id:user._id,name:user.name, email:email},process.env.JWTKEY);
    return  res.header("x-auth-token",jwttoken)
                .header("access-control-expose-headers","x-auth-token")
                .send({name,email,id:user._id,token:jwttoken}); 
});
module.exports=router;