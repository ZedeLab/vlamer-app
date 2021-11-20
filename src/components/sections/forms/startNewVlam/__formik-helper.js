import { object, string, array, number, ref as yupRef } from 'yup';

export const fieldNames = {
  winningPrice: 'Winning price in coins',
  participatingPrice: 'Participating price in coins',
  profitMargin: 'Profit margin',
  category: 'Vlam catagories',
  tags: 'Vlam tags',
  description: 'Vlam message',
  description_placeholder: 'Lets support the awesome team behind Nextjs. 70% fund! LETS GO💀 ',
};

export const initialValues = {
  [fieldNames.winningPrice]: 10,
  [fieldNames.participatingPrice]: 2,
  [fieldNames.profitMargin]: 100,

  [fieldNames.category]: '',
  [fieldNames.tags]: [],
  [fieldNames.description]: '',
};

export const validationSchema = object({
  [fieldNames.winningPrice]: number().required().min(10),
  [fieldNames.participatingPrice]: number().required().min(10),
  [fieldNames.profitMargin]: number().required().min(100),

  [fieldNames.category]: string().min(6),
  // [fieldNames.tags]: array().of(string().oneOf(['chill', 'relax', 'lotto', 'fund'])),
  [fieldNames.description]: string().required().min(6),
});
