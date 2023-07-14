import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryData, CategoryDocument } from './schema/category.schema';
import { CategoryDto } from './dto/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryData.name)
    private model: Model<CategoryDocument>
  ) {}

  create(dto: CategoryDto) {
    return this.model.create(dto);
  }

  list() {
    return this.model.find();
  }

  update(id: string, dto: CategoryDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id, { new: true });
  }
}
