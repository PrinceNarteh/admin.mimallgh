import axios, { axiosAuth } from "@/lib/axios";
import { locations } from "@/utils/menus";
import { convertBase64, parseImageUrl } from "@/utils/utilities";
import { createShopDto, type ICreateShop } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { ImFacebook2, ImWhatsapp } from "react-icons/im";
import { Button, Card, InputField, Loader, Modal, SelectField } from "./index";

const initialState: ICreateShop = {
  id: undefined,
  name: "",
  location: "",
  mapDirection: "",
  openingTime: "",
  closingTime: "",
  phoneNumber: "",
  description: "",
  facebookHandle: "",
  instagramHandle: "",
  whatsappNumber: "",
  image: "",
  banner: "",
};

export const ShopForm = ({ shop: shopData }: { shop?: any }) => {
  const [shop, setShop] = useState<ICreateShop | undefined>(shopData);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [active, setActive] = useState<"image" | "banner" | null>(null);
  const router = useRouter();

  const {
    register,
    formState: { errors, isLoading },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: shop ? shop : initialState,
    resolver: zodResolver(createShopDto),
  });

  const convertImage = (file: File | null, func: any) => {
    if (file === null) return;
    convertBase64(file).then((res) => {
      func(res);
    });
  };

  const handleDelete = () => setOpenDialog(true);

  async function confirmDelete(choose: boolean) {
    if (choose) {
      let res = await axiosAuth.delete(`/shops/${active}/${shop?.id}`);

      console.log(res.data);

      if (res.status === 200) {
        toast.success("Image deleted successfully");
        setShop(res.data);
        setOpenDialog(false);
      } else {
        toast.error("Error deleting shop image");
      }
    } else {
      setOpenDialog(false);
    }
  }

  const submitHandler: SubmitHandler<ICreateShop> = async (value) => {
    const formData = new FormData();
    formData.append("closingTime", value.closingTime);
    formData.append("description", value.description);
    formData.append("facebookHandle", value.facebookHandle || "");
    formData.append("instagramHandle", value.instagramHandle || "");
    formData.append("location", value.location);
    formData.append("mapDirection", value.mapDirection);
    formData.append("name", value.name);
    formData.append("openingTime", value.openingTime);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("whatsappNumber", value.whatsappNumber || "");
    formData.append("image", value.image as string);
    formData.append("banner", value.banner as string);

    if (shop?.id) {
      try {
        if (value.id) formData.append("id", value.id);
        if (image) formData.append("newImage", image);
        if (banner) formData.append("newBanner", banner);

        const res = await axios.patch(`/shops/${shop?.id}`, formData, {
          headers: {
            "Content-Type": "form-data/multipart",
          },
        });

        toast.success("Shop updated successfully");
        router.push(`/shops/${res.data.id}`);
      } catch (error) {
        console.log(error);
        toast.error("Error updating shop");
      }
    } else {
      try {
        const res = await axios.post("/shop-auth/register", formData, {
          headers: {
            "Content-Type": "form-data/multipart",
          },
        });

        toast.success("Shop created successfully");
        router.push(`/shops/${res.data.id}`);
      } catch (error) {
        console.log(error);
        toast.error("Error creating shop");
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="pb-10">
      <Card heading={`${getValues().id ? "Edit" : "Add"} Shop`}>
        <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-5 lg:flex-row">
            <InputField
              name="name"
              label="Shop Name"
              register={register}
              errors={errors}
              validationSchema={{ required: "Shop name is required" }}
            />
            <SelectField
              label="Location"
              options={locations}
              errors={errors}
              register={register}
              {...register("location", { required: "Location is required." })}
            />
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <InputField
              name="mapDirection"
              label="Map Direction"
              register={register}
              errors={errors}
              validationSchema={{ required: "Shop name is required" }}
            />
            <InputField
              name="phoneNumber"
              label="Phone Number"
              register={register}
              errors={errors}
              validationSchema={{ required: "Location is required" }}
            />
          </div>
          <div>
            <label htmlFor="" className="mb-2 inline-block capitalize">
              Description
            </label>
            <textarea
              className="w-full rounded border border-gray-600 bg-transparent p-2 outline-none"
              rows={5}
              {...register("description")}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Working Hours</label>
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex w-full rounded-lg border border-gray-600 bg-gray-700">
                <div className="w-fit whitespace-nowrap rounded-l-lg bg-gray-600 p-2">
                  Opening Time
                </div>
                <input
                  type="time"
                  className="block w-full bg-transparent p-2.5 text-sm outline-none"
                  placeholder="Facebook"
                  {...register("openingTime")}
                />
              </div>
              <div className="flex w-full rounded-lg border border-gray-600 bg-gray-700">
                <div className="w-fit whitespace-nowrap rounded-l-lg bg-gray-600 p-2">
                  Closing Time
                </div>
                <input
                  type="time"
                  id="email-address-icon"
                  className="block w-full bg-transparent p-2.5 text-sm outline-none placeholder:text-light-gray"
                  placeholder="Facebook"
                  {...register("closingTime")}
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <label htmlFor="">Social Media Handlers</label>
            <div className="mt-3 flex flex-col gap-5 lg:flex-row">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ImFacebook2 />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Facebook"
                  {...register("facebookHandle")}
                />
              </div>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiInstagram />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Instagram"
                  {...register("instagramHandle")}
                />
              </div>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ImWhatsapp />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 file:text-light-gray focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Whatsapp"
                  {...register("whatsappNumber")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            {shop?.image ? (
              <div>
                <p className="mb-2 text-lg font-semibold">Shop Image</p>
                <div className="relative">
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setActive("image");
                      handleDelete();
                    }}
                    className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                  />
                  <Image
                    src={parseImageUrl(shop.image, "shops")}
                    width={300}
                    height={300}
                    alt=""
                    className="rounded-md"
                  />
                </div>
              </div>
            ) : null}
            {shop?.banner ? (
              <div className="flex-1 ">
                <p className="mb-2 text-lg font-semibold">Shop Banner</p>
                <div className="relative h-[300px] rounded">
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setActive("banner");
                      handleDelete();
                    }}
                    className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                  />
                  <Image
                    src={parseImageUrl(shop.banner, "shops")}
                    fill
                    alt=""
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-5 md:flex-row mt-5">
            <div className="basis-[300px]">
              <label
                className="mb-2 block bg-light-gray pl-2 capitalize tracking-widest"
                htmlFor="user_avatar"
              >
                Select Shop Image
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border bg-dark-gray file:border-none file:bg-light-gray file:px-5 file:py-3 file:text-white"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files ? e.target.files[0] : null);
                  convertImage(
                    e.target.files ? e.target.files[0] : null,
                    setImagePreview
                  );
                }}
                multiple
                accept=".png, .jpg, .jpeg"
              ></input>
              {image ? (
                <div className="flex gap-5 overflow-x-auto py-3">
                  <div className="relative h-40 w-40 shrink-0 rounded-md bg-slate-500">
                    <AiOutlineCloseCircle
                      onClick={() => setImage(null)}
                      className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                    />
                    <div className="overflow-hidden">
                      <Image
                        src={imagePreview}
                        fill
                        alt=""
                        className="rounded object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex-1 flex-col">
              <label
                className="mb-2 block bg-light-gray pl-2 capitalize tracking-widest"
                htmlFor="user_avatar"
              >
                Select Shop Banner
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border bg-dark-gray file:border-none file:bg-light-gray file:px-5 file:py-3 file:text-white"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={(e) => {
                  setBanner(e.target.files ? e.target.files[0] : null);
                  convertImage(
                    e.target.files ? e.target.files[0] : null,
                    setBannerPreview
                  );
                }}
                multiple
                accept=".png, .jpg, .jpeg"
              ></input>
              {banner ? (
                <div className="flex gap-5 overflow-x-auto py-3">
                  <div className="relative h-40 w-40 shrink-0 rounded-md bg-slate-500">
                    <AiOutlineCloseCircle
                      onClick={() => setBanner(null)}
                      className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                    />
                    <div className="overflow-hidden">
                      <Image
                        src={bannerPreview}
                        fill
                        alt=""
                        className="rounded object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <Button>{`${getValues().id ? "Edit" : "Add"} Shop`}</Button>
        </form>
      </Card>
      {openDialog ? (
        <Modal
          onDialog={confirmDelete}
          message={openDialog ? `the shop ${active}` : ""}
        />
      ) : null}
    </div>
  );
};
