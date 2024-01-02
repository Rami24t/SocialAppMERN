import sgMail from "@sendgrid/mail";
import getSubject from "./getSubject.js";
import getHtml from "./getHtml.js";
import dotenv from "dotenv";
dotenv.config();
// using Twilio SendGrid's v3 Node.js Library; https://github.com/sendgrid/sendgrid-nodejs

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(token, template = "welcome") {
  const msgData = {
    to: "al.s.a.ad.i.ra.m.i.2.4@gmail.com", // recipient
    from: "rami.s.s.aadi@gmail.com", // verified sender
    subject: getSubject(template),
    text: `Welcome to Social App! Please Verify Your Email Address to complete your registration.

    Welcome in Social Posts!
    
    Please verify your email address to get access to logging in. ( https://social-app-client-mern.vercel.app/verify/${token} )
    *Thank you!*
    
    Verify Email Now ( https://social-app-client-mern.vercel.app/verify/${token} )
    
    *Here’s what happens next:*
    
    1. Add a profile image.
    
    2. Add other profile information .
    
    3. Get access to the social wall where you can view and comment on all posts and even add your own *!*
    
    Need support? Our support team is always
    ready to help!
    
    Contact Support`,
    html: getHtml(template, token),
    verificationLink: `https://social-app-client-mern.vercel.app/verify/${token}`,
    name: "Rami",
  };

  sgMail
    .send(msgData)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default sendEmail;
