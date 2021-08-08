import type { Todo, TodoId, TodoStatus, TodoText } from '../entities/types';
import type { TodoList } from '../entities/TodoList';

interface LoadTodoQuery {
  find(): Promise<Todo[]>;
}

interface AddTodoMutation {
  send(todo: Todo): Promise<void>;
}

interface UpdateTodoMutation {
  send(todo: Todo): Promise<void>;
}

interface RemoveTodoMutation {
  send(id: TodoId): Promise<void>;
}

interface Logger {
  error(error): void;
}

class LoadInitialTodo {
  constructor(private _query: LoadTodoQuery, private _logger: Logger, private _todoList: TodoList) {}

  execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._query
        .find()
        .then((list: Todo[]) => {
          list.forEach(todo => {
            this._todoList.addExistedTodo(todo);
          });
        })
        .catch((error) => {
          this._logger.error(error);
        });
    });
  }
}

class CreateTodo {
  constructor(private _mutation: AddTodoMutation, private _logger: Logger, private _todoList: TodoList) {}

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

class GetTodosByStatus {
  constructor(private _todoList: TodoList) {}

  execute(status?: TodoStatus): Promise<Todo[]> {
    return Promise.resolve(this._todoList.getByStatus(status));
  }
}

class RemoveTodoById {
  constructor(private _mutation: RemoveTodoMutation, private _logger: Logger, private _todoList: TodoList) {}

  execute(id: TodoId): Promise<void> {
    return new Promise((resolve, reject) => {
      this._mutation
        .send(id)
        .then(() => {
          this._todoList
            .removeById(id);
        })
        .catch(error => {
          this._logger.error(error);
        });
    });
  }
}

class EditTodoTextById {
  constructor(
    private _mutation: UpdateTodoMutation,
    private _removeCommand: RemoveTodoById,
    private _logger: Logger,
    private _todoList: TodoList,
  ) {}

  execute(id: TodoId, text: TodoText): Promise<void> {
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



export {};
