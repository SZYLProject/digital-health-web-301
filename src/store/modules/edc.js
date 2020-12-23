// 关键词搜索模块常量
const state = {
  dictionaryDatas: [] // 一二级字典标题数据
}

const mutations = {
  DATA_DICTI_TWO: (state, data) => {
    state.dictionaryDatas = data
  }
}

const actions = {
  dataDictionaries ({ commit }, data) {
    commit('DATA_DICTI_TWO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
