import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ac1c1e712704b0",
    pass: "5923e978c46d89"
  }
});



export const sendWelcomeEmail = (recipientEmail: string) => {
  const mailOptions = {
    from: "hello@furahax.com", // Sender address
    to: recipientEmail, // List of recipients
    subject: "Welcome to Our Newsletter!", // Subject line
    text: "Welcome to our newsletter! Thank you for subscribing.", // Plain text body
    html: "<p>Welcome to our newsletter! Thank you for subscribing.</p>", // HTML body
  };

  // Send the email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending welcome email:", error);
    } else {
      console.log("Welcome email sent:", info.response);
    }
  });
};
