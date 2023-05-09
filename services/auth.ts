import axios from "@/lib/axios";

export const login = async (data: { shopCode: string; password: string }) => {
  try {
    const user = await axios.post("/auth/login-admin", data);
    return user;
  } catch (error) {}
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const user = await axios.post("/shop-auth/register", data);
    return user.data;
  } catch (error) {}
};
