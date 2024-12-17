/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/auth.dto';
import { Model, Schema } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schemas/user.schema';
export declare class AuthService {
    private jwtService;
    private userModel;
    private userService;
    private config;
    private readonly logger;
    constructor(jwtService: JwtService, userModel: Model<User>, userService: UsersService, config: ConfigService);
    generateJwt(payload: any): string;
    hashPassword(password: string): Promise<any>;
    signIn(user: any): Promise<{
        token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            onboardingStep: string;
        };
    }>;
    registerUser(user: RegisterUserDto): Promise<{
        token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            onboardingStep: string;
        };
    }>;
    findUserByEmail(email: any): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }>>;
    forgotPasswordRequest(email: string): Promise<string>;
    resetPassword(password: string, userId: Schema.Types.ObjectId): Promise<string>;
}
