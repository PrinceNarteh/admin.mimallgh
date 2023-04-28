type ICategory =
  | "food"
  | "fashion_and_wears"
  | "grocery_and_general"
  | "health_and_wellness"
  | "home_and_electrical_appliances"
  | "personal_services"
  | "printing_and_stationery"
  | "tech";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: ICategory;
  rating: number[];
  shopId: string;
  images: {
    id: string;
    public_id: string;
    secure_url: string;
  }[];
};

export type Shop = {
  id: string;
  name: string;
  shopCode: string;
  plainPassword: string;
  description: string;
  location: string;
  mapDirection: string;
  phoneNumber: string;
  alternateNumber?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
  facebookHandle?: string;
  openingTime: string;
  closingTime: string;
  image: string;
  products: Product[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  address?: string;
  phoneNumber: string;
  alternateNumber?: string;
  nationality?: string;
  email: string;
  image: string;
  cardType?: string;
  cardNumber?: string;
  active?: boolean;
  role: "admin" | "user" | "seller";
  level: "level_one" | "level_two" | "level_three" | "super_user";
  orders: [];
};
