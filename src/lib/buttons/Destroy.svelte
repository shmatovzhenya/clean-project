<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>
<button
  class="button"
  on:click={() => dispatch('click')}
>
</button>
<style>
  .button {
    outline: 0;
    width: 40px;
    height: 40px;
    border: 0;
    background: 0;
    font-size: 30px;
    color: #cc9a9a;
  }
  .button:after {
    content: '×';
  }
</style>
