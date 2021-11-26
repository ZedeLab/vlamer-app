import { number, object, string } from 'yup';
import { v4 as uuid } from 'uuid';
import { Timestamp } from '@firebase/firestore';

export class UserConnections {
  constructor(newUserConnections) {
    this.data = newUserConnections;
  }

  __validate = async () => {
    try {
      const newData = await object({
        id: string().uuid().default(uuid()),
        targetAccount: string().uuid().required(),
        status: string().required().oneOf(['pending', 'accepted', 'declined']),
        createdAt: object({
          seconds: number().required(),
          nanoseconds: number().required(),
        }),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return newData;
    } catch (err) {
      return err;
    }
  };
  getData() {
    return this.data;
  }

  static getDefaultData() {
    return {
      id: uuid(),
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    };
  }
}
