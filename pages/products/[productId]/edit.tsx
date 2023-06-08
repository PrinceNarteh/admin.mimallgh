import { AddProductForm, Back } from "@/components";
import { getProduct } from "@/services/products";
import { Product } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;
  const data = await getProduct(productId as string);

  return {
    props: {
      product: data,
    },
  };
};

const EditProduct = ({ product }: { product: Product }) => {
  console.log(product);
  return (
    <div>
      <Back />
      <AddProductForm product={product} />
    </div>
  );
};

export default EditProduct;
