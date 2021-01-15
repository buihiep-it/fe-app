// State object
const state = {
    listNameDialog: [],
    snacks: []
}

// Getter functions
const getters = {
    nameDialogs() {
        return JSON.parse(JSON.stringify(state.listNameDialog))
    },
    getSnacks() {
        return JSON.parse(JSON.stringify(state.snacks))
    }
}

// Mutations
const mutations = {
    setNameDialog(state, listNameDialog) {
        state.listNameDialog = listNameDialog
    },
    setSnack(state, snack) {
        state.snacks.push(snack)
    }
}

// Actions
const actions = {
    changeNameDialog({ commit }, listNameDialog) {
        commit('setNameDialog', listNameDialog)
    },
    addSnack({ commit }, snack) {
        commit('setSnack', snack)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
