const nodemailer=require("nodemailer"); //import the nodemailer the postman for sending emails

//the utility function to send mail
//thik of this fucntion as the mail truck 
//it needs 3 things to do it s job
//1 to : the destination adress eg:rahul@test.com
//2subject: the title on the envelope
//3 text: the content inside the email or letter

const sendEmail=async(to,subject,text)=>{
    //step 1 :setup the post offfice account
    //since we are in dev mode we dont user real gmail
    //we ask nodemialer ot rceate a fake account fo r us instantly
    let testAccount=await nodemailer.createTestAccount();

    //step 2 :create the transporter thr truck
    //this object tells node.js how to send the mail
    const transporter=nodemailer.createTransport({
        host:"smtp.ethereal.email", //the fake post office adress
        port:587, //the standard port or dorr for mail trucks or mail port
        secure:false, //true for 465 false for other ports
        auth:{
            user:testAccount.user, //generated ethereal user witht hte fake username
            pass:testAccount.pass, //generated ethereal password with the fake password 

        },
    });
   //step 3 send the mail
   //the trcuk leaves the station here
   const info=await transporter.sendMail({
    from:'"ResQ Team"<admin@resq.com>', //the sender name
    to:to, //the receiver 
    subject:subject, //subject line
    text:text, //the content of the email plain text verison
    html:`<b>${text}</b>` //html versipn bold text with the link


   });

   //step 4 proof of delievry
   //since this is fake it wont land in your gamil
   //instead it gives us a url to view the message online
   console.log("Message sendt: %s", info.messageId);
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

};



module.exports=sendEmail;