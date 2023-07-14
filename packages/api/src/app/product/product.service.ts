import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductData, ProductDocumnt } from './schema/product.schema';
import { Model } from 'mongoose';
import { ProductDto, ProductQuery } from './dto/dto';
import * as lodash from 'lodash';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductData.name)
    private model: Model<ProductDocumnt>
  ) {}

  create(dto: ProductDto) {
    return this.model.create(dto);
  }

  list(id: string, query: ProductQuery) {
    const productName = {
      $regex: lodash.escapeRegExp(query.product_name),
      $options: 'i',
    };
    return this.model
      .find({ ...query, user_id: id, product_name: productName })
      .sort(query.sortBy)
      .populate('category_id')
      .populate('user_id');
  }

  update(id: string, dto: ProductDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  findById(id: string) {
    return this.model.findById(id);
  }
}
