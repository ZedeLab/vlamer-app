import { boolean, date, object, array, string, ref as yupRef } from 'yup';
import { v4 as uuid } from 'uuid';
import { number } from 'yup/lib/locale';
export class UserVolt {
  constructor(newUserVolt) {
    this.data = newUserVolt;
    this.__validate();
  }

  __validate = async () => {
    try {
      const newData = await object({
        id: string().uuid().default(uuid()),
        ownerAccountId: string().uuid().default(uuid()),
        volt: object({
          account: object({
            id: string().uuid(),
            totalCoins: number(),
            status: string().required().oneOf(['active', 'suspended', 'onHold']),
          }),
          inAction: object({
            id: string().uuid(),
            totalCoinsOnAction: number().required(),
            status: string().required().oneOf(['playing', 'notPlaying', 'vlamOwnerActions']),
            vlams: arrayOf(null).required(),
          }),
          transactions: arrayOf(null).required().default([null]),
        }),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return newData;
    } catch (error) {
      return err;
    }
  };
  getData() {
    return this.data;
  }

  static GetDefaultVoltValue() {
    return {
      account: {
        id: uuid(),
        totalCoins: 100,
        status: 'pending',
      },
      inAction: {
        id: uuid(),
        totalCoinsOnAction: 0,
        status: 'notPlaying',
        vlams: [null],
      },
      transactions: [null],
    };
  }
}
