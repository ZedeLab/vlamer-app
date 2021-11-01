import { object, string } from 'yup';

export const fieldNames = {
  email: 'Email address',
  password: 'Password',
};

export const initialValues = {
  [fieldNames.email]: '',
  [fieldNames.password]: '',
};

export const validationSchema = object({
  [fieldNames.email]: string().required().email(),
  [fieldNames.password]: string().required().min(6),
});
