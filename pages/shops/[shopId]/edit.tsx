import { Back, ShopForm } from "@/components";
import { getShop } from "@/services/shops";
import { Shop } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { shopId } = context.query;
  const data = await getShop(shopId as string);

  return {
    props: {
      shop: data,
    },
  };
};

const AddShop = ({ shop }: { shop: Shop }) => {
  return (
    <div className="mx-auto max-w-4xl">
      <Back />
      <ShopForm shop={shop} />
    </div>
  );
};

export default AddShop;
