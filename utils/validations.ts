import { z } from "zod";

export const IdDto = z.object({
  id: z.string({ required_error: "ID is required" }).cuid(),
});

// Product
export const createProductDto = z.object({
  shopId: z.string().cuid2(),
  title: z.string(),
  description: z
    .string({ required_error: "Description is required" })
    .min(2, "Description should be 2 or more characters"),
  price: z
    .number({ required_error: "Price is required" })
    .gte(0, "Price cannot be negative"),
  discountPercentage: z.number().gte(0, "Price cannot be negative").optional(),
  stock: z
    .number({ required_error: "Stock is required" })
    .gte(0, "Price cannot be negative"),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(2, "Brand should be 2 or more characters"),
  category: z.enum([
    "food",
    "fashion_and_wears",
    "grocery_and_general",
    "health_and_wellness",
    "home_and_electrical_appliances",
    "personal_services",
    "printing_and_stationery",
    "tech",
  ]),
  ratings: z
    .number()
    .min(1, "Minimum rating should be 1")
    .max(5, "Maximum rating should be 5")
    .optional(),
  images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type ICreateProduct = z.infer<typeof createProductDto>;
export const updateProductDto = createProductDto.partial();
export type IUpdateProduct = z.infer<typeof updateProductDto>;

// Shop
export const createShopDto = z.object({
  id: z.union([z.undefined(), z.string().cuid2()]),
  name: z
    .string({ required_error: "Shop name is required" })
    .min(1, "Shop name cannot be empty"),
  location: z
    .string({ required_error: "Location is required" })
    .min(1, "Location cannot be empty"),
  mapDirection: z.string(),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .length(10, "Phone number must be 10 characters"),
  description: z.string(),
  openingTime: z.string(),
  closingTime: z.string(),
  image: z.union([z.string(), z.null()]),
  banner: z.union([z.string(), z.null()]),
  facebookHandle: z.union([z.string(), z.null()]),
  instagramHandle: z.union([z.string(), z.null()]),
  whatsappNumber: z.union([z.string(), z.null()]),
});

// branches: z.array(
//     z.object({
//       id: z.union([z.undefined(), z.string().cuid2()]),
//       shopId: z.union([z.undefined(), z.string().cuid2()]),
//       location: z.string({ required_error: "Location is required." }).min(1),
//       mapDirection: z
//         .string({ required_error: "Location is required." })
//         .min(1)
//         .optional(),
//       phoneNumber: z.string({ required_error: "Location is required." }).min(1),
//     })
//   ),
export type ICreateShop = z.infer<typeof createShopDto>;

// User
export const adminDto = z
  .object({
    id: z.union([z.string().cuid2(), z.undefined()]),
    firstName: z
      .string({ required_error: "First name is required." })
      .min(1, "First name cannot be empty"),
    lastName: z
      .string({ required_error: "Last name is required." })
      .min(1, "Last name cannot be empty"),
    middleName: z.string().optional(),
    email: z.string({ required_error: "Email name is required." }).email(),
    address: z
      .string({ required_error: "Address is required." })
      .min(1, "Address cannot be empty"),
    cardType: z.enum(["ghana_card", "student_id", "voters_id"]).optional(),
    cardNumber: z
      .string({ required_error: "Card number is required" })
      .min(1, "Card number cannot be empty")
      .optional(),
    phoneNumber: z
      .string({ required_error: "Phone number is required." })
      .length(10, "Phone number must be ten numbers"),
    alternateNumber: z.string().optional(),
    password: z
      .string({ required_error: "Password name is required." })
      .min(6, "Password should be six character or more"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    nationality: z.string({ required_error: "Nationality is required" }).min(1),
    image: z.union([z.string(), z.null()]),
    role: z
      .enum(["user", "admin"], {
        required_error: "Role is required",
        invalid_type_error: "Invalid role value. Expect 'admin' | 'user'",
      })
      .default("admin"),
    level: z
      .enum(["level_one", "level_two", "level_three", "super_user"])
      .default("level_one"),
  })
  .refine((val) => val?.password === val?.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createDeliveryCompanyDto = z.object({
  id: z.union([z.string().cuid2(), z.undefined()]),
  name: z
    .string({ required_error: "Company name is required." })
    .min(1, "Company name cannot be empty"),
  phoneNumber: z
    .string({ required_error: "Phone number is required." })
    .length(10, "Phone number must be ten numbers"),
  whatsappNumber: z
    .string({ required_error: "Phone number is required." })
    .length(10, "Phone number must be ten numbers"),
  alternatePhoneNumber: z.string().optional(),
  location: z.string().optional(),
  images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type ICreateDeliveryCompany = z.infer<typeof createDeliveryCompanyDto>;
