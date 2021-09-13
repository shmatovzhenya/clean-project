import type { Todo } from '../entities/types';
import type { Query } from '../useCases/types';

type Item = {
  id: number;
  title: string;
  completed: boolean;
};

class LoadInitialTodo implements Query<void, Todo[]> {
  find(): Promise<Todo[]> {
    return new Promise((resolve) => {
      const sourceData: Item[] = JSON.parse(localStorage.getItem('clean-todos')) as Item[];

      const result: Todo[] = sourceData.map((item): Todo => {
        return {
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? 'Done' : 'New',
        };
      });

      resolve(result);
    });
  }
}

export {
  LoadInitialTodo,
};
