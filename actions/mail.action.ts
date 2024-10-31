"use server";

import { prisma } from "@/lib/db";
import { transporter } from "@/nodemailer/transporter";
import { EmailTemplateData, emailTemplates } from "@/templates/email-templates";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendVerificationMail = async (
  to: string,
  templateName: keyof typeof emailTemplates,
  data: EmailTemplateData
): Promise<SMTPTransport.SentMessageInfo> => {
  const template = emailTemplates[templateName];

  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification",
    html: template(data),
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
