const nodemailer = require("nodemailer");

async function sendEmail(givenReceiver, givenSubject, givenContent) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "RegisterOx <registerox@outlook.com>",
      to: givenReceiver,
      subject: givenSubject,
      html: givenContent,
    });
    console.log(`Success:\tEmail sent to ${givenReceiver}, ${info.messageId}`.gray);
  } catch (error) {
    console.log(`${JSON.stringify(error)}`.red);
  }
}

module.exports = sendEmail;
