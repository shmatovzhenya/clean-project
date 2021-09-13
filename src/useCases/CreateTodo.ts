import type { TodoList } from '../entities/TodoList';
import type { Todo, TodoText } from '../entities/types';
import type { Logger, Mutation, UseCase } from './types';


class CreateTodo implements UseCase<TodoText, void> {
  constructor(private _mutation: Mutation<Todo, void>, private _logger: Logger, private _todoList: TodoList) {}

  execute(text: TodoText): Promise<void> {
    return new Promise((resolve, reject) => {
      const todo: Todo = this._todoList.createNewTodo(text);

      this._mutation
        .send(todo)
        .catch((error) => {
          this._todoList.removeById(todo.id);
          this._logger.error(error);
        });
    });
  }
}

export {
  CreateTodo,
};
