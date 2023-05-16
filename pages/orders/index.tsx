import { Loader, OrderListTable } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Order } from "@/types/order";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

const Orders = () => {
  const [orders, setOrders] = useState<Order>();
  const axiosAuth = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosAuth.get("orders");
        setOrders(data);
      } catch (error: any) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, axiosAuth, session]);

  if (loading) return <Loader />;

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
