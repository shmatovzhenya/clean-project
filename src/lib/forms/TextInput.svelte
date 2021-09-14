<script lang="ts">
  export let placeholder: string = '';
  export let value: string = '';
</script>
<div class="root">
  <slot name="left"></slot>
  <input
    type="text"
    class="input"
    placeholder={placeholder}
    bind:value={value}
  >
  <slot name="right"></slot>
</div>
<style>
  .root {
    width: 100%;
    box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
    background: rgba(0, 0, 0, 0.003);
  }
  .input {
    outline: 0;
    width: 100%;
    height: 65px;
    border: 0;
    font-size: 24px;
    font-weight: 300;
  }
</style>
