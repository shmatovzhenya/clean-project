type TodoText = string;
type TodoStatus = 'New' | 'Done';
type TodoId = string;

type Todo = {
  id: TodoId;
  text: TodoText;
  status: TodoStatus;
};

interface WorkingCollection {
  updateText(text: TodoText): void;
  updateStatus(status: TodoStatus): void;
  remove(): void;
}

interface Builder {
  createNew(text: TodoText): void;
  loadExisted(todo: Todo): void;
  getOne(): WorkingCollection;
  getMany(status?: TodoStatus): WorkingCollection;
}

export type {
  TodoId,
  TodoText,
  TodoStatus,
  Todo,
};
