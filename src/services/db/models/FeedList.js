import { array } from 'yup';
import { Vlam } from './Vlam';

export class User {
  constructor(newUserData, userVolt, userConnection) {
    this.data = newUserData;
    this.volt = userVolt;
    this.userConnection = userConnection;
    this.__validate();
  }

  __validate = async (data) => {
    try {
      return await array()
        .of(Vlam)
        .camelCase(false)
        .validate(data, { stripUnknown: true, strict: true, abortEarly: false });
    } catch (err) {
      return err;
    }
  };
  getData() {
    const { volt, userConnection, ...restData } = this.data;
    return restData;
  }
}
