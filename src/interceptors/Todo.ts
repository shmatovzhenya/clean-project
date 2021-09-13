import { writable } from 'svelte/store';

import type { TodoId, TodoStatus } from '../entities/types';
import { TodoList } from '../entities/TodoList';
import { LoadInitialTodo } from '../useCases/LoadInitialTodo';
import { LoadInitialTodo as LoadTodoGateway } from '../gateway/LoadInitialTodo';
import { LoggerToConsole } from '../gateway/LoggerToConsole';
import { UpdateTodoStatus } from '../useCases/UpdateTodoStatus';
import { UpdateStatus } from '../gateway/UpdateStatus';

const todos = writable([]);
const todoList = new TodoList();
const loadTodoGateway = new LoadTodoGateway();
const logger = new LoggerToConsole();

const updateStatusGateway = new UpdateStatus();
const loader = new LoadInitialTodo(loadTodoGateway, logger, todoList);
const updateStatus = new UpdateTodoStatus(updateStatusGateway, logger, todoList);

loader.execute()
  .then((data) => {
    todos.set(data);
    console.log(data);
  });

const actions = {
  updateStatus({ id, status }: { id: TodoId, status: TodoStatus }) {
    updateStatus
      .execute({ id, status })
      .then(() => {
        console.log(todoList.getByStatus());
        todos.set(todoList.getByStatus());
      });
  },
};

export {
  todos,
  actions,
};
