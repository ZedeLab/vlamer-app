import { date, object, string } from 'yup';
import { v4 as uuid } from 'uuid';
export class UserConnections {
  constructor(newUserConnections) {
    this.data = newUserConnections;
    this.__validate();
  }

  __validate = async () => {
    try {
      const newData = await object({
        id: string().uuid().default(uuid()),
        ownerAccountId: string().uuid().default(uuid()),
        connections: arrayOf(
          object({
            id: string().uuid().default(uuid()),
            accountId: string().uuid().default(uuid()),
            username: string().required(),
            avatar: string().required(),
            status: string()
              .required()
              .oneOf(['pending', 'accepted', 'declined'])
              .default('pending'),
            createdAt: date().required().default(new Date()),
          })
        ),
      })
        .camelCase(false)
        .validate(this.data, { stripUnknown: true, strict: true, abortEarly: false });

      return newData;
    } catch (err) {
      return err;
    }
  };
  getData() {
    return this.data;
  }
}
