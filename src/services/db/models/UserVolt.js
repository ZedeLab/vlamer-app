import { boolean, number, object, string, array } from 'yup';
import { v4 as uuid } from 'uuid';

export class UserVolt {
  constructor(newUserVolt) {
    this.data = newUserVolt;
  }

  __validate = async () => {
    try {
      const newData = await object({
        id: string().uuid().default(uuid()),
        account: object({
          id: string().uuid(),
          inVoltCoins: number().required(),
          status: string().required().oneOf(['active', 'suspended', 'onHold']),
        }),
        inAction: object({
          id: string().uuid(),
          coinsOnAction: number().required(),
          isPlaying: boolean().required(),
          vlams: array(),
        }),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return newData;
    } catch (error) {
      console.log(error);
      return err;
    }
  };
  getData() {
    return this.data;
  }

  static GetDefaultVoltValue() {
    return {
      id: uuid(),
      account: {
        id: uuid(),
        inVoltCoins: 1000,
        status: 'active',
      },
      inAction: {
        id: uuid(),
        coinsOnAction: 0,
        isPlaying: false,
        vlams: [null],
      },
      transactions: [null],
    };
  }
}
