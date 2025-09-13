import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { GoogleAuthService } from '../services/googleAuth.service';


export class AuthController {
  // Add these new methods
  static async resendVerificationOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      await AuthService.resendVerificationOTP(email);

      res.status(200).json({
        success: true,
        message: 'Verification code sent to your email'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send verification code'
      });
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required'
        });
      }

      const result = await AuthService.verifyEmail(email, otp);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Email verification failed'
      });
    }
  }

  // Update register method to return verification message
  static async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, userType } = req.body;

      if (!email || !password || !firstName || !lastName || !userType) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        userType
      });

      res.status(201).json({
        success: true,
        message: result.message,
        data: { email: result.email }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  }


  static async login(req: Request, res: Response) {
    try {
      const { email, password, userType } = req.body; // ✅ Extract userType

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const result = await AuthService.login({ email, password, userType }); // ✅ Pass userType

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      });
    }
  }


  static async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      await AuthService.requestPasswordReset(email);

      res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Password reset request failed'
      });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Token and new password are required'
        });
      }

      await AuthService.resetPassword(token, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Password reset failed'
      });
    }
  }

  // Add this new googleLogin method
  static async googleLogin(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Google token is required'
        });
      }

      const result = await GoogleAuthService.handleGoogleLogin(token);

      res.status(200).json({
        success: true,
        message: 'Google login successful',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Google login failed'
      });
    }
  }


}
