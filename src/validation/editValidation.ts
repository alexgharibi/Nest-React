import { FormikErrors } from "formik";

export interface FormValues {
  fullName: string;
  userName: string;
}

export const EditValidation = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.fullName) {
    errors.fullName = "Full name is missing";
  }

  if (!values.userName) {
    errors.userName = "User name is missing";
  }

  return errors;
};
