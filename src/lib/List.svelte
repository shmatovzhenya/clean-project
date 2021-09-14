<script lang="ts">
  import type { Todo } from '../entities/types';
  import { todos, actions } from '../interceptors/Todo';
  import TodoItem from './TodoItem.svelte';
  import TextInput from './forms/TextInput.svelte';

  let items: Todo[] = [];
  let value = '';

  todos.subscribe(todos => {
    items = todos;
  });

  const onAddTodo = () => {
    actions
      .addTodo({ text: value })
      .then(() => {
        value = '';
      });
  };
</script>
<form on:submit|preventDefault={onAddTodo}
>
  <TextInput
    placeholder="What needs to be done?"
    bind:value={value}
  />
</form>
<ul class="items">
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
  .items {
    margin: 0;
    padding: 0;
  }
  .item {
    list-style: none;
  }
</style>
