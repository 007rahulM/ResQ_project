
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
         const donation=await Donation.create({
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


//Get all donations with optional Geospatial filtering
//route GET/api/donations
//accessed by public no auth needed

const getDonations=async(req,res)=>{
    try{
        let query;
        //check did the user provide location params or not
        //then exprected format is it in lag and lat and raduis like format: ?lat=12.97&lng=77&radius=10 (in km)

        const{lat,lng,radius}=req.query;

        if(lat&&lng){
   //convert string to numbers 
   const latNum=parseFloat(lat);
   const lngNum=parseFloat(lng);
   const radNum=parseFloat(radius) ||10 ; //default 10 km if radius missing




            //geospatial search
            //earth rafuis=6378 km 
            //we drive raduis by earth raduis to get raduis for mongodb
//           const rad=radius || 10; //by default tak 10km if raduis is missing
            const raduisInRadians=radNum / 6378;
     
            query=Donation.find({
                location:{
                    $geoWithin:{
                        $centerSphere:[[lngNum,latNum],raduisInRadians]
                    }
                },
                status:"available" //only show available so donation find witht location with given dat and satus of food with available
                
            });
            
        }else{
            //normal search if no location proivded
            //just return everything sorted by newest
            query=Donation.find({status:"available"}).sort({createdAt:-1});
        }

        //execute the query
        //.populate("donor") replace the id 67335... with actual User data (Name,Phone)
        const donataions=await query.populate("donor","username phone");

        res.status(200).json({
            count:donataions.length, //number of donations found
            data:donataions
        });
}catch(err){
    console.error(err);
    res.status(500).json({message:"Server Error"});
}

};


module.exports={createDonation,getDonations};