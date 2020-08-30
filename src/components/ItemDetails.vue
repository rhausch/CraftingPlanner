<template>
  <div class="item-details">
    <template v-if="selectedItem()">
      <h1>Edit Item <button @click="selectItem({id:''})">Close</button></h1>
      <br>
      id: {{ selectedItem().id }}<br>
      <label for="item-name">Name: </label><input type="text" name="name" v-model="selectedItem().name" id="item-name"><br>
      <br>
      <button @click="deleteItem(selectedItem().id)" class="btn">Delete</button>
    </template>
    <template v-else>
      <form @submit="submitItem">
        <label for="create">Name: </label><input id="create" type="text" v-model="name" name="name" placeholder="Create item..."><br>
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
      name: '',
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
      this.createItem(this.name);
      this.name = '';
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
