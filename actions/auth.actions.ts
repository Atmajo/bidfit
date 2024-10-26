"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { config } from "@/lib/config";
import { generateUsername } from "@/lib/utils";

export interface AuthResponse {
  message: string;
  status: number;
  success: boolean;
  token?: string;
  userId?: string;
  error?: any;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const user = await prisma?.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: "User not found",
        status: 404,
        success: false,
        error: "Invalid email",
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return {
        message: "Login failed",
        status: 400,
        success: false,
        error: "Invalid password",
      };
    }

    let token: string;

    try {
      token = jwt.sign({ id: user.id }, config.jwtSecret, {
        expiresIn: "7d",
      });
    } catch (error) {
      console.error("Error signing the token:", error);
      throw error;
    }

    return {
      message: "Login successful",
      status: 200,
      success: true,
      userId: user.id,
      token: token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "An error occurred",
      status: 500,
      success: false,
      error,
    };
  }
};

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const register = async ({
  email,
  password,
  name,
}: RegisterData): Promise<AuthResponse> => {
  try {
    // Check if user already exists
    const existingUser = await prisma?.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User already exists",
        status: 400,
        success: false,
        error: "Email already registered",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = generateUsername();

    // Create new user
    const newUser = await prisma?.user.create({
      data: {
        username: username,
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      message: "Registration successful",
      status: 201,
      success: true,
      userId: newUser?.id,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      message: "An error occurred",
      status: 500,
      success: false,
      error,
    };
  }
};
