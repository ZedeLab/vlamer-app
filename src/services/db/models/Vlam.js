import { number, date, object, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';
export class Vlam {
  constructor(newData) {
    this.data = newData;
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().uuid().default(uuid()),
        author: string().required(),
        participatingPrice: number().required(),
        winingPrice: number().required(),
        numberOfParticipants: number().required(),
        message: string().required().min(5),
        type: string().oneOf(['express', 'fund', 'sales']).default('express'),
        state: string().oneOf(['onPlay', 'onSelection', 'ended']).default('onPlay'),
        createdAt: {
          seconds: number().required(),
          nanoseconds: number().required(),
        },
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return this.data;
    } catch (err) {
      return err;
    }
  };
  getData() {
    const { volt, userConnection, ...restData } = this.data;
    return rest;
  }

  static GetDefaultVlamValue() {
    return {
      id: uuid(),

      message: 'Come join me. 💜',
      type: 'express',
      state: 'onPlay',
      createdAt: new Date(),
    };
  }
}
