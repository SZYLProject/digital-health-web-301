const state = {
  flattenData: [
    {
      id: 'root',
      name: 'root',
      parent: '',
      edit: false
    }
  ]
}

const mutations = {
  FLATTEN_DATA: (state, flattenData) => {
    state.flattenData = flattenData
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
