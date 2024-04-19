import api from "./index";
import useSWR from "swr";

const getAllUsers = async (url: string) => {
  return await api.get(`${process.env.REACT_APP_API_BASE_URL}/${url}`);
};

export const useGetAllUsers = () => {
  return useSWR("Users", () => getAllUsers("users"));
};
