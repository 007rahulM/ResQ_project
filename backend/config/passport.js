
const passport=require("passport");  //import passport to talk with the google with googel language and do our task
const GoogleStrategy=require("passport-google-oauth20").Strategy;  //import the passport -google-oauth20 the fiploamt who know google laguage for oauth .strategy is i dont knwo right now its something i guess
const User=require("../models/User"); //impory our cheft user model for the schema or the structure

//the strategy
//this tells passport how to use our google keys
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"   //where google send the user back to us
},
 
//the handsake function
//this runs after the user clicks "alllow on the google screeen"
//accessToken: the valet key (we dont need it for this app ,but its there)
//refreshToken: Used to get a new key if the old one expires
//profile: the user's google info(name,email,photo)
//done: a fuction we call to tell prassport  "we are finfihed"

async(accessToken,refreshToken,profile,done)=>{
    try{
        console.log("Google Profile:", profile); //debigging lime see what Google sent us

        // 1 Check do we already know this user?
        const existingUser=await User.findOne({googleId:profile.id});

        if(existingUser){
            //if yes then tehy exist log them in
            return done(null,existingUser); //null means no error 
        }

        //2 check :wait , maybe they signed up with emal before?
        //if email matches, we should just link the accounts
        //this is called account linking or account merging

        const userWithSameEmail=await User.findOne({email:profile.emails[0].value}); //the value means the actual email string , the profile.emails[0].value means the first email in the array

        if(userWithSameEmail){
            //link account :save their google id to their old account

            userWithSameEmail.googleId=profile.id;
            await userWithSameEmail.save();
            return done(null,userWithSameEmail);
        }

        //3 no :new user creat an account
        const newUser=await User.create({
            username:profile.displayName,
            email:profile.emails[0].value,
            googleId:profile.id,
            isVerified:true, //googel verified them , so we trust them
            role:"donor",  //default role  is donor
            password:null  //no password needed for the google users
        });

        return done(null,newUser);

    }catch(err){
        console.error(err);
        return done(err,null);
    }
}

));