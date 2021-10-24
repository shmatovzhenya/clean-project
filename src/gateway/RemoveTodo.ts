import type { TodoId } from '../entities/types';
import type { Mutation } from '../useCases/types';

type Item = {
  id: number;
  title: string;
  completed: boolean;
};

class RemoveTodo implements Mutation<TodoId, void> {
  send(id: TodoId): Promise<void> {
    return new Promise((resolve) => {
      type Items = Item[] | null;
      const nextId = parseInt(id);
      const data: Items = JSON.parse(localStorage.getItem('clean-todos')) as Items || [];
      const nextData = data.filter(item => item.id !== nextId);

      localStorage.setItem('clean-todos', JSON.stringify(nextData));
      resolve();
    });
  }
}

export {
  RemoveTodo,
};
