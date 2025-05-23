const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const sendEmailToVoter = async ({email,user_name, nominee_image}) => {
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


/**
 * Function to send the congratulation mail to the nominee
 */
const sendNomineeCongratulationMail = async({email}) => {
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
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Congratulations!</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center;">
            <table style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <tr>
                    <td style="text-align: center;">
                        <h1 style="color: #2c3e50;">🎉 Congratulations! 🎉</h1>
                        <p style="font-size: 16px; color: #555;">We are thrilled to celebrate your achievement! Your hard work and dedication have truly paid off.</p>
                        <p style="font-size: 16px; color: #555;">Enjoy this moment—you've earned it!</p>
                        <a href="#" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">Celebrate Now</a>
                    </td>
                </tr>
            </table>
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
}



/**
 * Function to send the you got a vote mail to the nominee
 */
const sendYouGotVoteMailToNominee = async({email,nominee_name,voter_name,nomination_category}) => {
  try {
    console.log("call...........22222222222")
      // Configure the SMTP transporter
      const nominee_mail_transporter = nodemailer.createTransport({       // Create a transporter
        host: process.env.BREVO_SMTP_HOST, // Brevo SMTP host
        port: process.env.BREVO_SMTP_PORT, // Use 587 for TLS or 465 for SSL
        secure: false, // False for 587, true for 465
        auth: {
          user: process.env.BREVO_SMTP_USER, // Replace with your Brevo email
          pass: process.env.BREVO_SMTP_PASS, // Replace with your SMTP password
        },
      });
      const mailOptions = {
        from: '"AI Wellness" <team@aiwellness.ai>',
        to: email, // recipient nominee's email
        subject: "You’ve Been Voted for Angels of Alignment – Let’s Transform Wellness Together",
        html: `
        <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Angels of Alignment Nomination</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <p>Hi ${nominee_name},</p>
      
              <p>You’ve just received a vote from <strong>${voter_name}</strong> for the <strong>Angels of Alignment Awards</strong> under the <strong>${nomination_category}</strong> category as part of <strong>Mission 2025</strong> at AI Wellness.</p>
      
              <p>We’re excited to see the momentum building around your name. This nomination means someone sees you as a true leader in AI-powered health, wellness, and longevity — and now, the world will too.</p>
      
              <hr>
      
              <h3>About AI Wellness & Mission 2025</h3>
              <p><strong>AI Wellness Mission 2025</strong>, themed <em>Infinite Wellness – The New Human Era</em>, is a global movement aligning leaders, innovators, and changemakers in artificial intelligence, health, and human optimization.</p>
      
              <p>Our mission is to build a unified ecosystem that bridges science, wellness, and technology — helping people live longer, healthier, and more empowered lives.</p>
      
              <p>In 2025, our work will focus on four powerful pillars:</p>
              <ol>
                <li><strong>Angels of Alignment</strong> – Honoring the Top 111 global pioneers in AI-driven health, wellness, and longevity</li>
                <li><strong>AI Wellness Platinum Network</strong> – A curated community of experts developing impactful wellness programs across 13 pillars of health</li>
                <li><strong>AI Wellness Pavilion</strong> – A high-visibility platform at global events like Fit Expo, Mr. Olympia, and AI Wellness Korea, featuring smart vending, digital avatars, AI robots, and more</li>
                <li><strong>Infinite Wellness: The New Human Era</strong> – Our global documentary capturing the innovators and stories reshaping the future of health and human potential</li>
              </ol>
      
              <p>As a nominee, your journey is just beginning — and we would love to see you officially take your place in this global movement.</p>
      
              <hr>
      
              <h3>How to Confirm Your Spot</h3>
              <p>You’ll be recognized as a confirmed <strong>Angels of Alignment</strong> honoree if you:</p>
              <ul>
                  <li>Receive 50+ public votes</li>
                  <li>Register your interest in participating</li>
                  <li>Activate your network to support your nomination</li>
              </ul>
      
              <p>This initiative goes far beyond recognition. It’s about joining a dynamic platform that’s shaping real, lasting change in global health, wellness, and longevity.</p>
      
              <hr>
      
              <h3>Ready to Be Counted?</h3>
              <p><a href="https://aiwellness.ai/angels-of-alignment-2025-registration-form/" style="color: #0056b3; text-decoration: none;" target="_blank">Register now to confirm your interest</a></p>
      
              <p>We’re excited to have you on this journey. Whether through public votes, digital integrations, or live global appearances — your presence and participation can help shape the future of wellness for generations to come.</p>
      
              <p>Let’s make history,</p>
      
              <p><strong>The AI Wellness Team</strong><br>
              <a href="https://aiwellness.ai" target="_blank">aiwellness.ai</a></p>
          </body>
        </html>`
      };
      console.log("mailOptions",mailOptions)  
    // Send the email
    let info = await nominee_mail_transporter.sendMail(mailOptions);
    console.log("info22222222222222222-------", info)
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }

}



module.exports = {
    sendEmailToVoter,
    sendNomineeCongratulationMail,
    sendYouGotVoteMailToNominee
}

