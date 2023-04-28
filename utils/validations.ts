import { z } from "zod";

export const IdDto = z.object({
  id: z.string({ required_error: "ID is required" }).cuid(),
});

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
      public_id: z.string(),
      secure_url: z.string(),
    })
  ),
});

export type ICreateProduct = z.infer<typeof createProductDto>;
export const updateProductDto = createProductDto.partial();
export type IUpdateProduct = z.infer<typeof updateProductDto>;

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
  facebookHandle: z.union([z.string(), z.null()]),
  instagramHandle: z.union([z.string(), z.null()]),
  whatsappNumber: z.union([z.string(), z.null()]),
  branches: z.array(
    z.object({
      id: z.union([z.undefined(), z.string().cuid2()]),
      shopId: z.union([z.undefined(), z.string().cuid2()]),
      location: z.string({ required_error: "Location is required." }).min(1),
      mapDirection: z
        .string({ required_error: "Location is required." })
        .min(1)
        .optional(),
      phoneNumber: z.string({ required_error: "Location is required." }).min(1),
    })
  ),
});
export type ICreateShop = z.infer<typeof createShopDto>;
