import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';

export class TokenUtil {
  private static readonly JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  static generate(payload: JWTPayload): string {
    const options = {
      expiresIn: this.JWT_EXPIRES_IN,
    } as SignOptions;

    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  static verify(token: string): JWTPayload {
    return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
  }
}
