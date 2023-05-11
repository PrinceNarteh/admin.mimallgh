import { IOrder, Order } from "@/types/order";
import calculatePrice from "@/utils/calculatePrice";
import { useRouter } from "next/router";
import React from "react";

export const OrderListTable = ({ orders }: { orders: Order }) => {
  console.log(orders);
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
            {orders?.data.map((order, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td colSpan={4} className="pl-5">
                    {order.date}
                  </td>
                </tr>
                {order.items.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      router.push(
                        `/orders/${order.items[0].orders[0].order.id}`
                      )
                    }
                    className="cursor-pointer rounded bg-light-gray"
                  >
                    <td className="py-5 text-center ">{i + 1}</td>
                    <td className="py-5 text-center ">{item.orderId}</td>
                    <td className="py-5 text-center">
                      {/* {order.items[0].orderItems[0].shopName} */}
                    </td>
                    <td className="py-5 text-center ">
                      {/* {item.orderItems[0].createdAt} */}
                    </td>
                    <td className="py-5 text-center ">{""}</td>
                    <td className="py-5 pr-5 text-center">
                      {JSON.stringify(item.orderItems)}
                      {/* {JSON.stringify(calculatePrice(item.orderItems))} */}
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
