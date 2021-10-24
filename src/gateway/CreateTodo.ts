import type { Todo } from '../entities/types';
import type { Mutation } from '../useCases/types';

type Item = {
  id: number;
  title: string;
  completed: boolean;
};

class CreateTodo implements Mutation<Todo, void> {
  send(options: Todo): Promise<void> {
    return new Promise((resolve) => {
      type Items = Item[] | null;
      const data: Items = JSON.parse(localStorage.getItem('clean-todos')) as Items || [];

      data.unshift({
        id: parseInt(options.id),
        title: options.text,
        completed: options.status === 'Done',
      });

      localStorage.setItem('clean-todos', JSON.stringify(data));
      resolve();
    });
  }
}

export {
  CreateTodo,
};
