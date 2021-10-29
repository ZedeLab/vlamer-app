import { object, string, ref as yupRef } from "yup";

export const fieldNames = {
  name: "User's name",
  email: "Email address",
  password: "Password",

  confirmPassword: "Confirmation password",
};

export const initialValues = {
  [fieldNames.name]: "",
  [fieldNames.email]: "",

  [fieldNames.password]: "",
  [fieldNames.confirmPassword]: "",
};

export const validationSchema = object({
  [fieldNames.name]: string().required(),
  [fieldNames.email]: string().required().email(),

  [fieldNames.password]: string().required().min(6),
  [fieldNames.confirmPassword]: string().oneOf(
    [yupRef(`${[fieldNames.password]}`), null],
    "Passwords must match"
  ),
});
