import type { TodoList } from '../entities/TodoList';
import type { Todo } from '../entities/types';
import type { Logger, Query, UseCase } from './types';


class LoadInitialTodo implements UseCase<void, Todo[]> {
  constructor(private _query: Query<void, Todo[]>, private _logger: Logger, private _todoList: TodoList) {}

  execute(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      this._query
        .find()
        .then((list: Todo[]) => {
          list.forEach(todo => {
            this._todoList.addExistedTodo(todo);
          });

          resolve(this._todoList.getByStatus());
        })
        .catch((error) => {
          this._logger.error(error);
        });
    });
  }
}

export {
  LoadInitialTodo,
};
