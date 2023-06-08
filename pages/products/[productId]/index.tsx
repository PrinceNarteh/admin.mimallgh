import { Back, Card } from "@/components";
import { getProduct } from "@/services/products";
import { Product } from "@/types/products";
import { capitalize, parseProductImageUrl } from "@/utils/utilities";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;
  const data = await getProduct(productId as string);

  return {
    props: {
      product: data,
    },
  };
};

const ProductDetails = ({ product }: { product: Product }) => {
  const [images, setImages] = useState(product.images);
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto w-11/12 space-y-3 pb-5 py-10">
      <Back />
      <Card heading="Product Detail">
        <h3 className="mb-2 text-2xl font-semibold">{product?.title}</h3>
        <div className="min-h-96 grid grid-cols-1 space-y-5 md:grid-cols-12">
          <div className="col-span-5 space-y-3">
            <div className="relative h-[400px] bg-slate-500">
              <Image
                src={parseProductImageUrl(images[active].name)}
                sizes="400"
                fill
                style={{ objectFit: "cover" }}
                alt=""
                priority
              />
            </div>
            <div className="flex justify-between gap-3 overflow-x-auto">
              {product?.images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative h-[100px] w-[100px] shrink-0 cursor-pointer"
                  onClick={() => setActive(idx)}
                >
                  <Image
                    src={parseProductImageUrl(image.name)}
                    fill
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7 px-5">
            <Item label="Price" value={`¢${product?.price || ""}`} dark />
            <Item
              label="Discount Percentage"
              value={`¢${product?.discountPercentage || ""}`}
            />
            <Item label="Stock" value={`${product?.stock || ""}`} dark />
            <Item label="Brand" value={`${(product?.brand as string) || ""}`} />
            <Item
              label="Category"
              value={`${capitalize((product?.category as string) || "")}`}
              dark
            />
            <Item label="Shop" value={`${product?.shop.name || ""}`} />
            <div className={`bg-dark-gray py-4 px-4`}>
              <div className="mb-3 font-bold">Description</div>
              <div className="line-clamp-5">{product?.description || ""}</div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-end gap-5">
        <Link href={`/products/${product?.id}/edit`} className="link">
          Edit
        </Link>
        <button className="bg-red-500 py-2 px-4">Delete</button>
      </div>
    </div>
  );
};

const Item = ({
  label,
  value,
  dark = false,
}: {
  label: string;
  value: string;
  dark?: boolean;
}) => (
  <div
    className={`flex flex-col items-start justify-between py-4 px-4 ${
      dark ? "bg-dark-gray" : ""
    }`}
  >
    <div className="font-bold line-clamp-1">{label}</div>
    <div>{value}</div>
  </div>
);

export default ProductDetails;
