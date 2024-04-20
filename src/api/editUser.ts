import { SwrKey } from "../utility/SwrKey";
import { FormValues } from "../validation/formValidation";
import api from "./index";
import useSWRMutation from "swr/mutation";

const editUser = async (
  url: string,
  id: number,
  { arg }: { arg: FormValues }
) => {
  await api.put(
    `${process.env.REACT_APP_API_BASE_URL}/${url}/${id.toString()}`,
    arg
  );
};

export const useEditUser = (id: number) => {
  return useSWRMutation(SwrKey.Edit, (_, { arg }: { arg: FormValues }) => {
    editUser("users", id, { arg });
  });
};
