<!--suppress CssUnusedSymbol -->
<template>
  <header class="header">
    <h1>Crafting Planner</h1>
    <div id="nav">
      <router-link to="/">Items</router-link> |
      <router-link to="/recipes">Recipes</router-link> |
      <router-link to="/export">Export</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .header {
    background: #030303;
    color: #f4f4f4;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #f4f4f4;
    padding-right: 5px;
  }

  #nav {
    padding: 5px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
