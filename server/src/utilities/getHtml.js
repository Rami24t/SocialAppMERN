export default function getHtml(template, token) {
    switch (template) {
        case 'welcome': 
            return `
            <!DOCTYPE html>
            <html>
              <body style="margin: 0; padding: 0;background-color: #000000;min-height:70vh;width:100%;color:#fff;">
                <p>Welcome to our Social App!</p>
                <p>Kindly click the following link to verify your email address</p>
                <a href="http://localhost:3000/emailconfirm/${token}">Verify your email</a>
              </body>
            </html>
            `
        case 'forgotpass':
            return `
            <!DOCTYPE html>
            <html>
              <body style="margin: 0; padding: 0;background-color: #000000;min-height:70vh;width:100%;color:#fff;">
                <p>Instructions to change your password:</p>
                <p>Click the following link to change your password</p>
                <a href="http://localhost:3000/changepassword/${token}">Change your password</a>
              </body>
            </html>
            `
    }
}