<script lang="ts">
  import type { Todo } from '../entities/types';
  import { todos } from '../interceptors/Todo';
  import TodoItem from './TodoItem.svelte';

  let items: Todo[] = [];

  todos.subscribe(todos => {
    items = todos;
  });
</script>
<ul>
  {#each items as item}
    <li class="item">
      <TodoItem
        title={item.text}
        id={item.id}
        status={item.status}
      />
    </li>
  {/each}
</ul>
<style>
  .item {
    list-style: none;
  }
</style>
