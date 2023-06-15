import Image from "next/image";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Shop } from "@/types";
import { categories } from "@/utils/menus";
import { convertBase64, parseDeliveryImageUrl } from "@/utils/utilities";
import {
  ICreateDeliveryCompany,
  ICreateProduct,
  createDeliveryCompanyDto,
} from "../utils/validations";
import {
  Button,
  Card,
  InputField,
  Modal,
  SearchFilter,
  SelectOption,
} from "./index";
import { IDeliveryCompany } from "@/types/delivery-companies";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";

const initialState: IDeliveryCompany = {
  id: undefined,
  name: "",
  slug: "",
  images: [],
  phoneNumber: "",
  whatsappNumber: "",
  alternatePhoneNumber: "",
};

export const DeliveryCompanyForm = ({
  deliveryCompany: deliveryCompanyData,
}: {
  deliveryCompany?: IDeliveryCompany;
}) => {
  const [deliveryCompany, setDeliveryCompany] = useState<
    IDeliveryCompany | undefined
  >(deliveryCompanyData);
  const router = useRouter();

  const {
    register,
    reset,
    formState: { errors, isLoading },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: deliveryCompany ? deliveryCompany : initialState,
    resolver: zodResolver(createDeliveryCompanyDto),
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [imageId, setImageId] = useState("");
  const axiosAuth = useAxiosAuth();

  const selectedImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    let pickedImages: File[] = [];
    if (files !== null) {
      pickedImages = Array.from(files);
    }
    setImages([...images, ...pickedImages]);
  };

  function deleteSelectedImage(index: number) {
    const imageCopy = [...images];
    if (images.length === 1) {
      setImages([]);
      setPreviewImages([]);
    } else {
      imageCopy.splice(index, 1);
      setImages([...imageCopy]);
    }
  }

  useEffect(() => {
    const getImages = () => {
      const imagesArray: string[] = [];
      images?.map((file) => {
        convertBase64(file)
          .then((res) => {
            imagesArray.push(res);
          })
          .finally(() => {
            setPreviewImages(imagesArray);
          });
      });
    };
    getImages();
  }, [images]);

  const handleDelete = (name: string) => {
    setImageId(name);
    setOpenDialog(true);
  };

  async function confirmDelete(choose: boolean) {
    if (choose) {
      const toastId = toast.loading("Loading...");

      try {
        const res = await axiosAuth.delete(
          `delivery-companies/image/${imageId}`
        );
        reset(res.data);
        toast.dismiss(toastId);
        toast.success("Image deleted successfully");
      } catch (error) {
        toast.dismiss(toastId);
      } finally {
        setOpenDialog(false);
      }
    } else {
      setOpenDialog(false);
    }
  }

  const submitHandler: SubmitHandler<ICreateDeliveryCompany> = async (
    value
  ) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("alternatePhoneNumber", value.alternateNumber || "");
    formData.append("whatsappNumber", value.whatsappNumber);

    if (deliveryCompany?.id) {
      try {
        if (value.id) formData.append("id", value.id);
        if (images) {
          images.forEach((image) => {
            formData.append("newImage", image);
          });
        }

        const res = await axios.patch(
          `/delivery-companies/${deliveryCompany?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "form-data/multipart",
            },
          }
        );

        toast.success("Delivery Company updated successfully");
        router.push(`/delivery-companies/${res.data.id}`);
      } catch (error) {
        console.log(error);
        toast.error("Error updating Delivery Company");
      }
    } else {
      try {
        const res = await axios.post("/delivery-company", formData, {
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

  return (
    <div className="mx-auto max-w-4xl pb-5">
      <Card
        heading={`${deliveryCompany?.id ? "Edit" : "Add"} Delivery Company`}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="space-y-4">
            <InputField
              name="name"
              label="Delivery Company Name"
              register={register}
              errors={errors}
              validationSchema={{ required: "Shop name is required" }}
            />
            <div className="flex flex-col gap-5 lg:flex-row">
              <InputField
                name="phoneNumber"
                label="Phone Number"
                register={register}
                errors={errors}
                validationSchema={{ required: "Location is required" }}
              />
              <InputField
                name="alternatePhoneNumber"
                label="Alternate Phone Number"
                register={register}
                errors={errors}
              />
              {deliveryCompany?.images.map((image) => (
                <div>
                  <p className="mb-2 text-lg font-semibold">Shop Image</p>
                  <div className="relative">
                    <AiOutlineCloseCircle
                      onClick={() => handleDelete(image.id)}
                      className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                    />
                    <Image
                      src={parseDeliveryImageUrl(image.name)}
                      width={300}
                      height={300}
                      alt=""
                      className="rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Product Images */}
            <div className="">
              <label
                className="mb-2 block bg-light-gray pl-2 capitalize tracking-widest"
                htmlFor="user_avatar"
              >
                Select Product Image(s)
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border bg-dark-gray file:border-none file:bg-light-gray file:px-5 file:py-3 file:text-white"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={selectedImages}
                multiple
                accept=".png, .jpg, .jpeg"
              ></input>
            </div>
            <div className="flex gap-5 overflow-x-auto py-3">
              {previewImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-32 w-32 shrink-0 rounded-md bg-slate-500"
                >
                  <AiOutlineCloseCircle
                    onClick={() => deleteSelectedImage(index)}
                    className="absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-white text-2xl text-orange-500"
                  />
                  <div className="overflow-hidden">
                    <Image
                      src={image}
                      fill
                      sizes="128px"
                      style={{ objectFit: "cover" }}
                      alt=""
                      className="rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit">
            {deliveryCompany?.id ? "Edit" : "Add"} Product
          </Button>
        </form>
      </Card>
      {openDialog ? (
        <Modal
          onDialog={confirmDelete}
          message={
            openDialog
              ? `Are you sure you want to delete this product image?`
              : ""
          }
        />
      ) : null}
    </div>
  );
};
