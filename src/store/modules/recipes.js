import axios from 'axios';
import {v4 as uuid} from 'uuid';

const state = {
    recipes: [
        {
            id: "1",
            name: "Testing",
            requires: [
                {
                    item: {
                        id: "1",
                        name: "TestItem1",
                    },
                    quantity: 3
                },
                {
                    item: {
                        id: "2",
                        name: "TestItem2",
                    },
                    quantity: 3
                }
            ],
            produces: [
                {
                    item: {
                        id: "3",
                        name: "TestItem3"
                    },
                    quantity: 1
                }
            ],
            cost: 0,
            time: 1
        },
        {
            id: "2",
            name: "Recipe 2",
            requires: [

            ],
            produces: [
                {
                    item: {
                        id: "1",
                        name: "TestItem1"
                    },
                    quantity: 1
                }
            ],
            cost: 5,
            time: 1
        },
    ],
    selectedRecipe: "",
    initialized: false,
};

const getters = {
    allRecipes: (state) => state.recipes,
    selectedRecipe: (state) => state.recipes.find(recipe => recipe.id === state.selectedRecipe),
    getRecipeById: (state) => (id) => state.recipes.find(recipe => recipe.id === id),
};

const actions = {
    async initializeRecipes({ commit }) {
        if (state.initialized)
            return;
        try {
            const response = await axios.get(process.env.VUE_APP_BASE_URL + "data/recipes.json");
            console.log(response.data);
            commit("setRecipes", response.data);
            state.initialized = true;
        } catch (error) {
            console.log("Error Initializing Recipes:", error);
        }
    },
    async loadRecipesJSON({commit}, jsonBlob) {
        const data = JSON.parse(jsonBlob)
        commit('setRecipes', data);
    },
    async createRecipe({commit}, recipe) {
        commit('newRecipe', recipe)
    },
    updateRecipe({commit}, recipe) {
        commit('updateRecipe', recipe);
    },
    deleteRecipe({ commit }, id) {
        console.log("Delete item ", id);
        commit('deleteRecipe', id);
    }
};

const mutations = {
    deleteRecipe: (state, id)  => state.recipes = state.recipes.filter(item => item.id !== id),
    setRecipes: (state, items) => (state.recipes = items),
    selectRecipe(state, payload) {
        console.log("selectRecipe:" + payload.id);
        state.selectedRecipe = payload.id;
        console.log(state.selectedRecipe);
    },
    updateRecipe(state, recipe) {
        const index = state.recipes.findIndex(i => i.id === recipe.id);
        state.recipes = [...state.recipes.slice(0, index), recipe, ...state.recipes.slice(index+1)];
    },
    newRecipe(state, recipe) {
        const newRecipe = {
            ...recipe,
            id: uuid(),
        }
        state.recipes.unshift(newRecipe);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
