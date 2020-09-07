import axios from 'axios';

const state = {
    container: [
        {
            "item":{
                "id":"5df8fabb-7b52-48ec-ba89-880545188996",
                "name":"Wood"
            },
            "quantity":1
        },
        {
            "item":{
                "id":"6c4c558f-030b-4dee-a7c1-420ebffa19d4",
                "name":"Nails"
            },
            "quantity":3
        }

    ],
    actionHistory: [],
    initialized: false,
    money: 0,
    currentTime: 0,
};

const getters = {
    inventory: (state) => state.container,
    money: (state) => state.money,
    time: (state) => state.currentTime,
    actionHistory: (state) => state.actionHistory,
    canExecuteRecipe: (state) => (recipe) => {
        console.log("Validating recipe:", recipe.name)
        if (state.money < recipe.cost){
            console.log("Insufficient Money");
            return false;
        }
        const missing = recipe.requires.find(component => {
            const index = state.container.findIndex(c => c.item.id === component.item.id);
            if (index === -1) {
                console.log("Don't have required component ", component.item.name);
                return true;
            }
            if (state.container[index].quantity < component.quantity) {
                console.log("Insufficient ", component.item.name," have:",state.container[index].quantity," need:",component.quantity);
                return true;
            }
            console.log("Requirement",component.item.name," met have:",state.container[index].quantity," need:",component.quantity);
          });
        if (missing !== undefined)
            return false;
        console.log("Validated", recipe.name);
        return true;
        },
};

const actions = {
    async initializeInventory({ commit }) {
        if (state.initialized)
            return;
        const response = await axios.get("data/inventory.json");
        console.log(response.data);
        commit("setInventory", response.data);
        state.initialized = true;
    },
    async loadInventoryJSON({commit}, jsonBlob) {
        const data = JSON.parse(jsonBlob)
        commit('setInventory', data);
    },
    addItemToInventory({commit}, item) {
        commit('addToInventory', item)
    },
    executeRecipe({commit, getters}, recipe) {
        if (!getters.canExecuteRecipe(recipe))
            return;
        recipe.produces.forEach( component => {
            commit('updateInventoryItemQuantity', component);
        });
        commit('cost', recipe.cost);
        commit('time', recipe.time);
        commit('addActionToHistory', recipe.name);
    },
    emptyInventory({ commit }) {
        commit('clearInventory');
    }
};

const mutations = {
    clearInventory(state) {
        state.inventory = [];
        state.money = 0;
    },
    setInventory(state, data) {
        state.inventory = data.inventory;
        state.money = data.money;
    },
    addToInventory(state, item) {
        const index = state.container.findIndex(c => c.item.id === item.id);
        if (index === -1) {
            state.container.push({item: item, quantity: 1})
        } else {
            state.container[index].quantity += 1;
        }
    },
    removeFromInventory(state, item) {
        const index = state.container.findIndex(c => c.item.id === item.id);
        if (index !== -1) {
            state.container[index].quantity -= 1;
        }
    },
    updateInventoryItemQuantity(state, payload) {
        const index = state.container.findIndex(c => c.item.id === payload.item.id);
        if (index === -1) {
            console.log("Adding",payload.quantity,"of",payload.item);
            state.container.push({item: payload.item, quantity: payload.quantity})
        } else {
            console.log("Increasing",state.container[index].item,"by",payload.quantity);
            state.container[index].quantity += payload.quantity;
        }
    },
    cost(state, money) {
        state.money -= money;
    },
    time(state, time) {
        state.currentTime += time;
    },
    addActionToHistory(state, action) {
        state.actionHistory.unshift({action: action, time: state.currentTime});
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
