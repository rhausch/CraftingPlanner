<template>
  <div id="RecipeManager">
    <template v-if="selectedRecipe">
      <h1>Edit Recipe <button @click="closeUpdate">Close</button></h1>
      <RecipeDetails v-bind:recipe="selectedRecipe" />
      <p><button @click="submitDelete" class="btn">Delete</button></p>
    </template>
    <template v-else>
      <h1>Create New Recipe</h1>
      <RecipeDetails v-bind:recipe="recipe"/>
      <p><button @click="submitCreate" class="btn">Create</button></p>
    </template>
    <br>
    <Recipes />
    <br>
    <form>
      <input @click="saveFile" type="button" value="Export" class="btn">
    </form>
  </div>
</template>

<script>
import Recipes from "@/components/recipes/Recipes";
import {mapActions, mapGetters} from "vuex";
import RecipeDetails from "@/components/recipes/RecipeDetails";

export default {
  name: "RecipeManager",
  components: {
    RecipeDetails,
    Recipes
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      recipe: {},
    }
  },
  computed: {
    ...mapGetters(['allRecipes', 'selectedRecipe']),
  },
  methods: {
    ...mapActions(['createRecipe', 'deleteRecipe']),
    emptyRecipe() {
      return {
        name: '',
            cost: 0,
            time: 1,
            requires: [],
            produces: [],
      }
    },
    submitCreate() {
      if (this.validate()) {
        this.createRecipe(this.recipe);
        this.recipe = this.emptyRecipe();
      }
    },
    submitDelete() {
      this.deleteRecipe(this.selectedRecipe.id);
    },
    closeUpdate() {
      this.$store.commit('selectRecipe', {id:''});
    },
    validate() {
      if (this.recipe.name === '') {
        console.log("Validation failed. Requires a name", this.recipe.name)
        return false;
      }
      if (isNaN(this.recipe.time)) {
        console.log("Validation failed. Tine not a number.", this.recipe.time)
        return false;
      }
      if (isNaN(this.recipe.cost)) {
        console.log("Validation failed. Cost not a number.", this.recipe.cost)
        return false;
      }
      if (this.recipe.requires.length === 0 && this.recipe.produces.length === 0) {
        console.log("Validation failed. Does not consume or produce anything.", this.recipe.requires.length, this.recipe.produces.length)
        return false;
      }
      return true;
    },
    saveFile() {
      const data = JSON.stringify(this.allRecipes);
      const blob = new Blob([data], {type: 'text/plain'});
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = "recipes.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  },
  created() {
    this.recipe = this.emptyRecipe();
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555555;
  color: #ffffff;
  padding: 7px 20px;
  cursor: pointer;
}

#RecipeManager {
  margin: 10px 25px 10px 25px
}

</style>
