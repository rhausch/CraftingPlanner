<template>
  <div class="RecipeDetails">
    <label for="recipename">Name: </label><input type="text" v-model="recipe.name" id="recipename" placeholder="Recipe Name..."><br>
    <div class="container">
      <div class="subcontainer">
        <div><label for="time">Time: </label><input type="text" id="time" v-model="recipe.time" size="4"></div>
        <div><label for="cost">Cost: </label><input type="text" id="cost" v-model="recipe.cost" size="4"></div>
      </div>
      <div class="subcontainer">
        <ul class="items" v-bind:key="component.id" v-for="component in recipe.requires">
          <li><button class="del" @click="removeRequirement(component.item.id)">X</button> {{component.quantity}} x {{component.item.name}}</li>
        </ul>
        <label>
          <select v-model="selectedRequirement">
            <option disabled value="">Requirement</option>
            <option v-for="item in allItems" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option>
          </select>
        </label>
        <span v-if="selectedRequirement">
          <label for="quantityR">Quantity: </label><input type="text" id="quantityR" v-model="requirementQuantity" size="4">
          <label for="consumeR">Consume?</label><input type="checkbox" id="consumeR" v-model="consumeRequirement">
        </span>
        <br>
        <button @click="addRequirement()" class="btn">Add Requirement</button>
      </div>
      <div class="subcontainer">
        <ul class="items" v-bind:key="component.id" v-for="component in recipe.produces">
          <li><button class="del" @click="removeProduct(component.item.id)">X</button> {{component.quantity}} x {{component.item.name}}</li>
        </ul>
        <label>
          <select v-model="selectedProduct">
            <option disabled value="">Product</option>
            <option v-for="item in allItems" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option>
          </select>
        </label>
        <span v-if="selectedProduct">
          <label for="quantityP">Quantity: </label><input type="text" id="quantityP" v-model="productQuantity" size="4">
        </span>
        <br>
        <button @click="addProduct()" class="btn">Add Product</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RecipeDetails",
  props: ['recipe'],
  data() {
    return {
      selectedRequirement: '',
      requirementQuantity: 1,
      selectedProduct: '',
      productQuantity: 1,
      consumeRequirement: true,
    }
  },
  methods: {
    ...mapActions(['initializeItems', 'createRecipe', 'deleteRecipe']),
    addRequirement() {
      console.log(this.selectedRequirement, this.requirementQuantity);
      if (this.selectedRequirement === '' ||
          isNaN(this.requirementQuantity)) {
        console.log("Invalid Input", this.selectedRequirement, this.requirementQuantity);
        this.selectedRequirement = '';
        this.requirementQuantity = 1;
        return;
      }
      let component = {
        item: this.getItemById(this.selectedRequirement),
        quantity: parseInt(this.requirementQuantity),
      }
      const index = this.recipe.requires.findIndex(i => i.item.id === this.selectedRequirement);
      console.log("Requirement index:", index);
      if (index !== -1) {
        component.quantity += this.recipe.requires[index].quantity;
        if (component.quantity === 0) {
          // Delete empty components.
          this.recipe.requires = [...this.recipe.requires.slice(0,index), ...this.recipe.requires.slice(index+1)];
        } else {
          this.recipe.requires = [...this.recipe.requires.slice(0,index), component, ...this.recipe.requires.slice(index+1)];
        }
      } else {
        this.recipe.requires.push(component);
      }
      if (this.consumeRequirement) {
        let consumed = {
          item: component.item,
          quantity: 0-parseInt(this.requirementQuantity),
        }
        this.insertProduct(consumed);
      }
      this.selectedRequirement = '';
      this.requirementQuantity = 1;
      this.consumeRequirement = true;
    },
    removeRequirement(id) {
      this.recipe.requires = this.recipe.requires.filter(c => c.item.id !== id);
    },
    addProduct() {
      console.log(this.selectedProduct, this.productQuantity);
      if (this.selectedProduct === '' ||
          isNaN(this.productQuantity)) {
        console.log("Invalid Input", this.selectedProduct, this.productQuantity);
        this.selectedProduct = '';
        this.productQuantity = 1;
        return;
      }
      let component = {
        item: this.getItemById(this.selectedProduct),
        quantity: parseInt(this.productQuantity),
      }
      this.insertProduct(component);
      this.selectedProduct = '';
      this.productQuantity = 1;
    },
    insertProduct(component) {
      const index = this.recipe.produces.findIndex(i => i.item.id === component.item.id);
      console.log("Product Index:", index);
      if (index !== -1) {
        component.quantity += this.recipe.produces[index].quantity;
        if (component.quantity === 0) {
          // Delete empty components.
          this.recipe.produces = [...this.recipe.produces.slice(0,index), ...this.recipe.produces.slice(index+1)];
        } else {
          this.recipe.produces = [...this.recipe.produces.slice(0,index), component, ...this.recipe.produces.slice(index+1)];
        }
      } else {
        this.recipe.produces.push(component);
      }
    },
    removeProduct(id) {
      this.recipe.produces = this.recipe.produces.filter(c => c.item.id !== id);
    },
  },
  computed: {
    ...mapGetters(['allItems', 'getItemById']),
  },
  created() {
    this.initializeItems();
  }
}
</script>

<style scoped>
  .container {
    display: flex;
  }

  .subcontainer {
    flex: 1;
  }

  ul {
    list-style: none;
  }

  .del {
    background: #ff0000;
    color: #ffffff;
    border: none;
    padding: 1px 1px;
    cursor: pointer;
  }
</style>
