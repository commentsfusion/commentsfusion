// const nodemailer = require('nodemailer');
// const config = require('../config/config');  // Ensure your config path is correct

// // Create Nodemailer transporter with Zoho's SMTP configuration
// const transporter = nodemailer.createTransport({
//   host: config.email.smtp.host,  // Zoho SMTP host
//   port: config.email.smtp.port,  // Port (587 or 465 depending on your settings)
//   secure: config.email.smtp.secure,  // false for 587, true for 465
//   requireTLS: config.email.smtp.requireTLS,  // Use TLS for secure communication
//   auth: {
//     user: config.email.smtp.auth.user,  // Zoho email address
//     pass: config.email.smtp.auth.pass,  // Zoho password
//   },
// });

// // Function to send Contact Us message via email
// async function sendContactUsMail(formData) {
//   try {
//     // Prepare the email options using form data
//     const mailOptions = {
//       from: config.email.smtp.auth.user,  // Sender's email (Zoho)
//       to: 'arslan@commentsfusion.com',   // Recipient email
//       subject: 'New Contact Us Message',  // Email subject
//       text: `You have received a new message from ${formData.fullName} (${formData.email})\n\nMessage:\n${formData.message}`,  // Message body
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Contact Us message sent successfully!');
//     console.log('Message ID:', info.messageId);  // Log the message ID to confirm email was sent
//     console.log('Message sent to:', mailOptions.to);  // Log the recipient email

//   } catch (error) {
//     console.error('Error sending Contact Us message:', error);
//     if (error.response) {
//       console.error('SMTP Error Response:', error.response);  // Log SMTP response if available
//     }
//     throw new Error('Failed to send the email');
//   }
// }


// module.exports = { sendContactUsMail };
// src/services/emailService.js
const nodemailer = require('nodemailer');
const config = require('../config/config'); // Importing the config file to use the environment variables

// Create the Nodemailer transporter with the SMTP settings from config.js
const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,      // SMTP host (from environment variable)
  port: config.email.smtp.port,      // SMTP port (from environment variable)
  secure: config.email.smtp.secure,  // Whether to use SSL/TLS (from environment variable)
  auth: {
    user: config.email.smtp.auth.user,  // SMTP user (from environment variable)
    pass: config.email.smtp.auth.pass,  // SMTP pass (from environment variable)
  },
});


async function sendContactUsMail(formData) {
  try {
    const mailOptions = {
      from: formData.senderEmail || config.email.smtp.auth.user,  
      to: config.email.contactUsEmail,  
      subject: 'New Contact Us Message',  
      text: `You have received a new message from ${formData.fullName} (${formData.email})\n\nMessage:\n${formData.message}`,
    };

    const info = await transporter.sendMail(mailOptions); 

  } catch (error) {
    
    if (error.response) {
      
    }
    throw new Error('Failed to send the email');
  }
}

module.exports = { sendContactUsMail };
