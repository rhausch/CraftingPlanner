<template>
  <div id="ItemManager">
    <div>
      <Items />
      <br>
      <form>
        <input @click="saveFile" type="button" value="Export" class="btn">
      </form>
    </div>
    <ItemDetails />
  </div>
</template>

<script>
import Items from '@/components/Items';
import ItemDetails from "@/components/ItemDetails";
import { mapGetters } from 'vuex';

export default {
  name: 'ItemManager',
  components: {
    Items,
    ItemDetails,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
    }
  },
  methods: {
    ...mapGetters(['allItems']),
    saveFile() {
      const data = JSON.stringify(this.allItems());
      const blob = new Blob([data], {type: 'text/plain'});
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = "items.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  }
}
</script>

<style>
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

#ItemManager {
  margin: 10px 25px 10px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
</style>
