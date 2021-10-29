import { object, string, ref as yupRef } from "yup";

export const fieldNames = {
  name: "User's name",
  email: "Email address",
  password: "Password",
  gender: "Gender",
  confirmPassword: "Confirmation password",
};

export const initialValues = {
  [fieldNames.name]: "",
  [fieldNames.email]: "",
  [fieldNames.gender]: "",
  [fieldNames.password]: "",
  [fieldNames.confirmPassword]: "",
};

export const validationSchema = object({
  [fieldNames.name]: string().required(),
  [fieldNames.email]: string().required().email(),
  [fieldNames.gender]: string().required().oneOf(["male", "female", "other"]),
  [fieldNames.password]: string().required().min(6),
  [fieldNames.confirmPassword]: string().oneOf(
    [yupRef(`${[fieldNames.password]}`), null],
    "Passwords must match"
  ),
});
