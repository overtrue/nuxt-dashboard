export const state = () => ({
  isAuthenticated: false,
  user: {}
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    state.isAuthenticated = !!payload
  },
}

export const actions = {
  async fetchUser({ commit }) {
    const user = await this.$axios.$get(`me`)

    commit('setUser', user)
  }
}
