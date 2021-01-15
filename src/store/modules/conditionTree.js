import { listConvertTree } from '@/utils/conditionTreeFn'
import { treeSearch } from '@/api/projectsMangement'
const FLATTEN_DATA = 'syncFlattenData' // 当页显示条数
const state = {
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
  [FLATTEN_DATA]: (state, flattenData) => {
    state.flattenData = flattenData
  }

}

const actions = {
  // 关键词搜索列表数据
  updateFlattenData ({ commit }, data) {
    const treeData = listConvertTree(data, '', 'childList')
    const newData = {
      condition: treeData[0],
      groupId: 0,
      id: 0,
      projectId: 0,
      totalCount: 0,
      type: 0
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
        resolve(obj)
      }).catch(error => {
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
