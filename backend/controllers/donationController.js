
const Donation=require("../models/Donation"); //import the donation model 

//Create a new donataion
//POST /api/donations
//accessed by autheticated user only its private only looged in users can access

const createDonation=async(req,res)=>{
    try{
        //1 check the machine multer
        //multer in congif ran before this controller function //
        //it process the file and put the deaitls in req.file

        if(!req.file){
            return res.status(400).json({message:"Please upload a food image"});
        }

         //2 get the ingredients from teh text data form the body
         //get the all provide data or need data from the body
         const{title,description,quantity,address,expiresAt}=req.body;

         //3 validation if user send all teh data
         if(!title || !description || ! quantity || !address || !expiresAt){
            return res.status(400).json({message:"Please fill all the fields"});

         }

         //4 create a doation object
         //notice we get donor from req.user.id because they are loggedin via jwt
         const donation=new Donation({
            donor:req.user.id,
            title,
            description,
            address,
            quantity,
            expiresAt,
            image:req.file.path // we save the path string in the db not the bonary data so the space is less taken

         });


         //return the created success status
         res.status(201).json(donation); //it return 201 atatus created and proivde the donation object 

    }catch(err){
        console.error(err);
    res.status(500).json({message:"Server Error"});
    }
};

module.exports={createDonation};