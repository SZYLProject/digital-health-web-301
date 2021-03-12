import request from '@/utils/request'
// import Qs from 'qs'
import Storage from '@/utils/storage'
const { sessionGet } = Storage
const dataSourceId = sessionGet('pID')?.id ?? ''
// 获取360视图左侧菜单
export function getViewMenu (data) {
  const { id } = data
  return request({
    url: `/crp-collection/panoramicView/v1/getMenu/${id}`,
    method: 'GET'
  })
}
// 360视图-获取各项数据
export function getViewInfo (data) {
  return request({
    url: '/crp-collection/panoramicView/v1/getPanoramicViewInfo',
    method: 'GET',
    params: data
  })
}
// 获取用户个人基础信息
export function getPersonBaseInfo (personId) {
  return request({
    url: `/crp-collection/panoramicView/v1/getPersonBaseInfo/${personId}/${dataSourceId}`,
    method: 'GET'
  })
}
// 首页获取患者概览信息
export function getPersonOverViewInfo (data) {
  const { personId } = data
  return request({
    url: `/crp-collection/panoramicView/v1/getPersonOverViewInfo/${personId}/${dataSourceId}`,
    method: 'GET'
  })
}
// 获取首页时间轴第一部分信息
export function getTimeAxisPartOneInfo (personId) {
  return request({
    url: `/crp-collection/panoramicView/v1/getTimeAxisPartOneInfo/${personId}/${dataSourceId}`,
    method: 'GET'
  })
}
// 获取首页时间轴第二部分信息
export function getTimeAxisPartTwoInfo (data) {
  const { personId } = data
  return request({
    url: `/crp-collection/panoramicView/v1/getTimeAxisPartTwoInfo/${personId}/${dataSourceId}`,
    method: 'GET'
  })
}
