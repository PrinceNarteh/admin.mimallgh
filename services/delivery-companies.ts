import axios from "@/lib/axios";

export const getDeliveryCompanies = async () => {
  try {
    const res = await axios.get("/delivery-companies");
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
