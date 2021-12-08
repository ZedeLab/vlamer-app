import { array, object, string, number, boolean } from 'yup';
import { v4 as uuid } from 'uuid';
import { Timestamp } from '@firebase/firestore';

export const NotificationTypes = {
  vlam: {
    LIKE: 'vlamPostLike',
    COMMENT: 'commentOnVlamPost',
  },
  connection: {
    follow: 'followRequest',
  },
};

export class Notification {
  constructor(newNotificationData) {
    this.data = newNotificationData;
  }

  __validate = async (data) => {
    try {
      await object({
        to: array().of(string()),
        sound: string().required().oneOf(['default', null]).default('default'),
        title: string().required(),
        body: string().required(),
        data: object({
          id: string().required(),
          type: string()
            .required()
            .oneOf([
              ...Object.values(NotificationTypes.vlam),
              ...Object.values(NotificationTypes.connection),
            ]),
          seen: boolean().required(),
          ownerId: string().required(),
          ownerId: string().required(),
          createdAt: {
            seconds: number().required(),
            nanoseconds: number().required(),
          },
        }).required(),
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
}
