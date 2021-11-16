export const state = () => ({
  current: JSON.parse(localStorage.getItem('codesign_env'))
})

export const mutations = {
  setCurrent(state, env) {
    state.current = env
    localStorage.setItem('codesign_env', JSON.stringify(env))
    this.$axios.defaults.baseURL = env.baseUri
    this.$axios.defaults.appBaseUri = env.appBaseUri
  }
}

export const actions = {
  setCurrent({ commit }, env) {
    commit('setCurrent', env)
  }
}
