const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tariqali9300@gmail.com",
      pass: "jwob lkzd qxbm zizz"
    }
  });

  const mailOptions = {
    from: email,
    to: "tariqali9300@gmail.com",
    subject: `New message from ${name} - ${email}`,
    html: `
      <p>Name: ${name}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error sending email");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
