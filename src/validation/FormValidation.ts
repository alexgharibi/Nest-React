import { FormikErrors } from "formik";

export interface FormValues {
  fullName: string;
}

export const FormValidation = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.fullName) {
    errors.fullName = "Full name is missing";
  }

  return errors;
};
