import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@resources/user/user.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && compareSync(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user._doc.email,
      role: user._doc.role,
      _id: user._doc._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user._doc.role,
      id: user._doc._id,
    };
  }
}
