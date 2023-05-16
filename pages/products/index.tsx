import { Card, Status } from "@/components";
import { getProducts } from "@/services/products";
import { Product } from "@/types";
import { capitalize } from "@/utils/utilities";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getProducts();

  return {
    props: {
      products: data,
    },
  };
};

interface IPage {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Product[];
}

const ProductList = ({ products }: { products: IPage }) => {
  const router = useRouter();

  const navigate = (productId: string) =>
    router.push(`/products/${productId}`).catch((_) => null);

  return (
    <div className="mx-auto max-w-6xl">
      <Card heading="Product List">
        <div className="flex items-center rounded border border-gray-600 bg-light-gray px-2">
          <BiSearch className="text-3xl text-gray-500" />
          <input
            type="search"
            placeholder="Search for product"
            className="w-full bg-transparent p-2  outline-none "
          />
        </div>

        <table className="mt-5 w-full border-separate">
          <thead>
            <tr className="text-left text-xl">
              <th className="w-14 pb-3 text-center">NO.</th>
              <th className="px-2 pb-3">Product</th>
              <th className="w-40 px-2 pb-3 text-center">Category</th>
              <th className="w-40 px-2 pb-3 text-center">Stock</th>
              <th className="w-40 px-2 pb-3 text-center">Price</th>
            </tr>
          </thead>

          <tbody className="border-separate border-spacing-10 space-y-20">
            {products?.data.map((product, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 ? "bg-gray-500 bg-opacity-20" : ""
                } cursor-pointer`}
                key={product.id}
                onClick={() => {
                  navigate(product.id);
                }}
              >
                <td className="py-7 text-center">{idx + 1}</td>
                <td className="px-2">
                  <div className="flex items-center gap-5">
                    <div className="relative flex-shrink-0 h-12 w-14 overflow-hidden">
                      <Image
                        src={product.images[0]?.secure_url as string}
                        style={{ objectFit: "cover" }}
                        alt={product.title}
                        sizes="48,56"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{product.title}</h3>
                      <p className="text-md line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 text-center">
                  {capitalize(product.category)}
                </td>
                <td className="px-2 text-center">
                  <Status
                    variant={product.stock === 0 ? "danger" : "success"}
                  >{`${
                    product.stock === 0 ? "Out of" : `${product.stock} in`
                  } stock`}</Status>
                </td>
                <td className="px-2 text-center">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ProductList;
