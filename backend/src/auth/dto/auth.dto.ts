import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import mongoose from 'mongoose';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, include one special character, one number, and one letter',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
export class LoginDto {
  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user', example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResetPasswordRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate((value, args) => value === args.object.password)
  confirmPassword: string;
}

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  otp: string;
}
