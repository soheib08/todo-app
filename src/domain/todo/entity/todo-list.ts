export class TodoList {
  public id: string;
  public todoItems: string[];
  constructor(
    public userId: string,
    public title: string,
  ) {
    this.todoItems = [];
  }
}
