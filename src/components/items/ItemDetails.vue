<template>
  <div class="item-details">
    <template v-if="selectedItem()">
      <h1>Edit Item <button @click="selectItem({id:''})">Close</button></h1>
      <br>
      id: {{ selectedItem().id }}<br>
      <label for="item-name">Name: </label><input type="text" name="name" v-model="selectedItem().name" id="item-name"><br>
      <label for="item-value">Value: </label><input type="text" name="value" v-model="selectedItem().value" id="item-value"><br>
      <label for="item-description">Description: </label><input type="text" name="name" v-model="selectedItem().description" id="item-description"><br>
      <br>
      <button @click="deleteItem(selectedItem().id)" class="btn">Delete</button>
    </template>
    <template v-else>
      <form @submit="submitItem">
        <label for="newName">Name: </label><input id="newName" type="text" v-model="item.name" name="name" placeholder="Create item..."><br>
        <label for="newValue">Value: </label><input id="newValue" type="text" v-model="item.value" name="value" placeholder="5"><br>
        <label for="newDesciption">Description: </label><input id="newDesciption" type="text" v-model="item.description" name="name" placeholder="description..."><br>
        <input type="submit" value="Submit" class="btn">
      </form>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ItemDetails",
  data() {
    return {
      item: {
        name: '',
        description: '',
      }
    }
  },
  methods: {
    ...mapActions(['deleteItem', 'createItem']),
    selectItem(id) {
      this.$store.commit('selectItem', {id:id});
    },
    submitItem(e) {
      e.preventDefault();
      if (this.name === '')
        return;
      this.createItem(this.item);
      this.item.name = '';
      this.item.description = '';
    }
  },
  computed: {
    ...mapGetters(['selectedItem']),
  },
  created() {
    console.log("Testing ", this.selectedItem())
  }

}
</script>

<style scoped>
  input[type="text"] {
    padding: 5px;
  }

  input[type="submit"] {
    margin: 10px;
  }
</style>
