import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/database.config';
import { TokenUtil } from '../utils/token.util';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email_verified: boolean;
}

export class GoogleAuthService {
  static async verifyGoogleToken(token: string): Promise<GoogleUserInfo> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid Google token payload');
      }

      return {
        sub: payload.sub,
        email: payload.email!,
        name: payload.name!,
        given_name: payload.given_name || '',
        family_name: payload.family_name || '',
        picture: payload.picture || '',
        email_verified: payload.email_verified || false,
      };
    } catch (error) {
      throw new Error('Invalid Google token');
    }
  }

  // Helper function to split full name if needed
  static getNames(googleUser: GoogleUserInfo) {
    // If both given_name and family_name are available, use them
    if (googleUser.given_name && googleUser.family_name) {
      return {
        firstName: googleUser.given_name.trim(),
        lastName: googleUser.family_name.trim()
      };
    }
    
    // If only given_name is available
    if (googleUser.given_name && !googleUser.family_name) {
      return {
        firstName: googleUser.given_name.trim(),
        lastName: ''
      };
    }
    
    // If only full name is available, try to split it
    if (googleUser.name) {
      const nameParts = googleUser.name.trim().split(' ').filter(part => part.length > 0);
      
      if (nameParts.length === 1) {
        return {
          firstName: nameParts[0],
          lastName: ''
        };
      } else if (nameParts.length >= 2) {
        return {
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ')
        };
      }
    }

    // Fallback if no name information is available
    return {
      firstName: 'User',
      lastName: ''
    };
  }

  static async handleGoogleLogin(googleToken: string) {
    const googleUser = await this.verifyGoogleToken(googleToken);
    
    if (!googleUser.email_verified) {
      throw new Error('Google email not verified');
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email }
    });

    if (!user) {
      // Extract names using the helper function
      const names = this.getNames(googleUser);

      // Create new user with extracted names
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          firstName: names.firstName,
          lastName: names.lastName,
          passwordHash: '', // No password for Google users
          isVerified: true, // Google email is already verified
          userType: 'FREELANCER', // Default, can be changed later
        },
      });
    }

    // Generate JWT token for the user
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
}
