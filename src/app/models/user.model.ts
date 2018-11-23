export class User {
  constructor(
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public password?: string
  ) {
  }
}


