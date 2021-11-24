import { object, array, string } from 'yup';
import { v4 as uuid } from 'uuid';
export class StaticData {
  constructor(newStaticData) {
    this.data = newStaticData;
    this.__validate();
  }

  __validate = async () => {
    try {
      const newData = await object({
        images: object({
          avatar: array().of(
            object({
              id: string().uuid().default(uuid()),
              name: string().required(),
              url: string().required(),
              type: string().required(),
            })
          ),
          cover: array().of(
            object({
              id: string().uuid().default(uuid()),
              name: string().required(),
              url: string().required(),
            })
          ),
        }),
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
