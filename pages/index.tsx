import { Card, OrderListTable } from "@/components";
import { getOrders } from "@/services/orders";
import { IOrders } from "@/types/order";
import { GetServerSideProps } from "next";
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getOrders();

  return {
    props: {
      orders: data,
    },
  };
};

const Home = ({ orders }: { orders: IOrders }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card heading="Total Sells">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold">$3799.00</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineRise className="font-bold text-green-500" /> 37.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
        <Card heading="Average Order Value">
          <div className="flex items-center justify-between gap-5">
            <h3 className="text-xl font-extrabold">$279.00</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineFall className="font-bold text-red-500" /> 12.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
        <Card heading="Total Orders">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold">600</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineRise className="font-bold text-green-500" /> 21.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-10 w-11/12 mx-auto">
        <h3 className="text-xl font-semibold">Recent Orders</h3>
        <OrderListTable orders={orders} />
      </div>
    </div>
  );
};

export default Home;
