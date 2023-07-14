import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/dto';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get('list')
  list() {
    return this.service.list();
  }

  @Post('create')
  create(@Body() dto: CategoryDto) {
    return this.service.create(dto);
  }

  @Put('update')
  update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete('delete')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
