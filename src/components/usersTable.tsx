import { FC } from "react";
import {
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useGetAllUsers } from "../api/getAllUsers";
import { EditUser } from "./editUser";
import moment from "moment";

export const UsersTable: FC = () => {
  const { data, isLoading } = useGetAllUsers();
  if (isLoading) return <CircularProgress />;

  if (data?.results.length === 0)
    return <div className="pt-10 px-10 w-full">No User is available</div>;

  return (
    <div className="pt-10 px-10 w-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>FullName</TableCell>
              <TableCell>Previous Value</TableCell>
              <TableCell>New Value</TableCell>
              <TableCell>Modified Date</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>
                  {user.previousValue ? user.previousValue : "N/A"}
                </TableCell>
                <TableCell>{user.newValue ? user.newValue : "N/A"}</TableCell>
                <TableCell>
                  {user.timestamp
                    ? moment(user.timestamp).format("MMM Do YY")
                    : "N/A"}
                </TableCell>
                <TableCell>{user.userName ? user.userName : "N/A"}</TableCell>
                <TableCell align="left">
                  <EditUser id={user.id} fullName={user.fullName} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
