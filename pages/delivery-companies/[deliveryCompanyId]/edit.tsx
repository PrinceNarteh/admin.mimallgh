import { Back } from "@/components";
import { DeliveryCompanyForm } from "@/components/DeliveryCompanyForm";
import { getDeliveryCompany } from "@/services/delivery-companies";
import { GetServerSideProps } from "next";
import { IDeliveryCompany } from "../../../types/delivery-companies";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { deliveryCompanyId } = context.query;
  const data = await getDeliveryCompany(deliveryCompanyId as string);

  return {
    props: {
      deliveryCompany: data,
    },
  };
};

const EditDeliveryCompany = ({
  deliveryCompany,
}: {
  deliveryCompany: IDeliveryCompany;
}) => {
  console.log(deliveryCompany);
  return (
    <div>
      <Back />
      <DeliveryCompanyForm deliveryCompany={deliveryCompany} />
    </div>
  );
};

export default EditDeliveryCompany;
