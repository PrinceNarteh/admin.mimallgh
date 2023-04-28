import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

import { Back, Button, Card, Modal, Loader } from "@/components";
import { User } from "@/types";

const AdministratorDetails = ({ admin }: { admin: User }) => {
  const {
    query: { adminId },
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

  return (
    <div className="pb-5">
      <Back />
      <div className="mx-auto mt-5 max-w-3xl space-y-5">
        <Card heading="Administrator Details">
          <DetailItem
            label="Name"
            value={`${admin?.firstName || ""} ${admin?.middleName || ""} ${
              admin?.lastName || ""
            }`}
            dark
          />
          <DetailItem label="Shop Name" value={`${admin?.lastName || ""}`} />
          <DetailItem label="Email" value={`${admin?.email || ""}`} dark />
          <DetailItem
            label="Phone Number"
            value={`${admin?.phoneNumber || ""}`}
          />
          <DetailItem label="Address" value={`${admin?.address || ""}`} dark />
          <DetailItem
            label="Status"
            value={`${admin?.active ? "Active" : "Inactive"}`}
          />
          <DetailItem label="Date Joined" value={`${""}`} dark />
          <DetailItem label="Level" value={admin?.level || ""} />
        </Card>
        <div className="flex items-center justify-end gap-5">
          <Link
            href={`/administrators/${admin?.id || ""}/edit`}
            className="link"
          >
            Edit
          </Link>
          <Button variant="danger" onClick={() => handleDelete()}>
            <HiOutlineTrash />
            Delete
          </Button>
        </div>
      </div>
      {openDialog ? (
        <Modal
          onDialog={confirmDelete}
          message={
            openDialog
              ? `${admin?.firstName || ""} ${admin?.lastName || ""}`
              : ""
          }
        />
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

export default AdministratorDetails;
