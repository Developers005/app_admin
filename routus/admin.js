const express = require('express');
const otp_generator=require('otp-generator')
const bcrypt = require('bcrypt');
const Joi = require('joi');
const adminModel = require('../schemas/admin');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
// const validator = require("email-validator");

const router = express.Router();


const verificationCodes = new Map();
const OTP=()=>{
    const otp=otp_generator.generate(6,{upperCaseAlphabets:true,specialChars:true,digits:true})
    return otp;
}



const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'Gmail',
    auth: {
      user:'covaitraveller@gmail.com',
      pass:'ghzn uprx hzdt xohh',
    },
  })
);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/register', async (req, res) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = schema.validate(req.body);
  console.log(error);
  if(error)
  {
    res.send({message:"no data recieved"})
  }
  const alreadyAdmin = await adminModel.findOne({ email: value.email });

  if (alreadyAdmin) {
    return res.json({ message: "User is already registered" });
  }
  
    const { email, password } = value;
    const hashedPassword = await bcrypt.hash(password,10);

    try {
      const data = await adminModel.create({ email, password: hashedPassword });
      console.log(data);
      return res.send({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error while registering user" });
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/forgot', async(req, res) => {
  try {
    
    const {email} = req.body;
    const ifuser=await adminModel.findOne({email})
    if(ifuser)
    {
      const num= OTP();
      console.log(num);
      const generatedCode = num ;
      const expireTime = 340 * 60 * 1000;
  
   
      verificationCodes.set(email, {
          code: generatedCode,
          expires: Date.now() + expireTime,
      });
      console.log(expireTime+Date.now());
    const mailOptions = {
      to: email,
      subject: 'Password Reset Verification Code',
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
      
              .header {
                  background-color: #007BFF;
                  color: #fff;
                  text-align: center;
                  padding: 20px;
              }
      
              .header h1 {
                  font-size: 24px;
              }
      
              .content {
                  padding: 20px;
              }
      
              .content p {
                  font-size: 16px;
              }
      
              .otp-code {
                  font-size: 28px;
                  text-align: center;
                  padding: 10px;
                  background-color: #007BFF;
                  color: #fff;
                  border-radius: 5px;
              }
      
              .footer {
                  text-align: center;
                  margin-top: 20px;
              }
      
              .footer p {
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>OTP Verification</h1>
              </div>
              <div class="content">
                  <p>Dear User,</p>
                  <p>Your OTP code for verification is:</p>
                  <div class="otp-code">${generatedCode}</div>
              </div>
              <div class="footer">
                  <p>This is an automated message, please do not reply.</p>
              </div>
          </div>
      </body>
      </html>
      
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Check your email for the verification code.');
      }
    });
  
    setTimeout(() => {
      verificationCodes.delete(email);
    }, expireTime);
  }
  else{
      res.send("email is not registered");
  }
  } catch (error) {
    console.log(error.message);
    res.send({message:"Internal server error"})
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const verifyCode = (req, res, next) => {
  try {
    const email = req.body.email;
    const code = req.body.code;
    const storedCode = verificationCodes.get(email);
    const time=Date.now()+(330*60*1000)
    console.log(storedCode);
    if (  (time > storedCode?.expires)) {
      res.send('Code Expired!');
    } else if( storedCode.code !== code){
      res.send('Invalid Code!');
      
    }else {
      next(); 
    }
    
  } catch (error) {
    console.log(error.message)
    res.send({message:"Internal server error"})
  }
};


router.post('/change-password', verifyCode, async (req, res) => {
  const { email, password } = req.body;
  const db_user = await adminModel.findOne({ email });

  if (!db_user) {
    return res.status(404).send({ message: "User not found" });
  }

  const comp =await bcrypt.compare(password, db_user.password);
  console.log(comp);
  if (comp) {
    return res.send({ message: "Don't use old password" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const find = { email: email };
  const update = { password: hashedPassword };
  const options = { new: true };

  try {
    const updatedDocument = await adminModel.findOneAndUpdate(find, update, options);

    if (updatedDocument) {
      console.log(updatedDocument);
      verificationCodes.delete(email);
      return res.status(200).send({ message:"Password changed" });
    } else {
      console.log("Document is empty");
      return res.status(404).send({ message:"Empty is not allowed" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message:"Password not changed" });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const find_user = await adminModel.findOne({ email });
    console.log(find_user.email)
    if (find_user) {
      const isPasswordValid = await bcrypt.compare(password, find_user.password);
      if (isPasswordValid) {
        console.log("logged in");
        res.send({ message: "login successful" });
      } else {
        console.log("Invalid password");
        res.send({ message: "Invalid password" });
      }
    } else {
      console.log("admin is not registered");
      res.send({ message: "admin is not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});






module.exports = router;
