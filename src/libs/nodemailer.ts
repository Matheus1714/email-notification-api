import "dotenv/config";
import { createTransport } from "nodemailer";

export const transporter = createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_ADMIN_USER,
    pass: process.env.MAIL_ADMIN_PASS,
  },
});
