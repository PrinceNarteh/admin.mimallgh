import axios from "@/lib/axios";

export const getShops = async () => {
  try {
    const res = await axios.get("/users/admins");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
