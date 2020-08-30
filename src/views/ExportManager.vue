<template>
  <div class="exportManager">
    <div class="btnContainer">
      Show:
      <button class="btn" @click="loadItems()">Items</button>
      <button class="btn" @click="loadRecipes()">Recipes</button>
    </div>
    <div class="textContainer">
      <textarea id="json" rows="30" cols="100" v-model="jsonBlob"></textarea>
    </div>
    <div class="btnContainer">
      Save:
      <button class="btn" @click="saveItems()">Items</button>
      <button class="btn" @click="saveRecipes()">Recipes</button>
      <br>Export:
      <button class="btn" @click="exportJson()">EXPORT</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExportManager",
  data() {
    return {
      jsonBlob: '',
      fileName: '',
    }
  },
  methods: {
    ...mapActions(['initializeItems', 'initializeRecipes', 'loadItemsJSON', 'loadRecipesJSON']),
    loadItems() {
      this.jsonBlob = JSON.stringify(this.allItems);
      this.fileName = 'items.json';
    },
    loadRecipes() {
      this.jsonBlob = JSON.stringify(this.allRecipes);
      this.fileName = 'recipes.json';
    },
    saveItems() {
      this.loadItemsJSON(this.jsonBlob);
    },
    saveRecipes() {
      this.loadRecipesJSON(this.jsonBlob);
    },
    exportJson() {
      if (this.fileName == '')
        return;
      const blob = new Blob([this.jsonBlob], {type: 'text/plain'});
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = this.fileName;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  },
  computed: {
    ...mapGetters(['allItems', 'allRecipes']),
  },
  created() {
    this.initializeItems();
    this.initializeRecipes();
  }
}
</script>

<style scoped>
  .btn {
    margin: 10px;
  }

  .exportManager {
    margin: 5px 25px 0px 25px;
  }
</style>
