import { Button, Modal, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useFormik } from "formik";
import { ActionButton } from "./actionButton";
import { FormValidation } from "../validation/formValidation";
import { useCreateUser } from "../api/createUser";
import { useSWRConfig } from "swr";
import { SwrKey } from "../utility/SwrKey";

export const CreateUserHeader: FC = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { mutate } = useSWRConfig();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    mutate(SwrKey.Users);
    setOpen(false);
    setSuccess(false);
  };

  const { trigger, isMutating } = useCreateUser();

  const formik = useFormik({
    initialValues: {
      fullName: "",
    },
    validate: FormValidation,
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
      <Button className="mt-10" variant="contained" onClick={handleOpen}>
        Create User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] bg-white border-2 border-black shadow-md p-4">
          <Typography variant="h6" component="h2">
            Create a user
          </Typography>
          {!success ? (
            <TextField
              label="FullName"
              variant="outlined"
              name="fullName"
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              helperText={formik.touched.fullName && formik.errors.fullName}
              className="w-full mt-5"
              required
            />
          ) : (
            <Typography component="h2" className="mt-8 mb-5">
              User Created
            </Typography>
          )}
          <div className="flex flex-row items-center space-x-4">
            {!success && (
              <ActionButton
                text="Create"
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
        </div>
      </Modal>
    </>
  );
};
