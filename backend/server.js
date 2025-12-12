
//imports all the necessary modules and tools 
const express=require("express");
const dotenv = require('dotenv');
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const connectDB=require("./config/db"); 
const path=require("path") //import the path module 


// load the secrets from .env
dotenv.config();

// connect to the database
//this will triggers the code in config/db.js
connectDB();

// initialize the app
const app=express();

const passport=require("passport");
require("./config/passport"); //
//middleware the security gurards
app.use(express.json());  //allows us to accepts json data in requests
app.use(cors());   //allows frontend to talk to backend
app.use(helmet());  //adds extra security headres
app.use(morgan("dev")); //give logs every request to the console its for give logs in development environment 

app.use(passport.initialize()); //initialize passport middleware from config/passport.js

app.use("/uploads",express.static(path.join(__dirname,"uploads"))); //make the uploads folder publically accessible

// a simple test route
app.get("/", (req,res)=>{
    res.send("ResQ Server is running...");
});

//register routs import and the route boht come here
const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);


//donation routes
const donationRoutes=require("./routes/donationRoutes");
app.use("/api/donations",donationRoutes);

// start listening
const PORT=process.env.PORT ||5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

