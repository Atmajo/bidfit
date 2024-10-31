import jwt from "jsonwebtoken";
import { z } from "zod";

// Validation schema for token payload
const TokenPayloadSchema = z.object({
  userId: z.string(),
  type: z.enum(["verification", "password-reset"]),
  email: z.string().email().optional(),
});

type TokenPayload = z.infer<typeof TokenPayloadSchema>;

export class TokenService {
  private static SECRET = process.env.JWT_SECRET || "";

  static generateToken(
    payload: TokenPayload,
    expiresIn: string = "10m"
  ): string {
    // Validate payload before signing
    TokenPayloadSchema.parse(payload);

    return jwt.sign(payload, this.SECRET, {
      expiresIn,
    });
  }

  static verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.SECRET) as TokenPayload;

      // Additional validation
      TokenPayloadSchema.parse(decoded);

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }
}
