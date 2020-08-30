<template>
  <tr class="recipe">
    <td>
    {{ recipe.name }}
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
    padding: 5px 0px 5px 0px;
    text-align: center;
  }

</style>
