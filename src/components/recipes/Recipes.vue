<template>
  <div>
    <table class="recipes">
      <thead>
        <th>Name</th>
        <th>Requires</th>
        <th>Cost</th>
        <th>Produces</th>
      </thead>
      <tbody>
        <template v-for="recipe in allRecipes">
          <tr is="Recipe" v-bind:key="recipe.id" v-bind:recipe="recipe" @click.native="selectRecipe(recipe.id)"/>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import Recipe from "@/components/recipes/Recipe";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Recipes",
  methods: {
    ...mapActions(['initializeRecipes']),
    selectRecipe(id) {
      this.$store.commit('selectRecipe', {id:id});
    }
  },
  computed: {
    ...mapGetters(['allRecipes']),
  },
  components: {
    Recipe
  },
  created() {
    this.initializeRecipes();
  }
}
</script>

<style scoped>

  table {
    width: 100%;
  }

  th {
    height: 50px;
    font-size: large;
    border: 3px #030303 solid;
    background: #2c3e50;
    color: #f4f4f4;
  }

  tr {
    border-bottom: 2px #030303 dotted;
    background: #eeeeee;
  }

  tr:hover {
    background: #999999;
  }

</style>
