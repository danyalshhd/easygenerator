import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto, ResetPasswordDto, ResetPasswordRequestDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(createUserDto: RegisterUserDto): Promise<{
        token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            onboardingStep: string;
        };
    }>;
    signIn(loginDto: LoginDto): Promise<{
        token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            onboardingStep: string;
        };
    }>;
    requestForgotPassword(resetPasswordDto: ResetPasswordRequestDto): Promise<string>;
    ressetPassword(resetPasswordDto: ResetPasswordDto, req: any): Promise<string>;
}
