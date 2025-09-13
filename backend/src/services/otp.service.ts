import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.config';
import { EmailService } from './email.service';

export class OTPService {
  // Generate 6-digit OTP
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send email verification OTP
  static async sendEmailVerificationOTP(email: string): Promise<void> {
    // Check rate limiting (max 3 OTPs per 15 minutes)
    const recentOTPs = await prisma.emailVerificationOTP.count({
      where: {
        email: email,
        createdAt: {
          gte: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
        }
      }
    });

    if (recentOTPs >= 3) {
      throw new Error('Too many OTP requests. Please wait 15 minutes before requesting again.');
    }

    // Generate OTP
    const otp = this.generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Invalidate previous OTPs for this email
    await prisma.emailVerificationOTP.updateMany({
      where: { email, used: false },
      data: { used: true }
    });

    // Store new OTP
    await prisma.emailVerificationOTP.create({
      data: {
        email,
        otpHash,
        expiresAt,
      }
    });

    // Send OTP email
    await EmailService.sendVerificationOTP(email, otp);
    console.log(`✅ Verification OTP sent to ${email}`);
  }

  // Verify email OTP
  static async verifyEmailOTP(email: string, otp: string): Promise<boolean> {
    // Find the most recent unused OTP for this email
    const otpRecord = await prisma.emailVerificationOTP.findFirst({
      where: {
        email,
        used: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord) {
      throw new Error('Invalid or expired OTP');
    }

    // Increment attempts
    await prisma.emailVerificationOTP.update({
      where: { id: otpRecord.id },
      data: { attempts: otpRecord.attempts + 1 }
    });

    // Check if too many attempts (max 5)
    if (otpRecord.attempts >= 5) {
      await prisma.emailVerificationOTP.update({
        where: { id: otpRecord.id },
        data: { used: true }
      });
      throw new Error('Too many failed attempts. Please request a new OTP.');
    }

    // Verify OTP
    const isValid = await bcrypt.compare(otp, otpRecord.otpHash);

    if (isValid) {
      // Mark OTP as used
      await prisma.emailVerificationOTP.update({
        where: { id: otpRecord.id },
        data: { used: true }
      });

      // Mark user as verified
      await prisma.user.update({
        where: { email },
        data: { isVerified: true }
      });

      return true;
    } else {
      throw new Error('Invalid OTP');
    }
  }
}
