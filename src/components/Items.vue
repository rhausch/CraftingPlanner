<template>
  <div class="items">
    <template class="item-list" v-for="item in allItems">
      <Item v-bind:key="item.id" v-bind:item="item" @click.native="selectItem(item.id)"/>
    </template>
  </div>
</template>

<script>
import Item from "@/components/Item";
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
