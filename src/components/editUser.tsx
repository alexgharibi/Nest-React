import { Button, Modal, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ActionButton } from "./actionButton";
import { SwrKey } from "../utility/SwrKey";
import { useSWRConfig } from "swr";
import { useFormik } from "formik";
import { EditValidation } from "../validation/editValidation";
import { useEditUser } from "../api/editUser";

interface EditUserProps {
  id: number;
  fullName: string;
}

export const EditUser: FC<EditUserProps> = ({ id, fullName }) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { trigger, isMutating } = useEditUser(id);

  const { mutate } = useSWRConfig();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    mutate(SwrKey.Users);
    setOpen(false);
    setSuccess(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName,
      userName: "",
    },
    validate: EditValidation,
    onSubmit: async (value) => {
      try {
        await trigger(value);
        formik.resetForm();
        setSuccess(true);
      } catch (error) {
        console.log(error); //TODO: Can be an alert
      }
    },
  });
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white border-2 border-black shadow-md p-4">
          <Typography variant="h6" component="h2">
            Edit a user
          </Typography>
          {!success ? (
            <>
              <TextField
                label="FullName"
                variant="outlined"
                name="fullName"
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                value={formik.values.fullName}
                onChange={formik.handleChange}
                helperText={formik.touched.fullName && formik.errors.fullName}
                className="w-full mt-5"
                required
              />
              <TextField
                label="UserName"
                variant="outlined"
                name="userName"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                value={formik.values.userName}
                onChange={formik.handleChange}
                helperText={formik.touched.userName && formik.errors.userName}
                className="w-full mt-5"
                required
              />
            </>
          ) : (
            <Typography component="h2" className="mt-8 mb-5">
              User Edited
            </Typography>
          )}
          <div className="flex flex-row items-center space-x-4">
            {!success && (
              <ActionButton
                text="Edit"
                onClick={formik.handleSubmit}
                extraClass="text-white bg-primary-300 hover:bg-primary-200 hover:text-black mt-6"
                withLoading
                isLoading={isMutating}
              />
            )}
            <ActionButton
              text="Close"
              onClick={handleClose}
              extraClass="text-white bg-red-500 hover:bg-red-200 hover:text-black mt-6"
            />
          </div>
          <div className="text-red-500 mt-5">
            NOTE: In a real production application, the backend collects the
            user ID or name from a JWT token in the header.{" "}
          </div>
        </div>
      </Modal>
    </>
  );
};
