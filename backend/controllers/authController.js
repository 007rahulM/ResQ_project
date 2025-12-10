
const User=require("../models/User");  //import the  model 
const bcrypt=require("bcryptjs");   //impot bcrypt for hashing passwords
const jwt=require("jsonwebtoken");  //import jsonwebtoken for creating tokends the keycard maker
const crypto=require("crypto"); // tools to generate random strings for verification tokens
const sendEmail=require("../utils/sendemail"); //the mailmam utility to send emails

//helper function to generate token
//this creates the wristband the token that allows access
//it takes the user id and sings it with our secret key from .env

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"  //the token is valid for 30days

    });
};

//register a new user
//route will be POST  /api/auth/register
//public access

const registerUser=async(req,res)=>{
    try{
        // 1 destructure or pull data out of the box form request body
        const {username,email,password,role,phone,address}=req.body;

        //2 validation chek if everything is filled 
        if(!username || !email || ! password){
            return res.status(400).json({ message:"Please fill in all required fields"});
        }

    //3 chek fo rduplicate ask db if email exists
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }


    // the new lofic starts here
    // generate a secreet ticket called verification token
    //crypto.randomBytes(20) creats 20 random characters
    //.toString("hex") converts them into readable text like "abcscerjeo"

    const verifyToken=crypto.randomBytes(20).toString('hex');


      //4 if user not exists 
      //creat a new user and hash the password
      //hashing is genearating a salt a random data to make the hash unique

      const salt =await bcrypt.genSalt(10);  
      // mis the password with the salt and shred it into a hash

      const hashedPassword=await bcrypt.hash(password,salt);

      //5 create a new user 
      const user =await User.create({
        username,email,password:hashedPassword, //save the hash not the palin password
        role,phone,address, verificationToken:verifyToken // saving the ticke which generated in teh new user but when we confirm that ticket then verify gets true 
      });
   
      // write the letter construct the email
      //this is the link the user will click
      //it points to our backend verify route 

      const verifyUrl=`http://localhost:5000/api/auth/verify/${verifyToken}`;

      const message=`<h1>Welcome to ResQ! </h1>
                    <p>Please verify your email to unlock your account</p>
                     ${verifyUrl}
      
      `;

      //send the email call the mailman 
      try{
        await sendEmail(user.email,"ResQ - Verify Your Email",message);
        //if successfull, we log it 
        console.log("Verification email sent to:", user,email);

      }
      catch(err){
        console.log("Email failed  to send:",err);
        //note in a real app, we might delte the user if email fails
        //for now we keep them but they stay unverified
      }

      //send response 
      //we tell the frontend :"CReated now g o cehk your email"
      res.status(201).json({
        message:"User Registration Successful! Please check your email to verify",
        token:verifyToken //only for testing purpose right now
      });






      //6 success response send back the user info +the token genrated
    //   if(user){
    //     res.status(201).json({
    //        _id:user.id,
    //        username:user.username,
    //        email:user.email,
    //        role:user.role,
    //        token:generateToken(user.id)  //the keycard or the badge is created at sent here 


    //     });

        
    // }
    // else{
    //     res.status(400).json({message:"Invalid user data"});
    //   }
    
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
};


// ------ Authenticate a user and get token  ---- LOGIN logic
// route   POST /api/auth/login
//access its public too 

const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
     //1 chek email does this user even exist in the db like is he register ?
     const user=await User.findOne({email}).select("+password");
     //note we used .select("+password") here because we defined select:false in the user model
     //we expilictly need the passwor not o comapre it and chek so wee added it 

     if(!user){
        //secruity :dont say emial not found  instead just ssay invalid credentials 
        //this prevents hackers from guessing which emails are real
        return res.status(400).json({message:"Invalid credentials"});
     }

     //2 so if user exists then check the password 
     //compare the plain text passwor dwoht the hashed paassword in th db
     const isMatch= await bcrypt.compare(password,user.password);

     if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
     }

     // 3 success then issues it with the tokeb
     res.status(200).json({
        _id:user.id,
        username:user.username,
        email:user.email,
        role:user.role,
        token:generateToken(user.id)
     });


    } catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }

};

//veify User email
//GET /api/auth/verify/:token
//public access

const verifyUser=async(req,res)=>{
    try{
        //1 get the ticket from the url
        //req.params.token  grabs the "ahh33erfef..." part
        const {token}=req.params;

        //2 search for a user witth this ticket 
        ///search the cabinet
        //we look for a user where verificationToken matches the one provided
        const user=await User.findOne({verificationToken:token});

        if(!user){
            return res.status(400).json({message:"Invalid or Expired token"});
        }
   

        //3 the stamp update use
        user.isVerified=true; //mark as real
        user.verificationToken=undefined; //throw away the used tickect

        await user.save(); //save changes to the db

        //4 success response
        res.status(200).json({message:"Email Verified successfully! you can now login"});

}catch(err){
    console.error(err);
    res.status(500).json({message:"Server Error"});
}

};




module.exports={registerUser,loginUser,verifyUser};