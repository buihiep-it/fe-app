import Vue from 'vue'

// State object
const state = {
    data: {},
    loading: true
}

// Getter functions
const getters = {
    getData () {
        return JSON.parse(JSON.stringify(state.data))
    },
    getLoading () {
        return JSON.parse(JSON.stringify(state.loading))
    }
}

// Mutations
const mutations = {
    setData (state, data) {
        Vue.set(state, 'data', { ...state.data, ...data })
    },
    setLoading (state, data) {
        state.loading = data
    }
}

// Actions
const actions = {
    changeCovidCaseData ({ commit }, data) {
        commit('setData', data)
    },
    changeCovidCaseLoading ({ commit }, data) {
        commit('setLoading', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
