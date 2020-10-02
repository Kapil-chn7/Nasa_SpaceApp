require('dotenv').config();
const nodemailer=require('nodemailer');


const confirmation_email=function(OTPdetails)
{
return new Promise((resolve,reject)=>{



  console.log(process.env.PASSWORD,process.env.EMAIL);
  const transporter=nodemailer.createTransport({

    service:'gmail',
    auth:{
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOptions={
    to:OTPdetails.credentials.useremail,
    from:'chatter.com',
    subject:'testing',
    text:"this is from the text",
    html:"HI"+" "+OTPdetails.credentials.username+" "+"your one time password is "+OTPdetails.OTP+" thanks for visiting us :)",
    


  }

  transporter.sendMail(mailOptions,function(err,data){
    if(err){
      console.log("this is an error ",err)
    }
    else{
        console.log("sent");
        resolve("sent");
    }
  })


})

}

module.exports=confirmation_email;