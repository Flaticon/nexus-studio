// apps/api/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: any) {
    // TODO: Validate user credentials
    const payload = { email: loginDto.email, sub: 'userId' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: any) {
    // TODO: Create new user
    return { message: 'User registered successfully' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Validate user from database
    return null;
  }
}