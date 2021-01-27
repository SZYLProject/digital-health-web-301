const state = {
  viewId: 0
}

const mutations = {
  SAVE_VIEWID: (state, viewId) => {
    state.viewId = viewId
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
