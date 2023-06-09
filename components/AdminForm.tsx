import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { User } from "@/types";
import { capitalize } from "@/utils/utilities";
import { adminDto } from "@/utils/validations";
import { Button, Card, InputField } from "./index";

const levels = ["level_one", "level_two", "level_three", "super_user"];

export const AdminForm = ({ admin }: { admin?: User }) => {
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: admin
      ? admin
      : {
          id: "",
          firstName: "",
          lastName: "",
          middleName: "",
          email: "",
          address: "",
          nationality: "",
          cardType: "",
          cardNumber: "",
          phoneNumber: "",
          alternateNumber: "",
          level: "level_one",
          role: "admin",
        },
    resolver: zodResolver(adminDto),
  });

  const submitHandler = async (data: any) => {
    if (!data.id) {
    } else {
    }
  };

  return (
    <div className="mx-auto max-w-4xl pb-7">
      <Card heading={`${router.query.adminId ? "Edit" : "Add"} Administrator`}>
        <form
          className="w-full space-y-3"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-5 lg:flex-row">
            <InputField
              name="firstName"
              label="First name"
              register={register}
              errors={errors}
              validationSchema={{ required: "First Name is required" }}
            />
            <InputField
              name="middleName"
              label="Other name(s)"
              register={register}
              errors={errors}
              validationSchema={{ required: false }}
            />
            <InputField
              name="lastName"
              label="Last name"
              register={register}
              errors={errors}
              validationSchema={{ required: "Last Name is required" }}
            />
          </div>
          <InputField
            name="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            validationSchema={{ required: "Email is required" }}
          />
          <div className="flex flex-col gap-5 md:flex-row">
            <InputField
              name="address"
              label="Address"
              register={register}
              errors={errors}
              validationSchema={{ required: "Address is required" }}
            />
            <InputField
              name="nationality"
              label="Nationality"
              register={register}
              errors={errors}
              validationSchema={{ required: "Nationality is required" }}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="my-2 w-full">
              <label
                htmlFor=""
                className="mb-1.5 block pl-2 capitalize tracking-widest"
              >
                ID Card Type
              </label>
              <select
                className="w-full rounded border border-gray-500 bg-transparent p-2 outline-none"
                {...register("cardType")}
                defaultValue={getValues().cardType}
              >
                <option value="">Select Card</option>
                <option value="ghana_card">Ghana Card</option>
                <option value="student_id">Student ID</option>
                <option value="voters_id">Voters ID</option>
              </select>
            </div>
            <div className="my-2 w-full">
              <label
                htmlFor={"cardNumber"}
                className="mb-1.5 block pl-2 capitalize tracking-widest"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                {...register("cardNumber")}
                className="w-full rounded border border-gray-500 bg-transparent p-2 outline-none"
              />
              {errors && errors["cardNumber"] && (
                <span className="pl-1 text-sm text-red-500">
                  {errors["cardNumber"]?.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <InputField
              label="Phone Number"
              name="phoneNumber"
              register={register}
              errors={errors}
              validationSchema={{ required: "Phone number is required" }}
            />
            <InputField
              name="alternateNumber"
              label="Alternate Phone Number"
              register={register}
              errors={errors}
            />
          </div>
          {!router.query.adminId && (
            <div className="flex flex-col gap-5 md:flex-row">
              <InputField
                name="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                validationSchema={{ required: "Password is required" }}
              />
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                register={register}
                errors={errors}
                validationSchema={{ required: "Confirm password is required" }}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="level"
              className="mb-1.5 block pl-2 capitalize tracking-widest"
            >
              Level
            </label>
            <select
              id="level"
              className="w-full rounded border border-gray-500 bg-transparent p-2 outline-none"
              {...register("level")}
              value={getValues().level.toLowerCase()}
            >
              {levels.map((level, idx) => (
                <option key={idx} className="bg-light-gray" value={level}>
                  {capitalize(level)}
                </option>
              ))}
            </select>
            {errors && errors["level"] && (
              <span className="pl-1 text-sm text-red-500">
                {errors["level"]?.message as string}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="rounded bg-blue-600 py-2 px-4 text-white"
            disabled={isSubmitting}
          >
            {`${router.query.adminId ? "Edit" : "Add"} Administrator`}
          </Button>
        </form>
      </Card>
    </div>
  );
};
