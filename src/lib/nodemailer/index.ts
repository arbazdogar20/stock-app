import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAIERL_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );

  const mailOptions = {
    from: `"Stock App" <arbazdogar20@gmail.com>`,
    to: email,
    subject: "Welcome to Stock App - your stock market toolkit is ready",
    text: "Thanks for joining stock app",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
