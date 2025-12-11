
const mongoose=require("mongoose");

//the blueprint
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true ,"Please add a name"],  //[validation rule,error message]
        trim:true // " rahul " becomes "rahul" automatically cleary or remove the extra messages

    },

    email:{
        type:String,
        required:[true,"Please add an email"],
        unique:true, //create a database index so that no duplicates can entere
        match:[
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         "Please add a valid email" //regex validation to ensure it looks like an email its basic email validation from regex

        ],
    },

    // hybrid login support password can be optional 
    //password : not required for google users
    //we enforce "Password required " in the register controller for email users
    password:{
        type:String,
        required:false, //[true,"Please add a password"],  //we make this not required so that it becomes optional
        minlength: 6,
        select: false //do not return password by default in queries
    },

    //googel id :only for Google Users
    //spare :true is critical it ells mongo that
    //its okay if 1000 users have null forf this field only check uniqneness if a value exists
    //sore the google id so we recognize them next time
    googleId:{
        type:String,
        unique:true,
        sparse:true //allows mutliple users to have " null" googleId (if they use email/pass)
    },

    role:{
        type:String,
        enum:["donor","ngo","admin","volunteer"], //strict contol who the role to be from enum no other can be acces it shoukd be within one of them 

    },
    //for the resq logic
    phone:{
     type:String,
     default:"Not provided"
    },

    address:{
        type:String,
        default:"Not provided"
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    //new  fields for security fields
    //pocket 1 the staus checkboc
    //boolean means true/false
    //default its false means guilty until proven incconet evyer nre user starts  as unverified 
    isVerified:{
        type:Boolean,
        default:false
    },
    //pocket 2 the secret ticker holder 
    //we store the random string  here 
    //select fasle is a sececurirty rule
    //it meand if i search for this user  dont not show me this token unless I ask for it
    //why? so we dont accidentally leak the secret ticket to thr frontend
    verificationToken:{
        type:String,
        select:false
    }
});

//compile the blueprint into a model
//this creates a collection names "users plural in mongoDB"

module.exports=mongoose.model("User",UserSchema);