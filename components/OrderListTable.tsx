import { IOrder } from "@/types/order";
import calculatePrice from "@/utils/calculatePrice";
import { useRouter } from "next/router";
import React from "react";

export const OrderListTable = ({ orders }: { orders: IOrder | undefined }) => {
  const router = useRouter();


  return (
    <div className="w-full">
      <div className="w-full pb-4 px-2">
        <table className="w-full border-separate border-spacing-y-4">
          <thead className="bg-light-gray">
            <tr>
              <th className=" w-20 py-4">No</th>
              <th className=" w-20 py-4">Order Id</th>
              <th className="w-40 py-4">Customer</th>
              <th className=" w-40 py-4">Date</th>
              <th className=" w-40 py-4">Status</th>
              <th className=" w-20 py-4 pr-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td colSpan={4} className="pl-5">
                    {order.date}
                  </td>
                </tr>
                {order?.orders?.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      router.push(
                        `/orders/${order.orders[i].orderItems[0].order.id}`
                      )
                    }
                    className="cursor-pointer rounded bg-light-gray hover:scale-105 duration-300"
                  >
                    <td className="py-5 text-center ">{i + 1}</td>
                    <td className="py-5 text-center ">{item.orderId}</td>
                    <td className="py-5 text-center">{order.user}</td>
                    <td className="py-5 text-center ">
                      {item.orders[0]?.createdAt}
                    </td>
                    <td className="py-5 text-center ">{""}</td>
                    <td className="py-5 pr-5 text-center">
                      {calculatePrice(item.orders[0].items)}
                      {/* {JSON.stringify(item.orders)} */}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
