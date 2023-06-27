import { Back } from "@/components";
import { useRouter } from "next/router";
import { getDeliveries } from "@/services/deliveries";
import { Delivery } from "@/types/deliveries";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getDeliveries();

  return {
    props: {
      deliveries: data,
    },
  };
};

const Deliveries = ({ deliveries }: { deliveries: Delivery[] }) => {
  const router = useRouter();

  console.log(deliveries);

  const navigate = (deliveryId: string) =>
    router.push(`/deliveries/${deliveryId}`);

  return (
    <div>
      <Back />
      <div className="mx-auto max-w-5xl">
        <div className="w-full py-4 px-2">
          <table className="w-full border-separate border-spacing-y-7">
            <thead>
              <tr>
                <th className="w-20">No</th>
                <th className="text-left">Request</th>
                <th className="w-40">Full Name</th>
                <th className=" w-40">From</th>
                <th className="">To</th>
                <th className=" w-20">Contact</th>
              </tr>
            </thead>
            <tbody>
              {deliveries?.map((delivery, idx) => (
                <tr
                  className="cursor-pointer rounded bg-light-gray"
                  onClick={() => {
                    navigate(delivery.id).catch((error) => null);
                  }}
                  key={idx}
                >
                  <td className="py-5 text-center">{idx + 1}</td>
                  <td className="py-5 text-left">{delivery.request}</td>
                  <td className="py-5 text-center">{delivery.fullName}</td>
                  <td className="py-5 text-center">{delivery.from}</td>
                  <td className="py-5 text-center">{delivery.to}</td>
                  <td className="flex justify-center py-5 pr-5">
                    {delivery.phoneNumber}
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

export default Deliveries;
