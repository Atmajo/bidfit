"use server";

import { transporter } from "@/nodemailer/transporter";
import { EmailTemplateData, emailTemplates } from "@/templates/email-templates";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { TokenService } from "./token";

export const sendVerificationMail = async (
  to: string,
  templateName: keyof typeof emailTemplates,
  data: EmailTemplateData
): Promise<SMTPTransport.SentMessageInfo> => {
  // Generate verification token
  const token = TokenService.generateToken({
    userId: data.userId || "",
    type: "verification",
    email: to,
  });
  
  // Create verification link
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  // Modify data to include verification link
  const updatedData = {
    ...data,
    verificationLink,
  };

  const template = emailTemplates[templateName];

  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification",
    html: template(updatedData),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
