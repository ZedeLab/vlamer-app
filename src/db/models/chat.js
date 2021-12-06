import { boolean, date, object, string, ref as array } from 'yup';
import { v4 as uuid } from 'uuid';

export class Chat {
  constructor(chatData) {
    this.data = chatData;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().uuid().default(uuid()),
        members: array(),
        lastMessage: string(),
        lastMessageDate: date().default(new Date()),
        hasUnreadMessage: boolean(),
        lastMessageSender: string().uuid().default(uuid()),
        lastMessageId: string().uuid().default(uuid()),
        createdAt: date().default(new Date()),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });
      return this.data;
    } catch (err) {
      return err.message;
    }
  };

  getData() {
    return this.data;
  }
}
