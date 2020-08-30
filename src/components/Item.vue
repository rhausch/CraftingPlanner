<template>
  <div class="item">
    {{ item.name }}
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["item"]
}
</script>

<style scoped>
  .item {
    background: #f4f4f4;
    padding: 10px 20px;
    border-bottom: 2px #cccccc dotted;
  }
</style>
