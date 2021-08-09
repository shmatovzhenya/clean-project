import type { TodoList } from '../entities/TodoList';
import type { TodoId, Todo, TodoText } from '../entities/types';
import type { Logger, Mutation, UseCase } from './types';
import type { RemoveTodoById } from './RemoveTodoById';


type EditTextOption = {
  id: TodoId;
  text: TodoText;
};

class EditTodoTextById implements UseCase<EditTextOption, void> {
  constructor(
    private _mutation: Mutation<Todo, void>,
    private _removeCommand: RemoveTodoById,
    private _logger: Logger,
    private _todoList: TodoList,
  ) {}

  execute({ id, text }: EditTextOption): Promise<void> {
    if (text.length === 0) {
      return this._removeCommand.execute(id);
    }

    const item = this._todoList.getTodoById(id);

    item.text = text;

    return new Promise((resolve, reject) => {
      this._mutation
        .send(item)
        .then(() => {
          this._todoList.editTextById(id, text);
        })
        .catch(error => {
          this._logger.error(error);
        });
    });
  }
}

export type {
  EditTextOption,
};

export {
  EditTodoTextById,
};
