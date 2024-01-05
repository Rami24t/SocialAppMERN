import sgMail from "@sendgrid/mail";
import getSubject from "./getSubject.js";
import getHtml from "./getHtml.js";
import dotenv from "dotenv";
dotenv.config();
// using Twilio SendGrid's v3 Node.js Library; https://github.com/sendgrid/sendgrid-nodejs

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const contactLink = process.env.CONTACT_LINK;

async function sendEmail(
  token,
  template = "welcome",
  recipientsEmail = "",
  userName = ""
) {
  const verificationLink = `https://social-app-client-mern.vercel.app/emailverification/${token}`;
  const msgData = {
    to: "al.s.a.ad.i.ra.m.i.2.4@gmail.com", // recipientsEmail,
    from: process.env.SENDGRID_API_SENDER_EMAIL,
    subject: getSubject(template),
    text: `Welcome to Social App! Please Verify Your Email Address to complete your registration.

    Welcome in Social Posts!
    
    Please verify your email address to get access to logging in. ( ${verificationLink} )
    *Thank you!*
    
    Verify Email Now ( ${verificationLink} )
    
    *Here’s what happens next:*
    
    1. Add a profile image.
    
    2. Add other profile information.
    
    3. Get access to the social wall where you can view and comment on all posts and even add your own *!*

    Need support? Our support team is always
    ready to help!

    Contact Support ( ${contactLink} )

    If you did not register this email on Social App, kindly ignore this email.
    
    Regards,
    The Social App Team`,
    html: getHtml(template, token, recipientsEmail),
    templateId: process.env.SENDGRID_API_TEMPLATE_ID,
    dynamic_template_data: {
      userName: userName,
      verificationLink: verificationLink,
      recipientsEmail: recipientsEmail,
      contactLink: contactLink,
    },
  };

  return sgMail
    .send(msgData)
    .then((data) => {
      console.log("Email sent, ", data[0].statusCode);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default sendEmail;
