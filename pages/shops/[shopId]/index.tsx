import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Back, Button, Card, Modal, Loader } from "@/components";
import { capitalize } from "@/utils/utilities";
import { Shop } from "@/types";
import { GetServerSideProps } from "next";
import { getShop } from "@/services/shops";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { shopId } = context.query;
  const data = await getShop(shopId as string);

  return {
    props: {
      shop: data,
    },
  };
};

const ShopDetails = ({ shop }: { shop: Shop }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleDelete = () => setOpenDialog(true);

  function confirmDelete(choose: boolean) {
    if (choose) {
      // delete shop
    } else {
      setOpenDialog(false);
    }
  }

  return (
    <div className="pb-10">
      <Back />
      <div className="mx-auto max-w-3xl space-y-5">
        <Card heading="Shop Details">
          <div className="flex items-center justify-between py-4 px-4 bg-dark-gray">
            <div className="font-bold">Name</div>
            <div>{shop?.name}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4">
            <div className="font-bold">Location</div>
            <div>{capitalize(shop?.location || "")}</div>
          </div>
          <div className="flex items-center justify-between bg-dark-gray py-4 px-4">
            <div className="font-bold">Map Direction</div>
            <div>{shop?.mapDirection || ""}</div>
          </div>
          <div className="flex items-center justify-between py-4 px-4">
            <div className="font-bold">Phone Number</div>
            <div>{shop?.phoneNumber || ""}</div>
          </div>
          <div className="flex flex-col items-start bg-dark-gray py-4 px-4">
            <div className="mb-2 font-bold">Description</div>
            <div>{shop?.description || ""}</div>
          </div>
        </Card>

        {/* {shop?.branches.length
          ? shop.branches.map((branch, index) => (
              <Card
                heading={`${capitalize(branch.location) || ""} Branch`}
                key={index}
              >
                <div className="flex items-center justify-between bg-dark-gray py-4 px-4">
                  <div className="font-bold">Location</div>
                  <div>{capitalize(branch.location) || ""}</div>
                </div>
                <div className="flex items-center justify-between  py-4 px-4">
                  <div className="font-bold">Address</div>
                  <div>{branch.address || ""}</div>
                </div>
                <div className="flex items-center justify-between bg-dark-gray py-4 px-4">
                  <div className="font-bold">Phone Number</div>
                  <div>{branch.phoneNumber}</div>
                </div>
              </Card>
            ))
          : null} */}

        <div className="flex items-center justify-end gap-5">
          <Link href={`/shops/${shop?.id as string}/edit`} className="link">
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
          message={openDialog ? `${shop?.name as string}` : ""}
        />
      ) : null}
    </div>
  );
};

export default ShopDetails;
