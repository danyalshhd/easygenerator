"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const user_schema_1 = require("../users/schemas/user.schema");
const common_2 = require("@nestjs/common");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, userModel, userService, config) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.userService = userService;
        this.config = config;
        this.logger = new common_2.Logger(AuthService_1.name);
    }
    generateJwt(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: '24h',
        });
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async signIn(user) {
        if (!user) {
            throw new common_1.BadRequestException('Unauthenticated');
        }
        this.logger.log('get user');
        const userExists = await this.findUserByEmail(user.email);
        if (!userExists) {
            throw new common_1.BadRequestException('Please register before login');
        }
        this.logger.log('compare password');
        if (!(await bcrypt.compare(user.password, userExists?.password))) {
            throw new common_1.BadRequestException('Incorrect Password');
        }
        const token = this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
        });
        return { token, user: await this.userService.getUserBasicData(userExists) };
    }
    async registerUser(user) {
        this.logger.log('creating hash');
        const hashPass = await this.hashPassword(user.password);
        this.logger.log('creating user');
        const newUser = await this.userModel.create({
            ...user,
            password: hashPass,
        });
        const token = this.generateJwt({
            sub: newUser.id,
            email: newUser.email,
        });
        this.logger.log('returning user');
        return {
            token,
            user: this.userService.getUserBasicData(newUser),
        };
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return null;
        }
        return user;
    }
    async forgotPasswordRequest(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.BadRequestException('No user exists with this email');
        const token = this.generateJwt({
            sub: user._id,
            email: user.email,
        });
        const frontendUrl = this.config.get('FRONTEND_URL');
        const link = `${frontendUrl}/reset-password?token=${token}`;
        return 'Reset Password Email Sent';
    }
    async resetPassword(password, userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found!');
        }
        const hashPass = await this.hashPassword(password);
        user.password = hashPass;
        await user.save();
        return 'Password reset successfully';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, common_1.Inject)(config_1.ConfigService)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model,
        users_service_1.UsersService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map