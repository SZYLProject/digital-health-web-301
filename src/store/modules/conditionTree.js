import { generateOptions } from '@/utils/conditionTreeFn'
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
  upadteFlattenData ({ commit }, data) {
    const treeData = generateOptions(data, 'childList', 'root')
    console.log(data)
    const newData = {
      condition: {
        childList: treeData,
        id: 'root',
        key: 'root',
        name: 'root',
        opt: data[0].opt,
        value: []
      },
      groupId: 0,
      id: 0,
      projectId: 0,
      totalCount: 0,
      type: 0
    }
    console.log(newData)
    return new Promise((resolve, reject) => {
      treeSearch(newData).then(res => {
        console.log(res)
        // const obj = res.obj
        // if (obj) {
        //   commit('KEYWORDLISTSDATASFN', obj)
        //   resolve(obj)
        // }
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
