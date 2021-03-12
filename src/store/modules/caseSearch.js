// 关键词搜索模块常量
import { searchConditionData, searchKeywordDatas } from '@/api/caseSearch'
import Storage from '@/utils/storage'

const KEYWORDSINPUT = 'keywordsinput' // 关键字输入操作存储
const KEYWORD = 'keyword' // 关键字
const SOURCE = 'source' // 搜索模式
const SYNONYMGROUP = 'synonymgroup' // 归一词
const RANGEARG = 'rangearg' // 查找范围
const VISITTYPEARG = 'visittypearg' // 就诊类型
const VISITAGEARG = 'visitagearg' // 就诊年龄
const GENDERARG = 'genderarg' // 性别
const MODELARG = 'modelarg' // 模式
const TIMEORDERARG = 'timeorderarg' // 排序方式
const PAGENOARG = 'pagenoarg' // 分页数
const PAGESIZEARG = 'pagesizearg' // 当页显示条数
const KEYWORDLISTS = 'keywordlists'
const { sessionGet } = Storage
const state = {
  // 关键词搜索模块数据
  keyWordsSearch: '', // 手动输入关键词
  keyWordConDatas: null, // 搜索条件数据
  keyWordListsDatas: null, // 关键字搜索列表数据

  // 搜索条件对象
  keyWordSearchCon: { //  关键字搜索时传给后端的字段
    dataSourceId: sessionGet('pID')?.id ?? '',
    pageNo: 1, // 分页数
    pageSize: 10, // 当页显示条数
    keyword: '', // 搜索关键字
    source: '0', // 是否是原始搜索 0 概念搜索或者叫精准搜索(未来可能是归一搜索)， 1原始搜索
    synonymGroup: [], // 归一词
    range: [], // 查找范围
    visitType: '', // 就诊类型，住院 ，门诊 ，急诊
    beInDepartment: [], // 入院科室
    leaveDepartment: [], // 出院科室
    leaveDate: [], // 出院时间
    visitAge: [], // 就诊年龄
    gender: [], // 性别 根据概念的 ID 去传值
    timeOrder: '', // 排序, 按时间排序 倒叙0，和 正序1
    model: 0, // 采用病人模式 还是病历模式搜索
    other: '' // 其他，暂时先不管
  },
  keyWordListsId: [] // 关键词搜索病例列表id
}

const mutations = {
  // 关键字输入值存储操作
  [KEYWORDSINPUT]: (state, data) => {
    state.keyWordsSearch = data
  },
  // 关键字搜索条件数据的存储
  KEYWORDSEARCHCONFN: (state, data) => {
    state.keyWordConDatas = data
  },
  // 关键字搜索列表数据
  KEYWORDLISTSDATASFN: (state, data) => {
    state.keyWordListsDatas = data
  },
  // 关键字赋值
  [KEYWORD]: (state, data) => {
    state.keyWordSearchCon.keyword = data
  },
  // 搜索模式赋值
  [SOURCE]: (state, data) => {
    state.keyWordSearchCon.source = data
  },
  // 归一词赋值
  [SYNONYMGROUP]: (state, data) => {
    state.keyWordSearchCon.synonymGroup = data
  },
  // 查找范围赋值
  [RANGEARG]: (state, data) => {
    state.keyWordSearchCon.range = data
  },
  // 就诊类型赋值
  [VISITTYPEARG]: (state, data) => {
    state.keyWordSearchCon.visitType = data
  },
  // 就诊年龄
  [VISITAGEARG]: (state, data) => {
    state.keyWordSearchCon.visitAge = data
  },
  // 性别
  [GENDERARG]: (state, data) => {
    state.keyWordSearchCon.gender = data
  },
  // 模式
  [MODELARG]: (state, data) => {
    state.keyWordSearchCon.model = data
  },
  // 排序方式
  [TIMEORDERARG]: (state, data) => {
    state.keyWordSearchCon.timeOrder = data
  },
  // 分页数
  [PAGENOARG]: (state, data) => {
    state.keyWordSearchCon.pageNo = data
  },
  // 当页显示条数
  [PAGESIZEARG]: (state, data) => {
    state.keyWordSearchCon.pageSize = data
  },
  // 病例列表ID
  [KEYWORDLISTS]: (state, data) => {
    state.keyWordListsId = data
  }
}

const actions = {
  // 关键词搜索搜索条件数据
  keyWordCondation ({ commit }, data) {
    commit('KEYWORDSEARCHCONFN', null)
    return new Promise((resolve, reject) => {
      searchConditionData(data).then(res => {
        const obj = res.obj
        if (obj) {
          commit('KEYWORDSEARCHCONFN', obj)
          resolve(obj)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 关键词搜索列表数据
  keyWordListsData ({ commit }) {
    const data = state.keyWordSearchCon
    commit('KEYWORDLISTSDATASFN', null)
    return new Promise((resolve, reject) => {
      searchKeywordDatas(data).then(res => {
        const obj = res.obj
        if (obj) {
          commit('KEYWORDLISTSDATASFN', obj)
          resolve(obj)
        }
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
