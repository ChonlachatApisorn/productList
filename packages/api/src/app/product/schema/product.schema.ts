import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema } from '../../common/base.schema';
import { CategoryData } from '../../category/schema/category.schema';
import { UserData } from '../../user/schema/user.schema';

export type ProductDocumnt = ProductData & Document;

@Schema({ timestamps: true })
export class ProductData extends BaseSchema {
  @Prop()
  product_id: string;

  @Prop()
  image: string;

  @Prop()
  product_name: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'CategoryData' })
  category_id: CategoryData | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserData' })
  user_id: UserData | Types.ObjectId;
}
export const ProductSchema = SchemaFactory.createForClass(ProductData);
