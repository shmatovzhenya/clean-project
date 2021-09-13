<script lang="ts">
  import type { Todo } from '../entities/types';

  let items: Todo[] = [];
</script>
<ul>
  {#each items as item}
    <li>{item.text}</li>
  {/each}
</ul>
