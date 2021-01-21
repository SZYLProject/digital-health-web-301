import { listConvertTree } from '@/utils/conditionTreeFn'
import { treeSearch, seniorSearch } from '@/api/projectsMangement'
const FLATTEN_DATA = 'syncFlattenData' // 条件树数据
const GROUNP_DATA = 'syncGroupData' // 条件树请求需要字段
const TREE_LOADING = 'syncTreeLoading' // 条件树请求需要字段
const state = {
  syncSeniorLoading: false,
  treeLoading: false,
  groupData: null,
  flattenData: [
    {
      id: 'root',
      name: 'root',
      parentId: '',
      edit: false,
      value: '',
      opt: 'AND'
    }
  ]
}

const mutations = {
  [TREE_LOADING]: (state, treeLoading) => {
    state.treeLoading = treeLoading
  },
  [FLATTEN_DATA]: (state, flattenData) => {
    state.flattenData = flattenData
  },
  [GROUNP_DATA]: (state, groupData) => {
    state.groupData = groupData
  }
}

const actions = {
  // 提交条件树搜索
  updateFlattenData ({ commit, state }, data) {
    commit('syncTreeLoading', true)
    console.log(data)
    const treeData = listConvertTree(data, '', 'childList')
    const newData = {
      condition: treeData[0],
      groupId: state.groupData.groupId,
      id: state.groupData.id,
      projectId: state.groupData.projectId,
      totalCount: 0,
      type: state.groupData.type
    }
    console.log(treeData)
    return new Promise((resolve, reject) => {
      treeSearch(newData).then(res => {
        const obj = res.obj
        console.log(res)
        const updateNum = data
        updateNum.forEach(item => {
          item.num = obj.countList[item.id]
        })
        commit('syncFlattenData', updateNum)
        commit('syncTreeLoading', false)
        resolve(obj)
      }).catch(error => {
        commit('syncTreeLoading', false)
        reject(error)
      })
    })
  },
  // 提交事件搜索
  fetchSeniorSearch ({ commit, state }, data) {
    commit('syncSeniorLoading', true)
    const newData = {
      conditionList: data,
      groupId: state.groupData.groupId,
      id: state.groupData.id,
      projectId: state.groupData.projectId,
      totalCount: 0,
      type: state.groupData.type
    }
    return new Promise((resolve, reject) => {
      seniorSearch(newData).then(res => {
        const obj = res.obj
        console.log(res)
        commit('syncSeniorLoading', false)
        resolve(obj)
      }).catch(error => {
        commit('syncSeniorLoading', false)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
