export class TodoItem {
  public id: string;
  constructor(
    public todoList: string,
    public title: string,
    public description: string,
    public priority: number,
  ) {}
}
