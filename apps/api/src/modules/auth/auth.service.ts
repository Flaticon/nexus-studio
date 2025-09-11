// apps/api/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    await this.usersService.updateLastLogin((user as any)._id);

    const payload = { 
      email: user.email, 
      sub: (user as any)._id,
      firstName: user.firstName,
      lastName: user.lastName
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const user = await this.usersService.create(registerDto);
    
    return { 
      message: 'Usuario registrado exitosamente',
      user: {
        id: (user as any)._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await this.usersService.validatePassword(password, user.password)) {
      return user;
    }
    
    return null;
  }
}