export type TReview = {
  user: string;
  product: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};
