const state = {
  data: {}
}

// Getter functions
const getters = {
  getData () {
    return JSON.parse(JSON.stringify(state.data))
  }
}

// Mutations
const mutations = {
  setData (state, data) {
    state.data = data
  }
}

// Actions
const actions = {
  changeProfileData ({ commit }, data) {
    commit('setData', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
