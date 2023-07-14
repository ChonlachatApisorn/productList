import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/dto';
import { JwtGuard } from './guard/jwt.guard';
import { CurrentUser } from '../decorator/user.decorator';
import { UserData } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() dto: UserDto) {
    const user = await this.userService.findByUsername(dto.username);
    if (!user) {
      throw new UnauthorizedException('username not found');
    }

    const validate = await this.authService.validateUser(
      dto.username,
      dto.password
    );
    if (!validate) {
      throw new UnauthorizedException('password is incorrect');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('get-current-user')
  getCurrentUser(@CurrentUser() user: UserData) {
    return user;
  }
}
