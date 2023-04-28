import axios from "@/lib/axios";

export const getAdmins = async () => {
  try {
    const res = await axios.get("/users/role/admin");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
