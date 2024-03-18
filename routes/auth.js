const jwt=require("jsonwebtoken");
const {User}=require("../models/user");
const bcrypt=require("bcrypt");
const express=require("express");
const Joi=require("joi");
const mongoose=require("mongoose");
const router=express.Router();
const path = require("path");
require('dotenv').config()


router.post("/login",async(req,res)=>{
    const {email, password}=req.body;
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user=await User.findOne({email});
    if(!user) return res.status(400).send("User Not Found");
    
    const validpassword=await bcrypt.compare(password,user.password);
    if(!validpassword) return res.status(400).send("Invlid Password");

    const jwttoken=jwt.sign({_id:user._id,name:user.name},process.env.JWTKEY);
    // const filePath = path.join(__dirname, '../views/secrete.html');
    return  res.status(200).send(jwttoken); 
});


const validate=(user)=>{
    const schema = Joi.object({
        email:Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(3).required(),
    });
    return schema.validate(user);
}

module.exports=router;