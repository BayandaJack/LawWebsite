window.onload = function() {
    window.scrollTo(0, 0);
};

let button = document.getElementById(formButton);
button.onclick = function(){
    let username = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let issue = document.getElementById("legalproblem").value;
}

///
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS if frontend is on a different domain

// POST endpoint to handle form submission
app.post('/#contactUs', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure Nodemailer (using Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bayanda45jack@gmail.com', // Your Gmail address
      pass: 'adnayaB45@jack', // Your Gmail password or App Password
    },
  });

  // Email options
  const mailOptions = {
    from: `${name} <${email}>`, // Sender info
    to: 'bayanda45jack@gmail.com', // Recipient (law firm's email)
    subject: `New Contact Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
///