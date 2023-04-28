import axios from "@/lib/axios";

export const getShops = async () => {
  try {
    const res = await axios.get("/shops");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const getShop = async (shopId: string) => {
  try {
    const res = await axios.get(`/shops/${shopId}`);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const createShop = async (data: any) => {
  try {
    const res = await axios.post(`/shops`, data);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const updateShop = async (shopId: string, data: any) => {
  try {
    const res = await axios.patch(`/shops/${shopId}`, data);
    console.log(res);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
