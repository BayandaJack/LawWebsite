const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON and form data
app.use(express.static(__dirname));
app.use(express.json()); // For JSON data (if using fetch/axios)
app.use(express.urlencoded({ extended: true })); // For HTML form submissions

// POST endpoint
app.post('/send-email', async (req, res) => {
  const { name, cellno, email, legalproblem } = req.body; // Destructure from req.body
  //console.log('Received data:', { name, email, message });
  if (!name || !cellno || !email || !legalproblem) {
    return res.status(400).json({ error: 'Missing fields!' });
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.jackattorneysinc.co.za',
    port: 465,
    secure: true,
    auth: {
      user: 'law@jackattorneysinc.co.za',
      pass: 'Samson@2021'//'hibp rzqp ojlv pkxq', // Use app password
    },
  });

  const mailOptions = {
    from: email, // Sender name + email
    to: 'law@jackattorneysinc.co.za', // Recipient
    replyTo: email,
    subject: `Legal issue from ${name}`,
    text: `Name: ${name}\nCellno: ${cellno}\n\n${legalproblem}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
    console.log("Email sent sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

