import nodemailer from 'nodemailer'
import getHtml from './getHtml.js'

function getSubject(template) {
  switch (template) {
    case 'welcome': 
    return 'Welcome to our social app ✔'
    case 'forgotpass':
      return 'Instructions on how to change your password at social app'
    default: ''
  }
}

export default async function main(token, template) {
  const data = {
    from: '"Social App MERN" <a.l.s.a.a.d.i.r.a.m.i.2.4@gmail.com>', // sender address
    to: 'a.l.s.a.a.d.i.r.a.m.i.2.4@gmail.com', // list of receivers
    subject: getSubject(template),
//    text: "plain text body",
    html: getHtml(template, token), // html body
  }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail(data);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }