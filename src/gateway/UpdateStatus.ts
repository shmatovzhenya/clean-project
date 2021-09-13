import type { Todo } from '../entities/types';
import type { Mutation } from '../useCases/types';

type Item = {
  id: number;
  title: string;
  completed: boolean;
};

class UpdateStatus implements Mutation<Todo, void> {
  send(options: Todo): Promise<void> {
    return new Promise((resolve) => {
      const data: Item[] = JSON.parse(localStorage.getItem('clean-todos')) as Item[];

      data.forEach((item: Item) => {
        if (item.id.toString() !== options.id) {
          return;
        }

        console.log(options.status);
        item.completed = options.status === 'Done';
      });

      localStorage.setItem('clean-todos', JSON.stringify(data));
      resolve();
    });
  }
}

export {
  UpdateStatus,
};
