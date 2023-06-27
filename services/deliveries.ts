import axios from "@/lib/axios";
import { Delivery } from "@/types/deliveries";

export const getDelivery = async (id: string): Promise<Delivery> => {
  try {
    const res = await axios.get("/deliveries/" + id);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const getDeliveries = async (): Promise<Delivery[]> => {
  try {
    const res = await axios.get("/deliveries");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
