import { getOrder } from "@/services/orders";
import { Order } from "@/types/order";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query;
  const data = await getOrder(orderId as string);

  return {
    props: {
      order: data,
    },
  };
};

const OrderDetails = ({ order }: { order: Order }) => {
  const subTotal = order.items.reduce(
    (amt, currItem) => amt + currItem.price * currItem.quantity,
    0
  );
  const grandTotal = subTotal;

  return (
    <div className="mx-auto max-w-7xl">
      <h3 className="my-5 text-3xl font-semibold">Order #{order.orderId}</h3>
      <div className="mb-5 flex items-center divide-x border-y border-y-gray-500 py-5">
        <p className="px-5">
          {format(new Date(order.createdAt), "do LLL, yyyy 'at' h:mm aaaa")}
        </p>
        <p className="px-5">
          {order.items.length} Item{order.items.length === 1 ? "" : "s"}
        </p>
        <p className="px-5">Total: ¢{grandTotal}</p>
        <p className="px-5">Paid</p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center justify-between bg-gray-500 bg-opacity-20 py-4 px-4">
            <h3 className="text-xl font-bold tracking-widest">Items</h3>
          </div>
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className=" pl-2  py-3">Product</td>
                  <td>Shop</td>
                  <td className="text-center">Price (¢)</td>
                  <td className="text-center">Qty</td>
                  <td className="text-right pr-3">Total (¢)</td>
                </tr>
                {order.items.map((order, idx) => (
                  <tr key={idx} className="border-y border-b-gray-400">
                    <td className="py-2 pl-4">
                      <div className="flex items-center">
                        <Image
                          className="mr-5"
                          src={order.product.images[0].secure_url}
                          width={40}
                          height={40}
                          alt="apple"
                        />
                        <span className="line-clamp-1">
                          {order.product.title}
                        </span>
                      </div>
                    </td>
                    <td className="w-40">{order.shop.name}</td>
                    <td className="w-24 text-center">{order.price}</td>
                    <td className="w-20 text-center">{order.quantity}</td>
                    <td className="w-24 pr-4 text-right">
                      {order.price * order.quantity}
                    </td>
                  </tr>
                ))}

                {/* TOTAL */}
                <tr>
                  <td className="py-2 pl-4" colSpan={4}>
                    Subtotal
                  </td>
                  <td className="w-24 pr-4 text-right">{subTotal}</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4" colSpan={4}>
                    Tax
                  </td>
                  <td className="w-24 pr-4 text-right">12.34</td>
                </tr>
                <tr className=" border-b border-b-gray-600">
                  <td className="py-2 pl-4" colSpan={4}>
                    Delivery
                  </td>
                  <td className="w-24 pr-4 text-right">10.00</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-between bg-gray-500 bg-opacity-20 py-4 px-4">
              <h3 className="text-xl font-bold tracking-widest">Total</h3>
              <p>{grandTotal}</p>
            </div>
          </div>
        </div>
        <div className="w-full col-span-12 lg:col-span-4 space-y-5">
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">Customer</h3>
            </div>
            <div className="flex items-center">
              {order.user.image ? (
                <Image
                  src={order.user.image.secure_url}
                  width={50}
                  height={50}
                  className="mr-3 rounded-full"
                  alt=""
                />
              ) : (
                <FaUserCircle className="text-5xl mr-3" />
              )}
              <div>
                <h3 className="text-xl font-bold">
                  {order.user.firstName} {order.user.lastName}
                </h3>
                <p>This is a first order</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">Contact</h3>
            </div>
            <div className="flex items-center">
              <address>
                {order.user.firstName} {order.user.lastName} <br />
                {order.user.email} <br />
                {order.user.phoneNumber}
              </address>
            </div>
          </div>
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">
                Delivery Address
              </h3>
            </div>
            <div className="flex items-center">
              <address>
                John Doe <br />
                School Bus Rd
                <br />
                Old Site, UCC <br />
                CC-123-456
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
