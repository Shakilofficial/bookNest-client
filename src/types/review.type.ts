export type TReview = {
  _id: string;
  user?: {
    _id: string;
    name: string;
    profileImg: string;
  };
  product: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};
