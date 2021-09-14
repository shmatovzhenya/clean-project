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
      const data: Item[] = JSON.parse(localStorage.getItem('clean-todos')) as Item[];

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
