import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/type.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../user/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel(UserEntity) private readonly userModel: typeof UserEntity,
  ) {}
  async userExistence(authDto: AuthDto) {
    const { method, type, username } = authDto;
    switch (type) {
      case AuthType.Login:
        return await this.login(method, username);
      case AuthType.Register:
        return await this.register();

      default:
        throw new UnauthorizedException('Type Auth incorrect!');
    }
  }
  async register() {}

  async login(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    const user = await this.checkExistUser(method, validUsername);
    if (!user) throw new NotFoundException('The user not founded!');
    const otpCode = randomInt(100_000, 999_999).toString();
    // set otp to redis
    await this.cacheManager.set(`otp:${user.id}`, otpCode, 120);
    return {
      message: 'sent otp code successFully!',
      otpCode,
    };
  }

  usernameValidator(method: AuthMethod, username: string) {
    switch (method) {
      case AuthMethod.Email:
        if (isEmail(username)) return username;
        throw new BadRequestException('email format is incorrect');
      case AuthMethod.Phone:
        if (isMobilePhone(username, 'fa-IR')) return username;
        throw new BadRequestException('mobile number incorrect');
      case AuthMethod.Username:
        return username;
      default:
        throw new UnauthorizedException('username data is not valid');
    }
  }
  async checkExistUser(
    method: AuthMethod,
    username: string,
  ): Promise<UserEntity | null> {
    let user: UserEntity | null = null;
    if (method === AuthMethod.Email) {
      user = await this.userModel.findOne({ where: { email: username } });
    } else if (method === AuthMethod.Phone) {
      user = await this.userModel.findOne({ where: { phone: username } });
    } else if (method === AuthMethod.Username) {
      user = await this.userModel.findOne({ where: { username: username } });
    } else throw new UnauthorizedException('Merthod is inCorrect!');

    return user;
  }
}
