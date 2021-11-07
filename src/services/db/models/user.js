import { boolean, date, object, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';
export class User {
  constructor(newUserData) {
    this.data = newUserData;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      return await object({
        id: string().uuid().default(uuid()),
        username: string().required(),
        firstName: string().required(),
        lastName: string().required(),
        email: string().required().email(),
        emailVerified: boolean().default(false),
        lastLoginAt: date().required(),
        phoneNumber: string().default(null),
        avatarURL: string().url().default(null),
        coverImageURL: string().url().default(null),
        createdAt: date().required().default(new Date()),
        gender: string().required().oneOf(['male', 'female', 'other']).default('other'),
      })
        .camelCase(false)
        .validate(data, { stripUnknown: true, strict: true, abortEarly: false });
    } catch (err) {
      return err;
    }
  };
  getData() {
    return this.data;
  }
}
