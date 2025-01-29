import GridSkeleton from "@/components/skeleton/GridSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/utils/Container";
import SectionHeader from "@/components/utils/SectionHeader";
import { useVerifyPaymentQuery } from "@/redux/features/order/orderApi";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { isFetching, isLoading, data } = useVerifyPaymentQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data?.[0];

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto p-4">
        <GridSkeleton />
      </div>
    );
  }

  return (
    <Container className="max-w-5xl mx-auto">
      <SectionHeader
        highlight="Order Verification"
        subtitle="Verify your order"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd className="mt-1 text-sm ">{orderData?.order_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="mt-1 text-sm ">
                  {orderData?.currency} {orderData?.amount?.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      orderData?.bank_status === "Success"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {orderData?.bank_status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm ">
                  {new Date(orderData?.date_time)?.toLocaleString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Method</dt>
                <dd className="mt-1 text-sm ">{orderData?.method}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Transaction ID
                </dt>
                <dd className="mt-1 text-sm ">{orderData?.bank_trx_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Invoice No
                </dt>
                <dd className="mt-1 text-sm ">{orderData?.invoice_no}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">SP Code</dt>
                <dd className="mt-1 text-sm ">{orderData?.sp_code}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm ">{orderData?.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm ">{orderData?.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm ">{orderData?.phone_no}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm ">{orderData?.address}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {orderData?.is_verify === 1 ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <AlertCircle className="text-yellow-500" />
              )}
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-lg font-semibold">
              {orderData?.is_verify === 1 ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <span className="text-yellow-500">Not Verified</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/order" className="w-full">
              <Button className="w-full">View All Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default VerifyOrder;
