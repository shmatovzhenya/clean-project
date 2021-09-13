import type { Todo, TodoId, TodoStatus, TodoText } from './types';


type TodoItem = {
  text: TodoText;
  status: TodoStatus;
};

class TodoList {
  private _collection: Record<TodoId, TodoItem> = {};
  private _order: TodoId[] = [];

  createNewTodo(text: TodoText): Todo {
    const id: TodoId = (this._order.length + 1).toString();
    const todo: Todo = {
      id, text,
      status: 'New',
    };

    this.addExistedTodo(todo);

    return todo;
  }

  addExistedTodo(todo: Todo) {
    this._collection[todo.id] = {
      text: todo.text,
      status: todo.status,
    };

    this._order.push(todo.id);
  }

  getTodoById(id: TodoId): Todo {
    const { text, status } = this._collection[id];

    return JSON.parse(JSON.stringify({ id, text, status }));
  }

  getByStatus(filterableStatus?: TodoStatus): Todo[] {
    return this._order.reduce((result, id) => {
      const item = this._collection[id];

      if (!item) {
        return result;
      }

      const { text, status } = item;
      const todo = { id, text, status };

      if (!filterableStatus) {
        result.push(todo);
      } else if (filterableStatus && status === filterableStatus) {
        result.push(todo);
      }

      return result;
    }, []);
  }

  removeById(id: TodoId): void {
    delete this._collection[id];
    this._order = this._order.filter(todoId => todoId !== id);
  }

  editTextById(id: TodoId, text: TodoText): void {
    const item = this._collection[id];

    if (!item) {
      return;
    }

    this._collection[id].text = text;
  }

  updateStatusById(id: TodoId, status: TodoStatus): void {
    const item = this._collection[id];

    if (!item) {
      return;
    }

    this._collection[id].status = status;
  }
}

export {
  TodoList,
}
