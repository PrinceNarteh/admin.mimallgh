import { BsShop } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";

export const menus = [
  {
    name: "Dashboard",
    link: "/",
    icon: MdOutlineDashboard,
  },
  {
    name: "Administrators",
    icon: FiShoppingBag,
    subLinks: [
      {
        name: "Administrators List",
        link: "/administrators",
      },
      {
        name: "Add Administrator",
        link: "/administrators/add",
      },
    ],
  },

  {
    name: "Shops",
    icon: BsShop,
    subLinks: [
      {
        name: "Shop List",
        link: "/shops",
      },
      {
        name: "Add Shop",
        link: "/shops/add",
      },
    ],
  },
  {
    name: "Products",
    icon: FiShoppingBag,
    subLinks: [
      {
        name: "Product List",
        link: "/products",
      },
      {
        name: "Add Product",
        link: "/products/add",
      },
    ],
  },
  {
    name: "Orders",
    icon: TiShoppingCart,
    subLinks: [
      {
        name: "Order List",
        link: "/orders",
      },
    ],
  },
];

export const locations = [
  { label: "Select Location", value: "" },
  { label: "Amamoma", value: "amamoma" },
  { label: "Apewosika", value: "apewosika" },
  { label: "Ayensu", value: "ayensu" },
  { label: "Duakro", value: "duakro" },
  { label: "KNH", value: "knh" },
  { label: "Kokoado", value: "kokoado" },
  { label: "Kwasipra", value: "kwasipra" },
  { label: "New Site", value: "new_site" },
  { label: "Old Site", value: "old_site" },
  { label: "Science", value: "science" },
];

export const categories = [
  { label: "Food", value: "food" },
  { label: "Fashion & Wears", value: "fashion_and_wears" },
  { label: "Grocery & General", value: "grocery_and_general" },
  { label: "Health & Wellness", value: "health_and_wellness" },
  {
    label: "Home & Electrical Appliances",
    value: "home_and_electrical_appliances",
  },
  { label: "Personal Services", value: "personal_services" },
  { label: "Printing & Stationary", value: "printing_and_stationery" },
  { label: "Tech", value: "tech" },
];
