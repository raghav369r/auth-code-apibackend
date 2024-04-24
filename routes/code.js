const express=require("express");
const axios=require("axios");
const router=express.Router();
require("dotenv").config();
const {RUN_URL}=require("../constants");


router.get("/",async(req,res)=>{
    res.json({name:"hlo bro",val:"value"});
});

router.post("/run",async(req,res)=>{
    const {code, language, stdin}=req.body;
    const URL=RUN_URL+(language=="py"?"python":language)+"/latest"
    const name="main."+language;
    const headers = {
        "Authorization":process.env.API_KEY,
        "Content-type":"application/json",
    };
      const data = {
        stdin:stdin,
        files: [
          {
            name: name,
            content: code,
          },
        ],
      };
      const output=await axios.post(URL, data, { headers });
      res.status(200).send(output.data);
});



module.exports=router;