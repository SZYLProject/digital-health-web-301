import request from '@/utils/request'
// import Qs from 'qs'
/**
 *
 * @description { 病例搜索 }
 */

// 病例搜索首页获取病例搜索结果的接口
export function patientSearch (data) {
  // const {} = data
  return request({
    url: '/crp-search/indexSearch/v1/findBaseCountForSearch',
    method: 'get',
    params: data
  })
}

/**
 *
 * @description { 搜索历史模块 }
 */
// 搜索历史列表数据接口
export function searchHistory (data) {
  return request({
    url: '/crp-collection/searchHistory/v1/listAll',
    method: 'get',
    params: data
  })
}

// 搜索历史修改选准提交接口
export function searchHisSure (data) {
  return request({
    url: '/crp-collection/searchHistory/v1/updateSearchCollectionById',
    method: 'post',
    data: data
  })
}

// 搜索历史添加选准提交接口
export function searchAddHisSure (data) {
  return request({
    url: '/crp-collection/searchCollection/v1/add',
    method: 'PUT',
    data: data
  })
}

// 搜索历史列表删除接口
export function searchHisdele (data) {
  const { id } = data
  return request({
    url: `/crp-collection/searchHistory/v1/deleteById/${id}`,
    method: 'delete',
    data: data
  })
}

// 搜索历史全部取消接口
export function searchHistAlldel (data) {
  return request({
    url: '/crp-collection/searchHistory/v1/deleteAllByUserId',
    method: 'delete',
    data: data
  })
}

/**
 *
 * @description { 搜索收藏模块 }
 */

// 搜索收藏列表数据接口
export function searchCollection (data) {
  return request({
    url: '/crp-collection/searchCollection/v1/listAllPage',
    method: 'get',
    params: data
  })
}

// 搜索收藏选择条件接口
export function searchColleCondition (data) {
  return request({
    url: '/crp-collection/collectionCategory/v1/listAll',
    method: 'get',
    params: data
  })
}

// 搜索收藏选准提交接口
export function searchColleSure (data) {
  return request({
    url: '/crp-collection/searchCollection/v1/updateBean',
    method: 'post',
    data: data
  })
}

// 搜索收藏全部取消接口
export function searchColleAlldel (data) {
  return request({
    url: '/crp-collection/searchCollection/v1/deleteAllByUserId',
    method: 'delete',
    data: data
  })
}

/**
 *
 * @description { 关键词搜索模块 }
 */

// 获取搜索数据
export function searchKeywordDatas (data) {
  return request({
    url: '/crp-search/simpleSearch/v1/keywordSearch',
    method: 'post',
    data: data,
    timeout: 500 * 1000
  })
}

// 获取搜索条件
export function searchConditionData (data) {
  return request({
    url: '/crp-search/simpleSearch/v1/getCondition',
    method: 'get',
    params: data
  })
}

/**
 *
 * @description { 高级搜索 }
 */

// 搜索主题弹窗搜索列表接口
export function advancedSearchPopDatas (data) {
  return request({
    url: '/acl/api/dataItem/getDataItemsAll',
    method: 'get',
    params: data
  })
}

// 搜索主题弹窗搜索历史接口
export function advancedSearchHistoryDatas (data) {
  const { userId } = data
  return request({
    url: `/acl/api/dataItem/getSearchHistory/${userId}`,
    method: 'get',
    params: data
  })
}

// 获取高级搜索数据
export function searchAdvanceDatas (data) {
  return request({
    url: '/acl/api/advanceSearch/v1/findByAdvanceSearch',
    method: 'POST',
    timeout: 20000 * 1000,
    data
  })
}

// 根据数据字典数据项编码查询所属option选项
export function getDataOption (code) {
  return request({
    url: `/acl/api/dataOption/list/${code}`,
    method: 'GET'
  })
}

// 保存数据字典搜索历史
export function storeDataDictHistory (data) {
  const { userId, entity } = data
  return request({
    url: `/acl/api/dataItem/saveSearchHistory/${userId}`,
    method: 'post',
    data: entity
  })
}

// 搜索主题弹窗清空历史搜索
export function clearHistoryDatas (data) {
  const { userId } = data
  return request({
    url: `/acl/api/dataItem/clearHistory/${userId}`,
    method: 'get',
    params: data
  })
}

// 高级搜索数据提交接口 /advanceSearch/{version}/findByAdvanceSearch
export function advancedSearchCommit (data) {
  return request({
    url: '/crp-search/advanceSearch/v1/findByAdvanceSearch',
    method: 'post',
    data
  })
}
