import type { LoadInitialTodo } from '../useCases/LoadInitialTodo';

interface Store {
  create();
  update();
  remove();
  onCreate();
  onUpdate();
  onRemove();
}

class TodoList {
  constructor(private _todoLoader: LoadInitialTodo, private _store: Store) {}

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._todoLoader
        .execute()
        .then(() => {});
    });
  }
}

export {
  TodoList,
};
