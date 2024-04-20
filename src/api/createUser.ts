import { SwrKey } from "../utility/SwrKey";
import { FormValues } from "../validation/formValidation";
import api from "./index";
import useSWRMutation from "swr/mutation";

const createUser = async (url: string, { arg }: { arg: FormValues }) => {
  await api.post(`${process.env.REACT_APP_API_BASE_URL}/${url}`, arg);
};

export const useCreateUser = () => {
  return useSWRMutation(SwrKey.Create, (_, { arg }: { arg: FormValues }) => {
    createUser("users", { arg });
  });
};
