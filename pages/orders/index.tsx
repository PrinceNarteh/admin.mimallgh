import { OrderListTable } from "@/components";
import { getOrders } from "@/services/orders";
import { IOrders } from "@/types/order";
import { GetServerSideProps } from "next";
import { BiSearch } from "react-icons/bi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getOrders();

  return {
    props: {
      orders: data,
    },
  };
};

const Orders = ({ orders }: { orders: IOrders }) => {
  return (
    <div className="w-11/12 mx-auto">
      <div className=" flex justify-center">
        <div className="flex items-center rounded-lg border p-2">
          <input
            className="bg-transparent outline-none"
            type="search"
            name=""
            id=""
            placeholder="Search order..."
          />
          <BiSearch className="text-3xl text-gray-500" />
        </div>
      </div>
      <OrderListTable orders={orders} />
    </div>
  );
};

export default Orders;
