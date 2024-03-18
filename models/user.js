const mongoose=require("mongoose");
const Joi=require("joi");

const User=mongoose.model("user",new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:25
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    }
    }));

const validate=(user)=>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).required(),
    });
    return schema.validate(user);
}

exports.User=User;
exports.validate=validate;