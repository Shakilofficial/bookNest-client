import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Cart = () => {
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const cart = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    // if user is not logged in, show error message
    if (!user) {
      toast.error("You need to log in first");
      return;
    }
    await createOrder({ products: cart.items });
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Shopping Cart">
          <ShoppingCart className="h-6 w-6" />
          {cart.totalQuantity > 0 && (
            <span className="absolute  bg-primary text-primary-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cart.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Manage your items below:</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[70vh] my-4">
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div
                key={item.product}
                className="flex items-center py-2 border-b last:border-none"
              >
                <img
                  src={item.coverImage || "/placeholder.svg"}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded mr-2"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleUpdateQuantity(item.product, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleUpdateQuantity(item.product, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.product)}
                    className="ml-2"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Your cart is empty.
            </p>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Total:</span>
            <span className="font-bold">${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
