class User {
  public id: string;
  constructor(
    public username: string,
    public password: string,
    public todoLists: string[],
  ) {}
}
