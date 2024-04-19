import { GetResponse, Users } from "../types/SwrTypes";
import { SwrKey } from "../utility/SwrKey";
import api from "./index";
import useSWR from "swr";

const getAllUsers = async (url: string) => {
  const results = await api.get<GetResponse<Users>>(
    `${process.env.REACT_APP_API_BASE_URL}/${url}`
  );

  return results.data;
};

export const useGetAllUsers = () => {
  return useSWR(SwrKey.Users, () => getAllUsers("users"));
};
