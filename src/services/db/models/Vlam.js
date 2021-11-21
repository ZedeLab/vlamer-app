import { boolean, date, object, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';
export class Vlam {
  constructor(newData) {
    this.data = newData;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      return await object({
        id: string().uuid().default(uuid()),
        author: string().required(),
        participatingPrice: string().required(),
        winingPrice: string().required(),
        numberOfParticipants: string().required().email(),
        message: boolean().default(false),
        vlamType: string().oneOf(['express', 'fund', 'sales']).default('express'),
        createdAt: date().required().default(new Date()),
      })
        .camelCase(false)
        .validate(data, { stripUnknown: true, strict: true, abortEarly: false });
    } catch (err) {
      return err;
    }
  };
  getData() {
    const { volt, userConnection, ...restData } = this.data;
    return restData;
  }
}
