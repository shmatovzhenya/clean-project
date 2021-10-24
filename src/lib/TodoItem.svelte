<script lang="ts">
  import { actions } from '../interceptors/Todo';
  import type { TodoId, TodoStatus, TodoText } from '../entities/types';
  import Destroy from './buttons/Destroy.svelte';
  import CheckBox from './forms/CheckBox.svelte';

  export let title: TodoText = '';
  export let id: TodoId = '';
  export let status: TodoStatus = 'New';
  let selected = status === 'Done' ? [id] : [];

  const onDestroy = () => {
    actions.destroyTodo({ id });
    console.log('destroy');
  };

  const onCheck = () => {
    actions.updateStatus({ id, status: selected.includes(id) ? 'Done' : 'New' });
  };
</script>
<article class="root">
  <CheckBox
    bind:value={id}
    bind:group={selected}
    on:check={onCheck}
  />
  <p class="text">{ title }</p>
  <Destroy
    on:click={onDestroy}
  />
</article>
<style>
  .root {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #ededed;
    font-size: 24px;
  }
  .text {
    flex-grow: 1;
    margin: 0;
    padding: 15px;
    line-height: 28px;
    text-align: left;
    color: #4d4d4d;
  }
</style>
