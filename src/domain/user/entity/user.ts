export class User {
  public id: string;
  public todoLists: string[];
  constructor(
    public username: string,
    public password: string,
  ) {
    this.todoLists = [];
  }
}
