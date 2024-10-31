export interface EmailTemplateData {
  userId?: string;
  userName: string;
  verificationLink?: string;
  [key: string]: any;
}

export const emailTemplates = {
  verification: (data: EmailTemplateData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .btn { 
          display: inline-block; 
          background-color: #4CAF50; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Verify Your Account, ${data.userName}!</h1>
        <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
        <a href="${data.verificationLink}" class="btn">Verify Email</a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you did not create an account, please ignore this email.</p>
      </div>
    </body>
    </html>
  `,

  // Add more email templates as needed
  welcome: (data: EmailTemplateData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Aboard!</title>
    </head>
    <body>
      <h1>Welcome, ${data.userName}!</h1>
      <p>We're excited to have you join us.</p>
    </body>
    </html>
  `,
};
