import { number, boolean, object, string, ref as yupRef, array } from 'yup';
import { v4 as uuid } from 'uuid';
import { Timestamp } from '@firebase/firestore';
import { Vlam } from './Vlam';

export class VlamLike {
  constructor(newData) {
    this.data = newData;
  }

  __validate = async (data) => {
    try {
      this.data = await object({
        id: string().required(),
        createdAt: {
          seconds: number().required(),
          nanoseconds: number().required(),
        },
        userId: string().required(),
        unliked: boolean().required(),
        __parentSnapShot: object().required(),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return this.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  getData() {
    const { volt, userConnection, ...restData } = this.data;
    return rest;
  }

  static GetDefaultVlamLikeValue(userId, parentVlamData) {
    const {
      totalNumberOfLikes,
      totalNumberOfComments,
      totalNumberOfParticipants,
      ...restParentVlamData
    } = parentVlamData;

    return {
      id: userId,
      createdAt: Timestamp.fromDate(new Date()),
      userId: userId,
      unliked: false,
      __parentSnapShot: restParentVlamData,
    };
  }
}
