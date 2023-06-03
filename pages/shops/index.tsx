import { Loader } from "@/components";
import Pagination from "@/components/Pagination";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getShops } from "@/services/shops";
import { Shop } from "@/types";
import { capitalize } from "@/utils/utilities";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IShop {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  data: Shop[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getShops();

  return {
    props: {
      shops: data,
    },
  };
};

const Shops = ({ shops }: { shops: IShop }) => {
  const [state, setState] = useState(shops);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    const res = await axiosAuth.get(`/shops?page=${page}&search=${search}`);
    setState(res.data);
    setIsLoading(false);
  };

  const handlePrev = async (page: number) => {
    setIsLoading(true);
    const res = await axiosAuth.get(`/shops?page=${page - 1}&search=${search}`);
    setState(res.data);
    setIsLoading(false);
  };

  const handleNext = async (page: number) => {
    setIsLoading(true);
    const res = await axiosAuth.get(`/shops?page=${page + 1}&search=${search}`);
    setState(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/products?search=${search}&perPage=10`);
      setState(res.data);
      setIsLoading(false);
    };
    if (search !== "") {
      fetchData();
    }
  }, [search]);

  console.log(state);
  console.log(shops);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="w-full py-4 px-2">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="w-16">No</th>
              <th className="text-left">Shop Name</th>
              <th className="w-40">Shop Code</th>
              <th className="w-40">Location</th>
              <th className="w-40">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {state?.data.map((shop, idx) => (
              <tr
                className="cursor-pointer rounded bg-light-gray"
                onClick={() => {
                  router.push(`/shops/${shop.id}`).catch((_) => null);
                }}
                key={idx}
              >
                <td className="py-5 text-center ">{idx + 1}</td>
                <td className="py-5 text-left">{shop.name}</td>
                <td className="py-5 text-center">{shop.shopCode}</td>
                <td className="py-5 text-center">
                  {shop.location ? capitalize(shop.location) : ""}
                </td>
                <td className="py-5 text-center ">{shop.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={state.totalPages}
        perPage={state.perPage}
        page={state.page}
        handlePrev={handlePrev}
        handleNext={handleNext}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Shops;
