import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { Back, Button, Card, Modal } from "@/components";
import { getDelivery } from "@/services/deliveries";
import { Delivery } from "@/types/deliveries";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { deliveryId } = context.query;
  const data = await getDelivery(deliveryId as string);

  return {
    props: {
      delivery: data,
    },
  };
};

const DeliveryDetails = ({ delivery }: { delivery: Delivery }) => {
  const {
    query: { deliveryId },
    push,
  } = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => setOpenDialog(true);

  function confirmDelete(choose: boolean) {
    if (choose) {
    } else {
      setOpenDialog(false);
    }
  }

  const dateAndTime = delivery.dateAndTime.split("T");
  const dateTime = `${new Date(
    delivery.dateAndTime
  ).toDateString()} @ ${new Date(delivery.dateAndTime).toLocaleTimeString()}`;
  const time = `${delivery.dateAndTime} ${
    parseInt(delivery.dateAndTime.split(":")[0], 10) < 12 ? "AM" : "PM"
  }`;

  return (
    <div className="pb-5">
      <div className="mx-auto mt-5 max-w-3xl space-y-5">
        <Back />
        <Card heading="Administrator Details">
          <DetailItem label="Name" value={delivery.fullName} dark />
          <DetailItem label="Request" value={delivery.request} />
          <DetailItem
            label="Delivery Charge"
            value={`${delivery.deliveryCharge}`}
            dark
          />
          <DetailItem label="Phone Number" value={`${delivery.phoneNumber}`} />
          <DetailItem
            label="Alternate Phone Number"
            value={`${delivery.alternatePhoneNumber}`}
            dark
          />
          <DetailItem label="From" value={`${delivery.from}`} />
          <DetailItem label="To" value={`${delivery.to}`} dark />
          <DetailItem
            label={`${dateAndTime.length > 1 ? "Data and Time" : "Time"}`}
            value={`${dateAndTime.length > 1 ? dateTime : time}`}
          />
        </Card>
        <div className="flex items-center justify-end gap-5">
          <Link href="#" className="link">
            Edit
          </Link>
          <Button variant="danger">
            <HiOutlineTrash />
            Delete
          </Button>
        </div>
      </div>
      {openDialog ? (
        <Modal onDialog={confirmDelete} message={openDialog ? `` : ""} />
      ) : null}
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  dark,
}: {
  label: string;
  value?: string;
  dark?: boolean;
}) => (
  <div
    className={`flex items-center justify-between py-4 px-4 ${
      dark ? "bg-dark-gray" : ""
    }`}
  >
    <div className="font-bold">{label}</div>
    <div>{value}</div>
  </div>
);

export default DeliveryDetails;
