export interface IAuthContext {
  user: boolean;
  setUser: (user: boolean) => void;
  currentUser: {
    _id: string;
    username: string;
  };
}

export interface IProductContext {
  productListData: [];
}

export interface IProduct {
  _id: string;
  product_id: string;
  image: string;
  product_name: string;
  category_id: {
    _id: string;
    category_name: string;
  };
  price: number;
}

export interface ICategory {
  _id: string;
  category_name: string;
}
