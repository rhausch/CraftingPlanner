<template>
  <div class="items">
    <Item v-for="item in allItems" v-bind:key="item.id" v-bind:item="item" @click="selectItem(item.id)"/>
  </div>
</template>

<script>
import Item from "@/components/items/Item";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Items",
  methods: {
    ...mapActions(['initializeItems', 'deleteItem']),
    selectItem(id) {
      this.$store.commit('selectItem', {id:id});
    }
  },
  computed: {
    ...mapGetters(["allItems", 'selectedItem']),
  },
  components: {
    Item
  },
  created() {
    this.initializeItems();
  }
}
</script>

<style scoped>

</style>
