import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: any): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
