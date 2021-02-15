<template>
  <div class="item">
    <div class="name">{{ item.name }} - {{ item.value }} Monies</div>
    <div class="description">{{ item.description }}</div>
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

  .name {
    font-weight: bold;
  }

  .description {
    font-style: italic;
    font-size: small;
  }
</style>
