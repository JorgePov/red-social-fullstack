import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { PasswordDto } from './dto/password.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ fullName, email, password, age }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.create({
      age,
      email,
      fullName,
      password: await bcryptjs.hash(password, 10),
    });

    return {
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      age: user.age,
      email,
      fullName: user.fullName,
      id: user.id,
      token,
    };
  }

  async changedPassword(
    { newPassword, oldPassword }: PasswordDto,
    user: UserActiveInterface,
  ) {
    const userValid = await this.usersService.findByEmailWithPassword(
      user.email,
    );
    if (!userValid) {
      throw new UnauthorizedException('user is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(
      oldPassword,
      userValid.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    await this.usersService.update(userValid.id, {
      password: await bcryptjs.hash(newPassword, 10),
    });

    return { message: 'password changed' };
  }
}
