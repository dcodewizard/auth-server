import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthService {
  
  async generateToken(payload: any): Promise<string> {
    const secret = process.env.JWT_SECRET;
    return sign(payload, secret, { expiresIn: '1h' }); // Adjust the expiration time as needed
  }

  async verifyToken(token: string): Promise<any> {
    const secret = process.env.JWT_SECRET;
    return verify(token, secret);
  }
}
