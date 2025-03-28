const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON and form data
app.use(express.json()); // For JSON data (if using fetch/axios)
app.use(express.urlencoded({ extended: true })); // For HTML form submissions

// POST endpoint
app.post('/send-email', async (req, res) => {
  const { name, cellno, email, message } = req.body; // Destructure from req.body
  //console.log('Received data:', { name, email, message });
  if (!name || !cellno || !email || !message) {
    return res.status(400).json({ error: 'Missing fields!' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bayanda45jack@gmail.com',
      pass: 'lmnjmvgydulywzai', // Use app password  lmnj mvgy duly wzai
    },
  });

  const mailOptions = {
    from: `"${name}"`, // Sender name + email
    to: 'bayanda45jack@gmail.com', // Recipient
    replyTo: email,
    subject: `Legal issue from ${name}`,
    text: `Name: ${name}\nCellno: ${cellno}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

