import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', AuthController.register);

router.post('/resend-verification', AuthController.resendVerificationOTP);
router.post('/verify-email', AuthController.verifyEmail);

// POST /api/auth/login - User login
router.post('/login', AuthController.login);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', AuthController.requestPasswordReset);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', AuthController.resetPassword);

// POST /api/auth/google - Google OAuth login
router.post('/google', AuthController.googleLogin);

export default router;
