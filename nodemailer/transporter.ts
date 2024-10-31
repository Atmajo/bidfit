import { config } from "@/lib/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: false,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});
