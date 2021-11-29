import { number, object, string, boolean, date } from 'yup';
import { v4 as uuid } from 'uuid';
import { Timestamp } from '@firebase/firestore';

export const ConnectionTypes = {
  type: {
    REQUESTING: 'requesting',
    REQUESTED: 'requested',
    SUGGESTED: 'suggested',
  },

  status: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    DECLINED: 'declined',
  },
};
export class UserConnections {
  constructor(newUserConnections) {
    this.data = newUserConnections;
  }

  __validate = async () => {
    try {
      const newData = await object({
        id: string().required(),
        type: string().required().oneOf(Object.values(ConnectionTypes.type)),
        status: string().required().oneOf(Object.values(ConnectionTypes.status)),
        createdAt: {
          seconds: number().required(),
          nanoseconds: number().required(),
        },
        __parentAccountSnapshot: object().required(),
        __eventOwnerAccountSnapshot: object().required(),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return newData;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  getData() {
    return this.data;
  }

  static __takeAccountSnapshot(account) {
    try {
      return object({
        id: string().required(),
        username: string().required(),
        firstName: string().required(),
        lastName: string().required(),
        avatarURL: string().url(),
      })
        .required()
        .camelCase(false)
        .validate(account, { stripUnknown: true, abortEarly: false });
    } catch (err) {
      console.log('Snapshot error: ', err);
    }
  }

  static async getDefaultData(type, currentUserAccount, eventOwnerAccount) {
    const parentAccountSnapshot = await UserConnections.__takeAccountSnapshot({
      account: currentUserAccount.id,
      ...currentUserAccount,
    });
    const eventOwnerAccountSnapshot = await UserConnections.__takeAccountSnapshot({
      account: eventOwnerAccount.id,
      ...eventOwnerAccount,
    });

    return {
      id: uuid(),
      type: type,
      status: ConnectionTypes.status.PENDING,
      createdAt: new Date(),
      __parentAccountSnapshot: parentAccountSnapshot,
      __eventOwnerAccountSnapshot: eventOwnerAccountSnapshot,
    };
  }
}
