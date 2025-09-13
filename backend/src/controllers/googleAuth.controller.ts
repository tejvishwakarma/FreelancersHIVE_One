import { Request, Response } from 'express';
import { GoogleAuthService } from '../services/googleAuth.service';

export class GoogleAuthController {
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
