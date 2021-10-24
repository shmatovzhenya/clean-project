import type { TodoList } from '../entities/TodoList';
import type { TodoId } from '../entities/types';
import type { Logger, Mutation, UseCase } from './types';


class RemoveTodoById implements UseCase<TodoId, void> {
  constructor(
    private _mutation: Mutation<TodoId, void>,
    private _logger: Logger,
    private _todoList: TodoList,
  ) {}

  execute(id: TodoId): Promise<void> {
    return new Promise((resolve, reject) => {
      this._mutation
        .send(id)
        .then(() => {
          this._todoList
            .removeById(id);
          resolve();
        })
        .catch(error => {
          this._logger.error(error);
        });
    });
  }
}

export {
  RemoveTodoById,
};
