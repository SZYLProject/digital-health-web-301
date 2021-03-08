import { listConvertTree } from '@/utils/conditionTreeFn'
import Storage from '@/utils/storage'

import { treeSearch, seniorSearch, treeSearchAll } from '@/api/projectsMangement'
const FLATTEN_DATA = 'syncFlattenData' // 条件树数据
const GROUNP_DATA = 'syncGroupData' // 条件树请求需要字段
const TREE_LOADING = 'syncTreeLoading'
const SENIOR_LOADING = 'syncSeniorLoading'
const CLOSE_DIALOG = 'syncCloseDialog'
const state = {
  seniorLoading: false,
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
  ],
  // 关闭条件树弹出层
  closeTreeDialog: false
}

const mutations = {
  [CLOSE_DIALOG]: (state, closeTreeDialog) => {
    state.closeTreeDialog = closeTreeDialog
  },
  [SENIOR_LOADING]: (state, seniorLoading) => {
    state.seniorLoading = seniorLoading
  },
  [TREE_LOADING]: (state, seniorLoading) => {
    state.seniorLoading = seniorLoading
  },
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
    if (data.type === 'cancel') {
      commit('syncFlattenData', data.data)
    } else {
      commit('syncTreeLoading', true)
      const treeData = listConvertTree(data.data, '', 'childList')
      const { sessionGet } = Storage
      const newData = {
        condition: treeData[0],
        dataSourceId: sessionGet('pID')?.id ?? '',
        groupId: state.groupData.groupId,
        id: state.groupData.id,
        projectId: state.groupData.projectId,
        totalCount: 0,
        type: state.groupData.type
      }
      const fetchName = data.type === 'all' ? treeSearchAll : treeSearch
      return new Promise((resolve, reject) => {
        fetchName(newData).then(res => {
          const obj = res.obj
          // console.log(res)
          const updateNum = data.data
          if (data.type !== 'all') {
            updateNum.forEach(item => {
              item.num = obj.countList[item.id]
            })
          }
          commit('syncFlattenData', updateNum)
          commit('syncTreeLoading', false)
          if (data.type === 'all') {
            commit('syncCloseDialog', true)
          }
          resolve(obj)
        }).catch(error => {
          commit('syncTreeLoading', false)
          reject(error)
        })
      })
    }
  },
  // 提交事件搜索
  fetchSeniorSearch ({ commit, state }, data) {
    commit('syncSeniorLoading', true)
    const { sessionGet } = Storage
    const newData = {
      conditionList: data,
      dataSourceId: sessionGet('pID')?.id ?? '',
      groupId: state.groupData.groupId,
      id: state.groupData.id,
      projectId: state.groupData.projectId,
      totalCount: 0,
      searchType: state.groupData.searchType,
      type: state.groupData.type
    }
    return new Promise((resolve, reject) => {
      seniorSearch(newData).then(res => {
        const obj = res.obj
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
