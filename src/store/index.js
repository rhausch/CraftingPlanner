import { createStore } from 'vuex';
import items from './modules/items';
import recipes from "@/store/modules/recipes";
import inventory from "@/store/modules/inventory";

export default createStore({
    modules: {
        items,
        recipes,
        inventory,
    }
});
