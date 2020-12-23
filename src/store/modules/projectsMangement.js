// 项目管理 store
const STOREITEMDATA = 'storeitemdata' //
const STOREDRAGDATA = 'storedragdata' // 存储拖拽数据
const PROJECTTYPE = 'projecttype'
const state = {
  itemData: null, // 新建修改项目数据
  dragData: [], // 拖拽结果保存数据数据
  projectType: '' // 项目前瞻性和回顾性
}

const mutations = {
  [STOREITEMDATA]: (state, data) => {
    state.itemData = data
  },
  [STOREDRAGDATA]: (state, data) => {
    if (data) {
      state.dragData[data.index] = data.data
    } else {
      state.dragData = []
    }
  },
  [PROJECTTYPE]: (state, data) => {
    state.projectType = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
