import axios from "@/lib/axios";

export const getDeliveryCompanies = async () => {
  try {
    const res = await axios.get("/delivery-companies");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const getDeliveryCompany = async (getDeliveryCompanyId: string) => {
  try {
    const res = await axios.get(`/delivery-companies/${getDeliveryCompanyId}`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
