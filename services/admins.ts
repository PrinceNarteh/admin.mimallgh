import axios from "@/lib/axios";

export const getAdmins = async () => {
  try {
    const res = await axios.get("/users/admins");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
