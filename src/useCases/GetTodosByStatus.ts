import type { TodoList } from '../entities/TodoList';
import type { Todo, TodoStatus, } from '../entities/types';
import type { UseCase } from './types';


class GetTodosByStatus implements UseCase<TodoStatus, Todo[]> {
  constructor(private _todoList: TodoList) {}

  execute(status?: TodoStatus): Promise<Todo[]> {
    return Promise.resolve(this._todoList.getByStatus(status));
  }
}

export {
  GetTodosByStatus,
};
