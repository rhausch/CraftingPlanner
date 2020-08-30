import axios from 'axios';
import {v4 as uuid} from 'uuid';

const state = {
    items: [
    ],
    selectedItem: "",
    initialized: false,
};

const getters = {
    allItems: (state) => state.items,
    //getSelectedItem: (state) => () => state.selectedItem === "" ? null : state.items.find(item => item.id == state.selectedItem),
    selectedItem: (state) => () => state.selectedItem === "" ? null : state.items.find(item => item.id === state.selectedItem),
    getItemById: (state) => (id) => state.items.find(item => item.id === id)
};

const actions = {
    async initializeItems({ commit }) {
        if (state.initialized)
            return;
        const response = await axios.get("data/items.json");
        console.log(response.data);
        commit("setItems", response.data);
        state.initialized = true;
    },
    async loadItemsJSON({commit}, jsonBlob) {
        const data = JSON.parse(jsonBlob)
        commit('setItems', data);
    },
    async createItem({commit}, name) {
        commit('newItem', name)
    },
    updateItem({commit}, item) {
        commit('updateItem', item);
    },
    deleteItem({ commit }, id) {
        console.log("Delete item ", id);
        commit('deleteItem', id);
    }
};

const mutations = {
    deleteItem: (state, id)  => state.items = state.items.filter(item => item.id !== id),
    setItems: (state, items) => (state.items = items),
    selectItem(state, payload) {
        console.log("selectItem:" + payload.id);
        state.selectedItem = payload.id;
        console.log(state.selectedItem);
    },
    updateItem(state, item) {
      const index = state.items.findIndex(i => i.id === item.id);
      state = {...state.items.slice(0,index), item, ...state.items.slice(index+1)};
    },
    newItem(state, name) {
        const item = {
            id: uuid(),
            name: name,
        }
        state.items.unshift(item);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
