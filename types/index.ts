import { Order, OrderProduct, Products, User, admin_user } from "@prisma/client";

export interface AdminType {
  user: admin_user;
  expires: string;
}
// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   status: boolean;
// }

export interface ProductTypes {
  id: string;
  productName: string;
  price: number;
  discount: number;
  keyFeatures: string[];
  images: string[];
  thumbnail: string;
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

export interface CartTypes {
  id: string;
  userId: string;
  createdAt: Date;
  products?: CartProductTypes[] | [];
}
export interface CartProductTypes {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: ProductTypes;
}








export interface OrderTypes {
  id: string;
  userId: string;
  createdAt: Date;
  totalPrice: number;
  paymentStatus: string;
  user: User;
  orderProducts?: (OrderProductsEntity)[] | null;
  _count: Count;
}

export interface OrderProductsEntity {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: ProductTypes;
}
// export interface Product {
//   id: string;
//   productName: string;
//   price: number;
//   discount: number;
//   keyFeatures?: (string)[] | null;
//   images?: (string)[] | null;
//   thumbnail: string;
//   tags?: (string)[] | null;
//   categoryId: string;
//   quantity: number;
//   createdAt: string;
//   updatedAt: string;
// }
export interface Count {
  orderProducts: number;
}
