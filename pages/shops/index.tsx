import { getShops } from "@/services/shops";
import { Shop } from "@/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const [data, setData] = useState(shops);
  console.log(data);
  const router = useRouter();

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
            {data?.data.map((shop, idx) => (
              <tr
                className="cursor-pointer rounded bg-light-gray"
                onClick={() => {
                  router
                    .push(`/shops/${shop.id}`)
                    .catch((error) => console.log(error));
                }}
                key={idx}
              >
                <td className="py-5 text-center ">{idx + 1}</td>
                <td className="py-5 text-left">{shop.name}</td>
                <td className="py-5 text-center">{shop.shopCode}</td>
                <td className="py-5 text-center">{shop.location}</td>
                <td className="py-5 text-center ">{shop.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default Shops;
