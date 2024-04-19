import { FC } from "react";
import { useGetAllUsers } from "../api/getAllUsers";
import { CircularProgress } from "@mui/material";

export const UsersTable: FC = () => {
  const { data, isLoading } = useGetAllUsers();

  if (isLoading) return <CircularProgress />;

  console.log(data);
  return <div>hi</div>;
};
