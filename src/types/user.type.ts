import { TProduct } from "./product.type";

export type TFUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profileImg: string;
  phone: string;
  address: string;
  city: string;
  passwordChangedAt: Date;
  wishlist: TProduct[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
