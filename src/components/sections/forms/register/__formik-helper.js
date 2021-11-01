import { object, string, ref as yupRef } from 'yup';

export const fieldNames = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email address',
  password: 'Password',
  confirmPassword: 'Confirmation password',
};

export const initialValues = {
  [fieldNames.firstName]: '',
  [fieldNames.lastName]: '',
  [fieldNames.email]: '',

  [fieldNames.password]: '',
  [fieldNames.confirmPassword]: '',
};

export const validationSchema = object({
  [fieldNames.firstName]: string().required(),
  [fieldNames.lastName]: string().required(),
  [fieldNames.email]: string().required().email(),

  [fieldNames.password]: string().required().min(6),
  [fieldNames.confirmPassword]: string().oneOf(
    [yupRef(`${[fieldNames.password]}`), null],
    'Passwords must match'
  ),
});
