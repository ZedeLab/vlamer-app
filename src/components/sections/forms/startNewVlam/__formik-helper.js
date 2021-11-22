import { object, string, array, number, ref as yupRef, reach } from 'yup';

export const fieldNames = {
  winningPrice: 'Winning price in coins',
  participatingPrice: 'Participating price in coins',
  profitMargin: 'Profit margin is 🔐 on 100%',
  category: 'Vlam catagories',
  tags: 'Vlam tags',
  description: 'Vlam message',
};

export const initialValues = {
  [fieldNames.winningPrice]: 10,
  [fieldNames.participatingPrice]: 0,
  [fieldNames.profitMargin]: 100,

  [fieldNames.category]: '',
  [fieldNames.tags]: [],
  [fieldNames.description]: '',
};

export const validationSchema = (voltCapacity) =>
  object({
    [fieldNames.winningPrice]: number()
      .required()
      .max(voltCapacity, `You only have ${voltCapacity} coins in your account`),
    [fieldNames.participatingPrice]: number()
      .required()
      .max(voltCapacity, `You only have ${voltCapacity} coins in your account`),
    [fieldNames.profitMargin]: number().required().min(100),

    [fieldNames.category]: string().min(6),
    // [fieldNames.tags]: array().of(string().oneOf(['chill', 'relax', 'lotto', 'fund'])),
    [fieldNames.description]: string().required().min(5),
  });
