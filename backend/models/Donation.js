
const mongoose=require("mongoose");
const geocoder=require("../utils/geocoder"); //import the geocoder utility


const DonationSchema=new mongoose.Schema({
    //whip posted this linking it 
    //we sotre the user ud here this like a foreign key in sql like that but we sotre here in the model itself 
   //we want to know who is the donar is so we use the user id as a reference here 
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //referess tot the user model  user id
        required:true
    },

    title:{
  type:String,
  required:[true,"Please  add a title  like (eg., Rice & Beans)"],
  trim:true

    },

    description:{
        type:String, 
        required:[true,"Please add a description"]
    },

    quantity:{
        type:String, //eg 5kg or 10 packets 
        required:[true,"Please add quantity of food in kg or plackets like that"]
    },
 
    //image path : we dont store the image here we store the url string
    image:{
        type:String,
        default:"no-photo.jpg" //if no image is uploaded this will be the default value
    },

    // status the state machine
    //available ->claimed by NGO->Picked up( completed)
    status:{
        type:String,
        enum:["available","claimed","picked_up"],
        default:"available"
    },

    //location of the food donation

    //geospatial data
    address:{
        type:String,
        required:[true,"Please add an adress where the food is located"]

    },
    location:{
      type:{
        type:String,
        enum:["Point"] // GeoJSON Standard
      },
      coordinates:{
        type:[Number], //[longitude, latitude] numbers
        index:"2dsphere" // enables find nearby by this 2sphere
      },
      formattedAddress:String   //formated evrtying into a stingle string
    },

    expiresAt:{
        type:Date,
        required:[true,"Please add expiration date and time like When does this food spoils?"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

//pre-save hook so its an auto convert adress to coordinates
DonationSchema.pre("save",async function(){
    if(!this.isModified("address")){
     return; //just retyrn next if address is not modified
    }
    const loc=await geocoder.geocode(this.address);
    console.log("GEOCODER RESULT:", loc); 
    // ------------------------

    // Ensure we actually got a result before crashing
    if (loc.length === 0) {
        console.log("ERROR: Address not found!");
        return; 
    }
    this.location={
        type:"Point",
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress
    };

   //clean up 
   this.address=undefined;// opyional Don't save raw address string
});



module.exports=mongoose.model("Donation",DonationSchema);