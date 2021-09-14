import { writable } from 'svelte/store';

import type { TodoId, TodoStatus, TodoText } from '../entities/types';
import { TodoList } from '../entities/TodoList';
import { LoadInitialTodo } from '../useCases/LoadInitialTodo';
import { LoadInitialTodo as LoadTodoGateway } from '../gateway/LoadInitialTodo';
import { LoggerToConsole } from '../gateway/LoggerToConsole';
import { UpdateTodoStatus } from '../useCases/UpdateTodoStatus';
import { UpdateStatus } from '../gateway/UpdateStatus';
import { CreateTodo } from '../useCases/CreateTodo';
import { CreateTodo as CreateTodoGateway } from '../gateway/CreateTodo';

const todos = writable([]);
const todoList = new TodoList();
const logger = new LoggerToConsole();

const loadTodoGateway = new LoadTodoGateway();
const loader = new LoadInitialTodo(loadTodoGateway, logger, todoList);

const updateStatusGateway = new UpdateStatus();
const updateStatus = new UpdateTodoStatus(updateStatusGateway, logger, todoList);

const createTodoGateway = new CreateTodoGateway();
const createTodo = new CreateTodo(createTodoGateway, logger, todoList);

loader.execute()
  .then((data) => {
    todos.set(data);
    console.log(data);
  });

const actions = {
  updateStatus({ id, status }: { id: TodoId, status: TodoStatus }): Promise<void> {
    return new Promise((resolve) => {
      updateStatus
        .execute({ id, status })
        .then(() => {
          todos.set(todoList.getByStatus());
          resolve();
        });
    });
  },
  addTodo({ text }: { text: TodoText }): Promise<void> {
    return new Promise((resolve) => {
      createTodo
        .execute(text)
        .then(() => {
          todos.set(todoList.getByStatus());
          resolve();
        });
    });
  },
};

export {
  todos,
  actions,
};
