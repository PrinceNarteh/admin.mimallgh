import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Back, Button, Card, Modal } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getDeliveryCompany } from "@/services/delivery-companies";
import { IDeliveryCompany } from "@/types/delivery-companies";
import { parseDeliveryImageUrl } from "@/utils/utilities";
import { GetServerSideProps } from "next";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { deliveryCompanyId } = context.query;
  const data = await getDeliveryCompany(deliveryCompanyId as string);

  return {
    props: {
      deliveryCompany: data,
    },
  };
};

const DeliveryCompanyDetails = ({
  deliveryCompany,
}: {
  deliveryCompany: IDeliveryCompany;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  console.log(deliveryCompany);

  const handleDelete = () => setOpenDialog(true);

  async function confirmDelete(choose: boolean) {
    if (choose) {
      const res = await axiosAuth.delete(
        `/delivery-companies/${deliveryCompany.id}`
      );

      if (res.status === 200) {
        toast.success(res.data);
        router.push("/shops");
      } else {
        toast.error("Error deleting shop");
      }
    } else {
      setOpenDialog(false);
    }
  }

  return (
    <div className="pb-10">
      <Back />
      <div className="mx-auto max-w-3xl space-y-5">
        <Card heading="Delivery Company Details">
          <div className="flex items-center justify-between py-4 px-4 bg-dark-gray">
            <div className="font-bold">Name</div>
            <div>{deliveryCompany?.name}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4">
            <div className="font-bold">Slug</div>
            <div>{deliveryCompany.slug}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4 bg-dark-gray">
            <div className="font-bold">Phone Number</div>
            <div>{deliveryCompany.phoneNumber}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4">
            <div className="font-bold">Alternate Phone number</div>
            <div>{deliveryCompany.alternatePhoneNumber}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4 bg-dark-gray">
            <div className="font-bold">Whatsapp Number</div>
            <div>{deliveryCompany.whatsappNumber}</div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row p-4">
            {deliveryCompany.images.map((image) => (
              <div className="relative basis-60 h-40 flex-1">
                <Image
                  src={parseDeliveryImageUrl(image.name)}
                  alt=""
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-end gap-5">
          <Link
            href={`/delivery-companies/${deliveryCompany?.id as string}/edit`}
            className="link"
          >
            Edit
          </Link>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      </div>
      {openDialog ? (
        <Modal
          onDialog={confirmDelete}
          message={openDialog ? `${deliveryCompany?.name as string}` : ""}
        />
      ) : null}
    </div>
  );
};

export default DeliveryCompanyDetails;
