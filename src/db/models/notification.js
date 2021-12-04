import { array, object, string, number, boolean } from 'yup';
import { v4 as uuid } from 'uuid';

export const NotificationTypes = {
  post: {
    LIKE: 'vlamPostLike',
    COMMENT: 'commentOnVlamPost',
  },
};

export class Notification {
  constructor(newNotificationData) {
    this.data = newNotificationData;
  }

  __validate = async (data) => {
    try {
      await object({
        ownerId: string().required(),
        to: array().of(string()),
        sound: string().required().oneOf(['default', null]).default('default'),
        seen: boolean().required(),
        title: string().required(),
        body: string().required(),
        data: object({
          type: string().required().oneOf(Object.values(NotificationTypes.post)),
        }).required(),
        createdAt: {
          seconds: number().required(),
          nanoseconds: number().required(),
        },
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return this.data;
    } catch (err) {
      console.log('Error validating notification: ', err.errors);
      return err;
    }
  };
  getData() {
    const { volt, userConnection, ...restData } = this.data;
    return restData;
  }

  static GetDefaultVlamValue(requiredFelids) {
    const { ownerId, title, body, sound, data, to, ...restOwnerAccount } = requiredFelids;
    return {
      id: uuid(),
      ownerId: ownerId,
      to: [...to],
      sound: sound ? sound : 'default',
      title: title,
      body: body,
      createdAt: new Date(),
      seen: false,
      data: { ...data },
    };
  }
}
