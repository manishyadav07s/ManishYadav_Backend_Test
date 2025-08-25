import nodemailer from "nodemailer";

const sendEmail = async (to, link) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your File Download Link",
    text: `Download your file: ${link}`,
  });
};

export default sendEmail;