const express = require('express');
const { sendContactUsMail } = require('../services/emailService');  // Import the email sending function
const router = express.Router();

// POST route to handle Contact Us form submissions
router.post('/contact-us', async (req, res) => {
  const { fullName, email, phoneNo, message } = req.body;

  // Validate input data (you can add more validation logic here)
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // Send the contact form message via email
    await sendContactUsMail({ fullName, email, phoneNo, message });

    // Respond to the frontend that the message was successfully sent
    res.status(200).json({ success: 'Your message has been sent!' });
  } catch (error) {
    // Handle any errors (e.g., email sending failure)
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
