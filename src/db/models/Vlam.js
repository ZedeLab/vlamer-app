import { number, object, string, array } from 'yup';
import { v4 as uuid } from 'uuid';

export class Vlam {
  constructor(newData) {
    this.data = newData;
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().uuid().required(),
        author: string().required(),
        participatingPrice: number().required(),
        winingPrice: number().required(),
        numberOfParticipants: number().required(),
        message: string().required(),
        totalNumberOfLikes: number().required(),
        totalNumberOfComments: number().required(),
        totalNumberOfParticipants: number().required(),
        type: string().oneOf(['express', 'fund', 'sales']).required(),
        state: string().required().oneOf(['onPlay', 'onSelection', 'ended']).required(),
        createdAt: {
          seconds: number().required(),
          nanoseconds: number().required(),
        },
        likeUsersIds: array().of(string()),
        __ownerAccountSnapShot: object().required(),
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

  static GetDefaultVlamValue(ownerAccount) {
    const { createdAt, email, emailVerified, lastLoginAt, phoneNumber, ...restOwnerAccount } =
      ownerAccount;
    return {
      id: uuid(),
      totalLikes: 0,
      message: 'Come join me. 💜',
      state: 'onPlay',
      type: 'express',
      totalNumberOfLikes: 0,
      totalNumberOfComments: 0,
      totalNumberOfParticipants: 0,
      createdAt: new Date(),
      likeUsersIds: [],
      __ownerAccountSnapShot: restOwnerAccount,
    };
  }
}
