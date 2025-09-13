import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class EmailService {
  private static transporter: nodemailer.Transporter;

  // Initialize Gmail SMTP for real email sending
  static async init() {
    if (!this.transporter) {
      // Use Gmail SMTP for real emails
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
        },
      });

      // Verify connection
      try {
        await this.transporter.verify();
        console.log('✅ Gmail SMTP server ready to send emails');
      } catch (error) {
        console.error('❌ Gmail SMTP connection failed:', error);
      }
    }
  }

  // Add this method to your EmailService class
  static async sendVerificationOTP(email: string, otp: string) {
    await this.init();

    const mailOptions = {
      from: `"FreelancersHIVE" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🔐 Verify Your Email - FreelancersHIVE',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .email-container { max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 40px 30px; background: #ffffff; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .otp-box { 
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 10px; 
            margin: 30px 0;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
          }
          .footer { 
            padding: 20px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 10px 10px;
          }
          .warning { background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🔐 Email Verification</h1>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Welcome to <strong>FreelancersHIVE!</strong> Please use the verification code below to confirm your email address and complete your registration.</p>
            
            <div class="otp-box">
              ${otp}
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This verification code will expire in <strong>15 minutes</strong> for your security.
            </div>
            
            <p><strong>📱 Instructions:</strong></p>
            <ol>
              <li>Go back to the FreelancersHIVE verification page</li>
              <li>Enter the 6-digit code above</li>
              <li>Click "Verify Email" to complete your registration</li>
            </ol>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p><strong>⚠️ Didn't request this?</strong> If you didn't sign up for FreelancersHIVE, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 <strong>FreelancersHIVE</strong>. All rights reserved.</p>
            <p>🚫 This is an automated email, please do not reply to this message.</p>
            <p>Need help? Contact us at support@freelancershive.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
      text: `
      Email Verification - FreelancersHIVE
      
      Welcome to FreelancersHIVE! 
      
      Your verification code is: ${otp}
      
      This code will expire in 15 minutes.
      
      Enter this code on the verification page to complete your registration.
      
      If you didn't sign up for FreelancersHIVE, please ignore this email.
      
      © 2025 FreelancersHIVE. All rights reserved.
    `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Verification OTP email sent successfully!');
      return info;
    } catch (error) {
      console.error('❌ Failed to send verification OTP email:', error);
      throw new Error('Failed to send verification email');
    }
  }


  static async sendPasswordResetEmail(email: string, resetToken: string) {
    await this.init();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"FreelancersHIVE" <${process.env.GMAIL_USER}>`,
      to: email, // This will be the user's real email
      subject: '🔐 Reset Your Password - FreelancersHIVE',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .email-container { max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .header { background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 40px 30px; background: #ffffff; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
            .button { 
              background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              display: inline-block; 
              margin: 20px 0; 
              font-weight: 600;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .footer { 
              padding: 20px; 
              text-align: center; 
              color: #6b7280; 
              font-size: 14px; 
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 0 0 10px 10px;
            }
            .warning { background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi there!</h2>
              <p>We received a request to reset your password for your <strong>FreelancersHIVE</strong> account.</p>
              
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center;">
              <a href="${resetUrl}" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: white !important; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 20px 0;">Reset My Password</a>
              </div>

              
              <div class="warning">
                <strong>⏰ Security Notice:</strong> This link will expire in <strong>1 hour</strong> for your security.
              </div>
              
              <p>If the button doesn't work, copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #3B82F6; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace;">${resetUrl}</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p><strong>⚠️ Didn't request this?</strong> If you didn't request a password reset, please ignore this email. Your account is safe and no changes will be made.</p>
            </div>
            <div class="footer">
              <p>© 2025 <strong>FreelancersHIVE</strong>. All rights reserved.</p>
              <p>🚫 This is an automated email, please do not reply to this message.</p>
              <p>Need help? Contact us at support@freelancershive.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request - FreelancersHIVE
        
        Hi there!
        
        We received a request to reset your password for your FreelancersHIVE account.
        
        Click this link to reset your password: ${resetUrl}
        
        ⏰ This link will expire in 1 hour for your security.
        
        If you didn't request this password reset, please ignore this email.
        Your account is safe and no changes will be made.
        
        Need help? Contact us at support@freelancershive.com
        
        © 2025 FreelancersHIVE. All rights reserved.
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      console.log('✅ Password reset email sent successfully!');
      console.log('📧 Message ID:', info.messageId);
      console.log('📬 Sent to:', email);

      return info;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  // Optional: Send welcome email when user registers
  static async sendWelcomeEmail(email: string, firstName: string, userType: string) {
    await this.init();

    const mailOptions = {
      from: `"FreelancersHIVE Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `🎉 Welcome to FreelancersHIVE, ${firstName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .email-container { max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 40px 30px; background: #ffffff; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
            .button { 
              background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              display: inline-block; 
              margin: 20px 0; 
              font-weight: 600;
            }
            .footer { 
              padding: 20px; 
              text-align: center; 
              color: #6b7280; 
              font-size: 14px; 
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 0 0 10px 10px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🎉 Welcome to FreelancersHIVE!</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName}!</h2>
              <p>Welcome to <strong>FreelancersHIVE</strong> - the platform connecting talented ${userType.toLowerCase()}s with amazing opportunities!</p>
              
              <p>🚀 You're all set to get started. Here's what you can do next:</p>
              
              <ul>
                ${userType === 'FREELANCER' ? `
                  <li>✅ Complete your profile and showcase your skills</li>
                  <li>💼 Browse available jobs and submit proposals</li>
                  <li>💰 Set your hourly rates and availability</li>
                ` : `
                  <li>✅ Post your first job and find talented freelancers</li>
                  <li>👥 Browse freelancer profiles</li>
                  <li>🤝 Start building your dream team</li>
                `}
              </ul>
              
              <div style="text-align: center;">
                <a href="http://localhost:3000/${userType === 'FREELANCER' ? 'freelancer' : 'client'}-dashboard" class="button">
                  Go to Dashboard
                </a>
              </div>
              
              <p>If you have any questions, feel free to reach out to our support team!</p>
            </div>
            <div class="footer">
              <p>© 2025 <strong>FreelancersHIVE</strong>. All rights reserved.</p>
              <p>Questions? Contact us at support@freelancershive.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${firstName} (${email})`);
      return info;
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      // Don't throw error for welcome email - it's not critical
    }
  }
}
