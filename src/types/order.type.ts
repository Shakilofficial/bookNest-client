export type TProduct = {
  _id: string;
  title: string;
  price: number;
  coverImage?: string;
};

export type TOrderProduct = {
  product: TProduct;
  quantity: number;
  _id: string;
};

export type TTransaction = {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};

export type TOrder = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  products: TOrderProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction?: TTransaction;
};
