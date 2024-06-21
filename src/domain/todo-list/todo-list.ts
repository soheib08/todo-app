class TodoList {
  public id: string;
  constructor(
    public userId: string,
    public title: string,
    public todoItems: string[],
  ) {}
}
