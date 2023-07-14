import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('list')
  list() {
    return this.service.list();
  }

  @Post('create')
  create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }
}
