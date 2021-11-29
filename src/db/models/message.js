import { boolean, date, object, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';

export class Message {
  constructor(newMessageData) {
    this.data = newMessageData;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().uuid().default(uuid()),
        message: string().required(),
        createdAt: date().default(function () {
          return new Date();
        }),
        //TODO: must be uuid, a bug saying invalid uuid is happening when passed the actual user.id,
        senderId: string(),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });
      return this.data;
    } catch (err) {
      return err;
    }
  };

  getData() {
    return this.data;
  }

  static getDefaultMessageValue() {
    return {
      id: uuid(),
      createdAt: new Date(),
    };
  }
}
