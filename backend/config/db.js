
const mongoose=require("mongoose");

//we use an asunc function because connecting takes time

const connectDB=async()=>{
    try{
        // attempt o connect to the adrress in .env
        //await means dont moce to th enext line until is done
        const conn=await mongoose.connect(process.env.MONGO_URI);

        //success message
        //conn.connection.jost tells us exactly what we connected to si it shold be 127.0.0.1
        console.log(`MongoDB Connected:${conn.connection.host}`);

    }catch(err){
        //error handler
        //if the docker container is off this will run
        console.error(`Error:${err.message}`);

        //exit the process with failure (1)
        //there is no point keeping the server running if the db is dead
        process.exit(1);
    }
};

module.exports=connectDB;