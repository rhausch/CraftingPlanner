<template>
  <tr class="recipe">
    <td>
      <div class="name">{{ recipe.name }}</div>
      <div class="description">{{ recipe.description }}</div>
    </td>
    <td>
      <ul class="items" v-bind:key="component.id" v-for="component in recipe.requires">
        <li>{{component.quantity}} x {{component.item.name}}</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Time: {{recipe.time}}</li>
        <li>Money: {{recipe.cost}}</li>
      </ul>
    </td>
    <td>
      <ul class="items" v-bind:key="component.id" v-for="component in recipe.produces">
        <li>{{component.quantity}} x {{component.item.name}}</li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Recipe",
  props: ['recipe']
}
</script>

<style scoped>
  ul {
    list-style: none;
  }

  td {
    padding: 5px 0 5px 0;
    text-align: center;
    width: 25%;
  }

  .name {
    font-weight: bold;
  }

  .description {
    font-style: italic;
    font-size: small;
  }
</style>
