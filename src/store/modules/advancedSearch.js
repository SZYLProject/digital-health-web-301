/**
 * 高级搜索数据
 */

import { } from '@/api/caseSearch'
const ADVANCESEARCHMUTA = 'advancesearchmuta' //
const ADVANCESEARCHLISTMUP = 'advancesearchlistmup'
const state = {
  advanceSearchDatas: [ // 高级搜索跳转数据存储回显
    {
      advanceSearchVariableDTOList: [],
      indexName: '',
      opt: 'OR',
      parentVariable: {
        id: '',
        name: '',
        key: '',
        type: '',
        value: '',
        data1: '',
        data2: '',
        dataOptionType: 0,
        dataItemCode: '',
        dataOption: []
      },
      serialNumber: 0
    }
  ],
  advanceSearchListDatas: null // 高级搜索后台返回的数据

}

const mutations = {
  //
  [ADVANCESEARCHMUTA]: (state, data) => {
    state.advanceSearchDatas = data
  },
  [ADVANCESEARCHLISTMUP]: (state, data) => {
    state.advanceSearchListDatas = data
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
