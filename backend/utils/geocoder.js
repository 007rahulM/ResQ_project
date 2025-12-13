

const NodeGeocoder =require("node-geocoder"); //import the node geocoder package

//set up the geocode options 
const options={
    provider:"openstreetmap",  //using openstreetmap as the geocoding provider //free and open source 
    httpAdapter:"https", //https protocal
    formatter:null //no special formatting
};

const geocoder=NodeGeocoder(options); //initialize the geocoder with the options

module.exports=geocoder; 
