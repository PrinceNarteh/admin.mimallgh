import { getDeliveryCompanies } from "@/services/delivery-companies";
import { IDeliveryCompany } from "@/types/delivery-companies";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BiSearch } from "react-icons/bi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getDeliveryCompanies();

  return {
    props: {
      deliveryCompanies: data,
    },
  };
};

const DeliveryCompanies = ({
  deliveryCompanies,
}: {
  deliveryCompanies: IDeliveryCompany[];
}) => {
  const router = useRouter();

  return (
    <div className="w-11/12 mx-auto">
      <div className=" flex justify-center">
        <div className="flex items-center rounded-lg border p-2">
          <input
            className="bg-transparent outline-none"
            type="search"
            name=""
            id=""
            placeholder="Search order..."
          />
          <BiSearch className="text-3xl text-gray-500" />
        </div>
      </div>
      <div className="w-full">
        <div className="w-full pb-4 px-2">
          <table className="w-full border-separate border-spacing-y-4">
            <thead className="bg-light-gray">
              <tr>
                <th className="w-20 py-4">No</th>
                <th className="py-4 text-left">Name</th>
                <th className="w-40 py-4 text-left">Slug</th>
                <th className="w-40 py-4">Phone No.</th>
                <th className="w-40 py-4">Alt Phone No.</th>
                <th className="w-40 py-4 pr-5">Whatsapp No.</th>
              </tr>
            </thead>
            <tbody>
              {deliveryCompanies &&
                deliveryCompanies.map((deliveryCompany, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      router.push(`/delivery-companies/${deliveryCompany.id}`)
                    }
                    className="cursor-pointer rounded bg-light-gray hover:scale-105 duration-500"
                  >
                    <td className="py-5 text-center ">{idx + 1}</td>
                    <td className="py-5 text-left ">{deliveryCompany.name}</td>
                    <td className="py-5 text-left">{deliveryCompany.slug}</td>
                    <td className="py-5 text-center ">
                      {deliveryCompany.phoneNumber}
                    </td>
                    <td className="py-5 pr-5 text-center">
                      {deliveryCompany.alternatePhoneNumber}
                    </td>
                    <td className="py-5 text-center ">
                      {deliveryCompany.whatsappNumber}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCompanies;
