// type ICategory =
//   | "food"
//   | "fashion_and_wears"
//   | "grocery_and_general"
//   | "health_and_wellness"
//   | "home_and_electrical_appliances"
//   | "personal_services"
//   | "printing_and_stationery"
//   | "tech";

// export type Product = {
//   brand: string;
//   category:
//     | "food"
//     | "fashion_and_wears"
//     | "grocery_and_general"
//     | "health_and_wellness"
//     | "home_and_electrical_appliances"
//     | "personal_services"
//     | "printing_and_stationery"
//     | "tech";
//   createdAt: string;
//   description: string;
//   discountPercentage: number;
//   id: string;
//   images: {
//     id: string;
//     public_id: string;
//     secure_url: string;
//   }[];
//   price: number;
//   shop: { id: string; shopCode: string; name: string };
//   stock: number;
//   title: string;
//   updatedAt: string;
// };

export interface Product {
  shopId: string;
  id: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  discountPercentage: number;
  category:
    | "food"
    | "fashion_and_wears"
    | "grocery_and_general"
    | "health_and_wellness"
    | "home_and_electrical_appliances"
    | "personal_services"
    | "printing_and_stationery"
    | "tech";
  images: {
    id: string;
    name: string;
  }[];
  shop: {
    id: string;
    name: string;
    location: string;
  };
}
[];

export interface IProduct {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  data: Product[];
}
