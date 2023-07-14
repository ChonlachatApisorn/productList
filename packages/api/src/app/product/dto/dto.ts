export class ProductDto {
  product_id: string;
  image: string;
  product_name: string;
  category_id: string;
  price: number;
  user_id: string;
}

export class ProductQuery {
  product_name?: string;
  sortBy?: string;
}
