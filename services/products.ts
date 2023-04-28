import axios from "@/lib/axios";

export const getProduct = async (productId: string) => {
  try {
    const res = await axios.get(`/products/${productId}`);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`/products`);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
