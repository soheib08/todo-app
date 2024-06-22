class TodoItem {
  public id: string;
  constructor(
    public todoListId: string,
    public title: string,
    public description: string,
    public priority: number,
  ) {}
}
