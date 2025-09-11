import { AuthService, type LoginDto, type RegisterDto } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    getProfile(req: any): any;
    logout(): Promise<{
        message: string;
    }>;
}
