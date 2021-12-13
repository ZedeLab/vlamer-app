import { boolean, date, object, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';

export class Comment {
  constructor(newCommentData) {
    this.data = newCommentData;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().uuid().default(uuid()),
        comment: string().required(),
        createdAt: date().default(function () {
          return new Date();
        }),
        __authorAccountSnapshot: object().required(),
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

  static getDefaultMessageValue(user) {
    const { id, username, firstName, lastName, avatarUrl } = user;
    return {
      id: uuid(),
      createdAt: new Date(),
      __authorAccountSnapshot: {
        id,
        username,
        firstName,
        lastName,
        avatarUrl,
      },
    };
  }
}
