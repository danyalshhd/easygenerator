import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/auth.dto';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schemas/user.schema';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
    @Inject(ConfigService) private config: ConfigService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '24h',
    });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    this.logger.log('get user')
    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      throw new BadRequestException('Please register before login');
      // return this.registerUser(user);
    }

    this.logger.log('compare password')
    if (!(await bcrypt.compare(user.password, userExists?.password))) {
      throw new BadRequestException('Incorrect Password');
    }

    const token: string = this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
    return { token, user: await this.userService.getUserBasicData(userExists) };
  }

  async registerUser(user: RegisterUserDto) {
    this.logger.log('creating hash')
    const hashPass = await this.hashPassword(user.password);

    this.logger.log('creating user')
    const newUser: User = await this.userModel.create({
      ...user,
      password: hashPass,
    });

    const token: string = this.generateJwt({
      sub: newUser.id,
      email: newUser.email,
    });
    
    this.logger.log('returning user')
    return {
      token,
      user: this.userService.getUserBasicData(newUser),
    };
  }

  async findUserByEmail(email: string) {
    const user: User = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  async forgotPasswordRequest(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('No user exists with this email');

    const token = this.generateJwt({
      sub: user._id,
      email: user.email,
    });

    const frontendUrl = this.config.get<string>('FRONTEND_URL');
    const link = `${frontendUrl}/reset-password?token=${token}`;

    return 'Reset Password Email Sent';
  }

  async resetPassword(password: string, userId: Schema.Types.ObjectId) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const hashPass = await this.hashPassword(password);
    user.password = hashPass;
    await user.save();

    return 'Password reset successfully';
  }
}
