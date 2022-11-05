import nodemailer from "nodemailer";

const Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.example.com",
  port: 587,
  auth: {
    user: "jimnill932255@gmail.com",
    pass: "aenpcldmbmftihsj",
  },
});

const SendEmail = async (email, subject, message) => {
  console.log("mail info", {
    email,
    subject,
  });
  await Transporter.sendMail({
    from: `<${process.env.EMAIL}>`,
    to: email,
    subject,
    html: message,
  });
};

export default SendEmail;
