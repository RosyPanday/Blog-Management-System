const { users } = require("../database/connection");

const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const verifyToken =(req,res,next)=>{
    const token= req.headers.authorization?.split("")[1];
    if(!token){
        return res.status(401).json({
            message:"Access Denied. No token provided."
        })
    }

    //token is present?

    try{
        const secret=process.env.JWT_SECRET_key;
        const decoded = jwt.verify(token,secret);
        req.user =decoded;
        next();
    }catch(err){
        return res.status(403).json({
            message:"403 forbidden. invalid token".err,
        })
    }


};

const registerUser =async(req,res)=>{
    try{
        const {usersEmail,usersPassword,usersRole}=req.body;
    let userExists= await users.findOne({
        where:{usersEmail},
    });
    
    if(userExists){
        //err status of 400 is bad request, client side error
        return res.status(400).json({
            message:"user already exists",
        })
    }

    //so user doesnt exist?

    const hashedPasword=await bcrypt.hash(usersPassword,10);

    await users.create({
        usersEmail,
        usersPassword:hashedPasword,
        usersRole,
    });

   return res.json({
        message:"user registered successfully",
    })
    }
    catch(err){
        //The HTTP 500 Internal Server Error is a generic response code that means the server encountered an unexpected condition that prevented it from fulfilling the request.

        return res.status(500).json({
            message:"internal serer error".err.message,
        })
    }

};

//login

const loginUser =async(req,res)=>{
    try{
       
        const {usersEmail,usersPassword}=req.body;
         
        let userExisting =await users.findOne({
            where :{usersEmail},
        })
        //404 =the server could not find the specific resource (page, file, image) that was requested.
        if(!userExisting){
            return res.status(404).json({
                message:"user with given email not found",
            })
        }
        //but if user exists?
        //It returns a Promise that resolves to a boolean:
     const isMatch = await bcrypt.compare(usersPassword, userExisitng.usersPassword);

       if(!Match){
        return res.status(400).json({
            message:"invalid password",
        })
       }

       //but if password matches?

       const token = jwt.sign(
             {
                id: userExisting.id,
                usersRole:userExisting.usersRole,
             },
             process.env.JWT_SECRET_KEY,
             {expiresIn:"1d"}
       );
       return res.json({
        message:"login sucesssful",token,
       });

    } catch(err){
        res.status(500).json({
            message:"internal server error".err.message,
        })
    };
};

module.exports={registerUser,loginUser,verifyToken};