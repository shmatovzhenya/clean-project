import type { TodoList } from '../entities/TodoList';
import type { TodoId, Todo, TodoStatus } from '../entities/types';
import type { Logger, Mutation, UseCase } from './types';
import type { RemoveTodoById } from './RemoveTodoById';


type UpdateStatusOption = {
  id: TodoId;
  status: TodoStatus;
};

class UpdateTodoStatus implements UseCase<UpdateStatusOption, void> {
  constructor(
    private _mutation: Mutation<Todo, void>,
    private _logger: Logger,
    private _todoList: TodoList,
  ) {}

  execute({ id, status }: UpdateStatusOption): Promise<void> {
    const item = this._todoList.getTodoById(id);

    item.status = status;

    return new Promise((resolve, reject) => {
      this._mutation
        .send(item)
        .then(() => {
          this._todoList.updateStatusById(id, status);
          resolve();
        })
        .catch(error => {
          this._logger.error(error);
          reject();
        });
    });
  }
}

export type {
  UpdateStatusOption,
};

export {
  UpdateTodoStatus,
};
