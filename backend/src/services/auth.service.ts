import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import prisma from '../config/database.config';
import { TokenUtil } from '../utils/token.util';
import { EmailService } from './email.service';
import { OTPService } from './otp.service';

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'CLIENT' | 'FREELANCER';
}

interface LoginRequest {
  email: string;
  password: string;
  userType?: 'CLIENT' | 'FREELANCER';
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
  token: string;
}

export class AuthService {
  // Check if email exists in database
  static async checkEmailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return !!user;
  }

  static async register(data: RegisterRequest): Promise<{ message: string; email: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Create user with isVerified: false
    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: hashedPassword,
        userType: data.userType,
        isVerified: false // ✅ User starts unverified
      }
    });

    // Send verification OTP
    await OTPService.sendEmailVerificationOTP(user.email);

    return {
      message: 'Registration successful. Please check your email for verification code.',
      email: user.email
    };
  }

  // Add method to resend OTP
  static async resendVerificationOTP(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('Email is already verified');
    }

    await OTPService.sendEmailVerificationOTP(email);
  }

  // Add method to verify email
  static async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
    const isValid = await OTPService.verifyEmailOTP(email, otp);

    if (!isValid) {
      throw new Error('Invalid verification code');
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const token = TokenUtil.generate({
      userId: user.id,
      email: user.email,
      userType: user.userType,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
      token,
    };
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify user type matches selected type
    if (data.userType && user.userType !== data.userType) {
      throw new Error(`This account is registered as a ${user.userType.toLowerCase()}, not a ${data.userType.toLowerCase()}. Please select the correct account type.`);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = TokenUtil.generate({
      userId: user.id,
      email: user.email,
      userType: user.userType,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
      token,
    };
  }

  static async requestPasswordReset(email: string): Promise<{ exists: boolean; sent: boolean }> {
    // Check if email exists in our database
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // For security, don't reveal if email exists
      // But return info for logging purposes
      console.log(`🔍 Password reset requested for non-existent email: ${email}`);
      return { exists: false, sent: false };
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      }
    });

    // Send password reset email to REAL email address
    try {
      await EmailService.sendPasswordResetEmail(email, resetToken);
      console.log(`✅ Password reset email sent to REAL email: ${email}`);
      console.log(`👤 User: ${user.firstName} ${user.lastName} (${user.userType})`);
      return { exists: true, sent: true };
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      return { exists: true, sent: false };
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find valid reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password and mark token as used in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash: hashedPassword }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true }
      })
    ]);

    console.log(`✅ Password successfully reset for user: ${resetToken.user.email}`);
  }
}
