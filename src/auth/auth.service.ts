import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(userData) {
    await this.userService.create(userData);
    const payload = {
      username: userData.email,
      sub: userData.id,
      role: userData.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
