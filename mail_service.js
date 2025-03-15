const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const sendEmail = async ({email,user_name, nominee_image}) => {
  try {
    console.log("call...........111111111111")
    console.log("user_name",user_name)
      // Configure the SMTP transporter
      const transporter = nodemailer.createTransport({       // Create a transporter
        host: process.env.BREVO_SMTP_HOST, // Brevo SMTP host
        port: process.env.BREVO_SMTP_PORT, // Use 587 for TLS or 465 for SSL
        secure: false, // False for 587, true for 465
        auth: {
          user: process.env.BREVO_SMTP_USER, // Replace with your Brevo email
          pass: process.env.BREVO_SMTP_PASS, // Replace with your SMTP password
        },
      });
      // Email options
      const mailOptions = {
        from: '"AI Wellness" <team@aiwellness.ai>',
        to: email,
        subject: "Your Vote is In – Thank You for Shaping the Future of AI Wellness!",
        html: `
        <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Vote Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
              <p>Dear ${user_name},</p>
              
              <h2>Your vote has been counted! </h2>

              <div style="text-align: center;">
                  <img src=${nominee_image} alt="Thank You" style="width: 150px; height: auto;">
              </div>
              
              <p>Thank you for being part of the <strong>Angels of Alignment Initiative</strong> and helping to select the pioneers shaping the future of AI-driven wellness, longevity, and human optimization.</p>
              
              <p>Your support is making an impact—each vote helps ensure the most innovative and forward-thinking leaders stay in the running to be part of the <strong>Top 111</strong>.</p>
              
              <h3>What’s Next?</h3>
              <ul>
                  <li> <strong>Keep voting!</strong> Remember, nominees must receive votes weekly to stay in the competition.</li>
                  <li> <strong>Spread the word!</strong> Share the voting link with your community to keep your favorite nominees in the race.</li>
                  <li> <strong>Stay tuned!</strong> Winners will be announced on <strong>July 11, 2025</strong> at the <strong>Angels of Alignment Awards in Las Vegas</strong>.</li>
              </ul>
              
              <h3> Want to do more?</h3>
              <p>Follow us for exclusive updates on the <strong>AI Wellness Pavilion at Mr. Olympia</strong> and the world premiere of <strong>Infinite Wellness: The New Human Era</strong>.</p>
              
              <h3> Follow Us & Stay Connected</h3>
              
              <p>Thank you for being a vital part of this movement—your vote is helping shape the future of AI-driven wellness!</p>
              
              <p><strong>The AI Wellness Team</strong><br>
               AI Wellness Platinum Network<br>
               <strong>Voting Closes:</strong> May 15, 2025<br>
               <a href="https://angelsofalignment.org/vote" style="color: blue; text-decoration: none;" target="_blank">Vote Again Here</a>
              
              <p><strong>P.S.</strong> Eliminations start <strong>March 1</strong>! Keep your favorite nominees in the race by voting weekly! </p>
          </body>
      </html>`,
      };
      console.log("mailOptions",mailOptions)  
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("info-------", info)
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
    sendEmail
}

