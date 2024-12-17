export declare class RegisterUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ResetPasswordRequestDto {
    email: string;
}
export declare class ResetPasswordDto {
    password: string;
    confirmPassword: string;
}
export declare class VerifyEmailDto {
    otp: string;
}
