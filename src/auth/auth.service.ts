import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async findUser(authUserDto: AuthUserDto): Promise<UserDocument> {
    return this.userService.findByCredentials(
      authUserDto.email,
      authUserDto.password,
    );
  }

  async registerUser(authUserDto: AuthUserDto): Promise<UserDocument> {
    return this.userService.createUser(authUserDto.email, authUserDto.password);
  }

  generateAccessToken(email, userId): string {
    return this.jwtService.sign({ email, sub: userId }, { expiresIn: '7d' });
  }
}
