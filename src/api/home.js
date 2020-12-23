import request from '@/utils/request'

// 平台数据概览
export function getBaseCount () {
  return request({
    url: '/crp-search/indexSearch/v1/findBaseCount',
    method: 'GET'
  })
}
// 每月手术人数
export function getProduceCount () {
  return request({
    url: '/crp-search/indexSearch/v1/findProduceCount',
    method: 'GET'
  })
}
// 每月其他人数
export function getVisitCount (type) {
  return request({
    url: '/crp-search/indexSearch/v1/findVisitCount',
    method: 'GET',
    params: {
      type
    }
  })
}
