import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Star, Trash } from "lucide-react";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImg: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  currentUser: { id: string } | null;
  onUpdateReview: (
    reviewId: string,
    reviewData: { rating: number; comment: string }
  ) => void;
  onDeleteReview: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  currentUser,
  onUpdateReview,
  onDeleteReview,
}) => {
  const [editingReview, setEditingReview] = useState<string | null>(null);

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        reviews.map((review) => (
          <Card key={review._id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.user.profileImg} />
                <AvatarFallback>{review.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-sm font-medium">
                  {review.user.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{review.comment}</p>
            </CardContent>
            {currentUser && currentUser.id === review.user._id && (
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Dialog
                  open={editingReview === review._id}
                  onOpenChange={(open) => !open && setEditingReview(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingReview(review._id)}
                    >
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[360px] md:max-w-md rounded-md">
                    <DialogHeader>
                      <DialogTitle>Edit Review</DialogTitle>
                    </DialogHeader>
                    <ReviewForm
                      onSubmit={(reviewData) => {
                        onUpdateReview(review._id, reviewData);
                        setEditingReview(null);
                      }}
                      onCancel={() => setEditingReview(null)}
                      initialRating={review.rating}
                      initialComment={review.comment}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteReview(review._id)}
                >
                  <Trash className="h-3 w-3 mr-1" /> Delete
                </Button>
              </CardFooter>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default ReviewList;
