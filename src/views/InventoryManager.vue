<template>
  <div id="InventoryManager">
    <div>
      Items:
      <div class="items" v-bind:key="item.id" v-for="item in allItems">
          <button class="btn"  @click="addItemToInventory(item)">Add {{item.name}}</button>
      </div>
    </div>
    <div class="grid">
      <div>
        <h1>Recipes</h1>
        <div class="recipes" v-bind:key="recipe.id" v-for="recipe in allRecipes">
          <button class="btn" v-bind:class="{'disabled': !canExecuteRecipe(recipe)}" @click="executeRecipe(recipe)">{{recipe.name}}</button>
        </div>
      </div>
      <div>
        <h1>Inventory</h1>
        <Inventory />
      </div>
      <div>
        <h1>Action History</h1>
        <ul>
          <li v-for="ah in actionHistory" v-bind:key="ah.time">
            {{ah.time}}}: {{ ah.action }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Inventory from "@/components/inventory/Inventory";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "InventoryManager",
  components: {
    Inventory,
  },
  methods: {
    ...mapActions(['addItemToInventory','executeRecipe','initializeItems','initializeRecipes']),
  },
  computed: {
    ...mapGetters(['allItems','allRecipes','canExecuteRecipe','actionHistory']),
  },
  created() {
    this.initializeItems();
    this.initializeRecipes();
  }
}
</script>

<style scoped>
  .items {
    display: inline;
    margin: 5px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
  }

  .recipes {
    margin: 5px;
  }

  .disabled {
    background: #CCCCCC;
    color: #333333;
  }
</style>
