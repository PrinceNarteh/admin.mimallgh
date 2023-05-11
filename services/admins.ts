import axios from "@/lib/axios";

export const getAdmin = async (adminId: string) => {
  try {
    const res = await axios.get(`/users/${adminId}`);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};

export const getAdmins = async () => {
  try {
    const res = await axios.get("/users?role=admin");
    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
