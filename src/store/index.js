import Vue from 'vue';
import Vuex from 'vuex';
import items from './modules/items';
import recipes from "@/store/modules/recipes";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        items,
        recipes
    }
});
