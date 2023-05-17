import axios from "@/lib/axios";

export const getOrders = async () => {
  try {
    const res = await axios.get("/orders");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
