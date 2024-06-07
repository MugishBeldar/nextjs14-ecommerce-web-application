
export interface AdminType {
  user: User;
  expires: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
}

export interface ProductTypes {
  id: string;
  productName: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  tags: string[];
  categoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    categoryName: string;
  };
  carts?: any[];
  wishlist?: {
    id: string;
    userId: string;
    createdAt: Date;
  }[];
}
export interface CategoryTypes {
  id: string;
  categoryName: string;
}

export interface CtegoryWithProduct {
  id: string;
  categoryName: string;
  products?: ProductTypes[] | [];
}

export interface CategoryWithProductCount {
  id: string;
  categoryName: string;
  products?: ProductsEntity[] | null;
}

export interface ProductsEntity {
  id: string;
}