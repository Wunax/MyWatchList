import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authUserDto: AuthUserDto, @Response() res) {
    const user = await this.authService.findUser(authUserDto);
    if (!user) {
      throw new UnauthorizedException({ message: 'Email or password invalid' });
    }
    const accessToken = this.authService.generateAccessToken(
      user.email,
      user._id,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    res.status(200).send();
  }

  @UseInterceptors(new SanitizeMongooseModelInterceptor())
  @Post('/register')
  @HttpCode(201)
  async register(@Body() authUserDto: AuthUserDto) {
    try {
      return await this.authService.registerUser(authUserDto);
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictException({ message: 'Email already exist' });
      }
      throw new BadRequestException({ message: 'An error has occurred' });
    }
  }
}
