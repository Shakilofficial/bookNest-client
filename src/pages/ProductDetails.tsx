/* eslint-disable @typescript-eslint/no-unused-vars */
import ProductDetailsCard from "@/components/product/ProductDetailsCard";
import ReviewForm from "@/components/product/ReviewForm";
import ReviewList from "@/components/product/ReviewList";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import Error from "@/components/skeleton/Error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/utils/Container";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useFetchProductReviewsQuery,
  useUpdateReviewMutation,
} from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const {
    isLoading: productLoading,
    isFetching: productFetching,
    isError: isProductError,
    error: productError,
    data: product,
  } = useGetSingleProductQuery(id!);

  const {
    data: reviews,
    isLoading: reviewsLoading,
    isFetching: reviewsFetching,
    error: reviewsError,
  } = useFetchProductReviewsQuery(id!);

  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleAddReview = async (reviewData: {
    rating: number;
    comment: string;
  }) => {
    if (!currentUser) {
      toast.error("You need to login to add a review.");
      return;
    }

    try {
      await createReview({ productId: id!, reviewData }).unwrap();
      setIsReviewDialogOpen(false);
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error("Failed to submit review. Please try again later.");
    }
  };

  const handleUpdateReview = async (
    reviewId: string,
    reviewData: { rating: number; comment: string }
  ) => {
    try {
      await updateReview({ reviewId, reviewData }).unwrap();
      toast.success("Review updated successfully");
    } catch (error) {
      toast.error("Failed to update review. Please try again later.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review. Please try again later.");
    }
  };

  if (productFetching || productLoading) {
    return (
      <Container className="max-w-7xl mx-auto">
        <CardSkeleton />
      </Container>
    );
  }

  if (isProductError || productError || !product) {
    return (
      <Container className="max-w-7xl mx-auto">
        <Error message="Failed to load product details. Please try again later." />
      </Container>
    );
  }

  return (
    <Container className="max-w-7xl mx-auto">
      <ProductDetailsCard product={product} />
      <Separator className="my-8" />
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <Dialog
            open={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                disabled={!currentUser}
                onClick={() =>
                  !currentUser &&
                  toast.error("You need to login to add a review.")
                }
              >
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>
                  Share your thoughts about this product
                </DialogDescription>
              </DialogHeader>
              <ReviewForm
                onSubmit={handleAddReview}
                onCancel={() => setIsReviewDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        {reviewsLoading || reviewsFetching ? (
          <div className="text-center py-4">Loading reviews...</div>
        ) : reviewsError ? (
          <Error message="Failed to load reviews. Please try again later." />
        ) : reviews?.data && reviews?.data?.length > 0 ? (
          <ReviewList
            reviews={reviews?.data}
            currentUser={currentUser}
            onUpdateReview={handleUpdateReview}
            onDeleteReview={handleDeleteReview}
          />
        ) : (
          <div className="text-center py-4 text-gray-500">
            <Error message="No reviews yet. Be the first to review this product!" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductDetails;
