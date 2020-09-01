<template>
  <div class="inventory">
    <p>Money: {{money}}</p>
    <p>Time: {{time}}</p>
    <div v-bind:key="component.item.id" v-for="component in inventory">
      {{component.quantity}} x {{component.item.name}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Inventory",
  computed: {
    ...mapGetters(['inventory','money','time']),
  }
}
</script>

<style scoped>

</style>
