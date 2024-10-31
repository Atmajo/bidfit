"use server";

import { TokenService } from "./token";
import { sendVerificationMail } from "./email";
import { prisma } from "@/lib/db";

export async function sendVerification(user: {
  id: string;
  email: string;
  name: string;
}) {
  const res = await sendVerificationMail(user.email, "verification", {
    userId: user.id,
    userName: user.name,
  });

  return res;
}

export async function verifyUser(token: string) {
  try {
    // Verify and decode token
    const payload = TokenService.verifyToken(token);

    // Ensure it's a verification token
    if (payload.type !== "verification") {
      throw new Error("Invalid token type");
    }

    // Mark user as verified in the database
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: { emailVerified: true },
    });

    return {
      success: true,
      userId: payload.userId,
      message: "Account successfully verified",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Verification failed",
    };
  }
}
