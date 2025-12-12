

const jwt=require("jsonwebtoken");
const User=require("../models/User");

const protect=async(req,resizeBy,next)=>{
    let token;

    //1 check if the token is present in the header
    //tokens are sent in the header like :"Authorization : Bearer <token..... >" like this 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //2 extract the token from the header
            //we remove the word bearer and get only the token part
            token=req.headers.authorization.split(" ")[1];//split by space and get the second part

            //3 verify the signature
            //this checks if the token was tamered with or not with jwt verify method 
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            //4 find the user from  the token payload
            //we look up the user in the DB excluding password field
            //we atach tehm to req.user so the controller can use req.user.id
            req.user=await User.findById(decoded.id).select("-password");

            // 5 pass to the next stage
            //next() means go to the next middlewar or controller right now go for controller 
            next();

        }catch(err){
            console.error(err);
            res.status(401).json({message:"Not authorized token failed"});

        }


    }if(!token){
        res.status(401).json({message:"Not authorized not token proivded"});
    }

};

module.exports={protect};
