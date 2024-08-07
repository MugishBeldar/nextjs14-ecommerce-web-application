"use client";
import moment from 'moment';
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

import { useAppStore } from "@/store";
import "../../style/edit-product-modal.css";
import { imageLoader } from "@/lib/image-loader";
import { capitalizeEachWord, cn, makeSecureUrl } from "@/lib/utils";
import { getOrderFromOrderId } from "@/actions/order";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderModalProps {
  setOrderModal: Dispatch<SetStateAction<boolean>>;
  orderModal: boolean;
}
const OrderModal = ({ setOrderModal, orderModal }: OrderModalProps) => {

  const { viewingOrderId, setViewingOrder, viewingOrder } = useAppStore();

  useEffect(() => {
    async function orderFromId() {
      const response = await getOrderFromOrderId({ orderId: viewingOrderId });
      if (response) {
        setViewingOrder(response);
      }
    }
    orderFromId();
  }, [setViewingOrder, viewingOrderId]);

  return (
    viewingOrder && (
      <Dialog open={orderModal} onOpenChange={setOrderModal}>
        <DialogContent className="bg-surface border border-secondary-black h-[538px]">
          <Tabs defaultValue="information" className="w-full">
            <div className="flex flex-col">
              <div className="flex-1">
                <DialogHeader className="w-full mt-4">
                  <TabsList className="bg-transparent">
                    {["order details", "items"].map(
                      (tab) => (
                        <TabsTrigger
                          key={tab}
                          className="data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-secondary-blue rounded-none data-[state=active]:text-primary-txt data-[state=active]:bg-transparent text-primary-txt hover:bg-transparent"
                          value={tab}
                        >
                          {capitalizeEachWord(tab)}
                        </TabsTrigger>
                      )
                    )}
                  </TabsList>
                </DialogHeader>
                {["order details", "items"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="">
                    {tab === "order details" && (
                      <div className="text-primary-txt">
                        <div>
                          <p className="mt-6 mb-2 text-lg font-semibold">Customer Details</p>
                          <div className="flex items-center gap-5">
                            <div className="my-2">
                              <Avatar className="rounded-full">
                                <AvatarImage
                                  className="rounded-full"
                                  src={viewingOrder?.user?.image ? viewingOrder?.user?.image : `https://ui-avatars.com/api/?background=7839ee&color=fff&name=${viewingOrder?.user?.name}`}
                                  width={60}
                                  height={60}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex gap-5">
                              <div>
                                <p>Name</p>
                                <p>Mobile No</p>
                                <p>Email</p>
                              </div>
                              <div>
                                <p>: {capitalizeEachWord(viewingOrder?.user?.name ? viewingOrder?.user?.name : '')}</p>
                                <p>: {'1234567890'}</p>
                                <p>: {viewingOrder.user.email}</p>
                              </div>
                            </div>
                            <div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="mt-6 mb-2 text-lg font-semibold">Payment Details</p>
                          <div className="flex gap-5">
                            <div className="">
                              <p className="mb-2">Payment Status</p>
                              <p className="mb-2">Order Id</p>
                              <p className="mb-2">Date</p>
                              <p className="mb-2">Day</p>
                            </div>
                            <div>
                              <p>:
                                <p className={cn("border rounded-lg px-4 inline text-sm ml-1", viewingOrder.paymentStatus.toLowerCase() === 'success' ? "bg-emerald-500/15 border-emerald-500 text-emerald-500" : "text-yellow-400 border-yellow-400 bg-yellow-400/20 ")}>{viewingOrder.paymentStatus}</p>
                              </p>
                              <p className="my-2">: {viewingOrder.id}</p>
                              <p className="mb-2">: {moment(viewingOrder.createdAt).format('YYYY-MM-DD')}</p>
                              <p className="mb-2">: {moment(viewingOrder.createdAt).format('dddd')}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="mt-6 my-2 text-lg font-semibold">Shipping Details</p>
                          <div className="flex gap-5">
                            <div>
                              <p>Address</p>
                              <p>Mobile No</p>
                            </div>
                            <div>
                              <p>: {"Address"}</p>
                              <p>: {'1234567890'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {tab === "items" && (
                      <div className="h-[425px] overflow-y-scroll ">
                        <div className="mr-5">
                          {
                            viewingOrder?.orderProducts && viewingOrder?.orderProducts.map((orderProduct, index) => {
                              return (
                                <div key={index} className="flex gap-2 my-4 justify-center items-center">
                                  <div className="relative w-24 h-24 ">
                                    <Image
                                      loader={imageLoader}
                                      alt="product-image..."
                                      src={makeSecureUrl(orderProduct?.product.thumbnail)}
                                      loading="lazy"
                                      layout="fill"
                                      objectFit="contain"
                                      className="py-2 border border-zinc-500/40"
                                    />
                                  </div>
                                  <div className="text-primary-txt ">
                                    <p className="truncate">
                                      {viewingOrder.orderProducts && orderProduct && orderProduct.product.productName}</p>
                                    <div className="flex">
                                      <div className="flex">
                                        <p >
                                          ${Math.round(orderProduct.product.price - (orderProduct.product?.price * orderProduct.product?.discount) / 100).toLocaleString("us")}
                                        </p>
                                        <p className="text-sm mt-[2px] ml-[5px] ">(Inc. all taxes)</p>
                                      </div>
                                      <div className="flex gap-1 mt-[2px] ml-[5px]">
                                        <p className="line-through text-sm">
                                          MRP ${orderProduct.product?.price.toLocaleString("us")}
                                        </p>
                                        <p className="text-sm ">{`(Save $${((orderProduct.product?.price * orderProduct.product?.discount) / 100).toLocaleString("us")})`}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )}

                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  );
};

export { OrderModal };
