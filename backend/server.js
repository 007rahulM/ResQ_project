
//imports all the necessary modules and tools 
const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const connectDB=require("./config/db");  


// load the secrets from .env
dotenv.config();

// connect to the database
//this will triggers the code in config/db.js
connectDB();

// initialize the app
const app=express();

//middleware the security gurards
app.use(express.json());  //allows us to accepts json data in requests
app.use(cors());   //allows frontend to talk to backend
app.use(helmet());  //adds extra security headres
app.use(morgan("dev")); //give logs every request to the console its for give logs in development environment 


// a simple test route
app.get("/", (req,res)=>{
    res.send("ResQ Server is running...");
});

//register routs import and the route boht come here
const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

// start listening
const PORT=process.env.PORT ||5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

