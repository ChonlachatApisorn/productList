import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';

export type CategoryDocument = CategoryData & Document;

@Schema({ timestamps: true })
export class CategoryData extends BaseSchema {
  @Prop()
  category_name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryData);
