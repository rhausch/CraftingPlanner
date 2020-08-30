<template>
  <div>
    <form @submit="submitItem">
      <label>
        <input type="text" v-model="name" name="name" placeholder="Create item...">
      </label>
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "CreateItem",
  data() {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['createItem']),
    submitItem(e) {
      e.preventDefault();
      this.createItem(this.name);
      this.name = '';
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>
