import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, ProductQuery } from './dto/dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '../decorator/user.decorator';
import { UserData } from '../user/schema/user.schema';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() dto: ProductDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get('list')
  list(@CurrentUser() user: UserData, @Query() query: ProductQuery) {
    const user_id = user._id.toString();
    if (query.sortBy) {
      query.sortBy = JSON.parse(query.sortBy);
    }
    return this.service.list(user_id, query);
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('list/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
