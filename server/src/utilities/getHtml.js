export default function getHtml(template, token) {
  switch (template) {
    case "welcome":
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
          <!--<![endif]-->
          <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet" />
          <style>
              body {
                  font-family: "Muli", sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #000000;
                  min-height: 70vh;
                  width: 100%;
                  color: #fff;
              }
          </style>
      
      <body>
          <p>Welcome to Social App!</p>
          <span style="font-size: 18px;">Please verify your email address </span>
          <span style="color: #000000; font-size: 18px; font-family: arial, helvetica, sans-serif;">
              to get access to logging in</span>
          <p>Kindly click the following link {{verificationLink}} to verify your account</p>
          <a href="https://social-app-client-mern.vercel.app/emailverification/${token}">
              Verify your account
          </a>
      </body>
      
      </html>
            `;
    case "forgotpass":
      return `
            <!DOCTYPE html>
            <html>
              <body style="margin: 0; padding: 0;background-color: #000000;min-height:70vh;width:100%;color:#fff;">
                <p>Instructions to change your password:</p>
                <p>Click the following link to change your password</p>
                <a href="http://localhost:3000/changepassword/${token}">Change your password</a>
              </body>
            </html>
            `;
  }
}
