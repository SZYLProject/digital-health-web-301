import request from '@/utils/request'
// import Qs from 'qs'
import Storage from '@/utils/storage'
const { sessionGet } = Storage

// 首页-我收藏的患者统计
export function chartMyPersonInfo () {
  const dataSourceId = sessionGet('pID')?.id ?? ''
  return request({
    url: `/crp-collection/personCollection/v1/getMyPersonInfo/${dataSourceId}`,
    method: 'GET'
  })
}
// 分页查询用户收藏的患者
export function getAllCollect (data) {
  const dataSourceId = sessionGet('pID')?.id ?? ''
  data.dataSourceId = dataSourceId
  return request({
    url: '/crp-collection/personCollection/v1/listAllPage',
    method: 'GET',
    params: data
  })
}
// 根据ID集合批量删除用户收藏的患者
export function deleteCollect (data) {
  return request({
    url: '/crp-collection/personCollection/v1/deleteByIds',
    method: 'DELETE',
    data
  })
}
// 根据ID集合批量删除用户收藏的患者
export function addCollect (data) {
  const dataSourceId = sessionGet('pID')?.id ?? ''
  data.dataSourceId = dataSourceId
  return request({
    url: '/crp-collection/personCollection/v1/add',
    method: 'POST',
    data
  })
}
