export type TProduct = {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  coverImage: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  publishedAt: string;
  averageRating?: number;
  totalReviews?: number;
};
