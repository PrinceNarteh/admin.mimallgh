import { useRouter } from "next/router";
import { MdArrowBackIosNew } from "react-icons/md";

export const Back = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex cursor-pointer items-center"
    >
      <MdArrowBackIosNew className="mr-2" /> Back
    </div>
  );
};
