import request from '@/utils/request'
// import Qs from 'qs'

// 病种选择
export function kindOfDesease () {
  return request({
    url: '/acl/api/dataItem/getDataSourceList',
    method: 'GET',
    params: {}
  })
}

// 获取数据字典一二级标题（数据字典）
export function datasDictionariesTitle (data) {
  const { dataSourceId } = data
  return request({
    url: `/acl/api/dataItem/getDataItemsTree/${dataSourceId}`,
    method: 'GET',
    params: {}
  })
}

// 三级字典定义列表数据
export function datasDictionariesForm (data) {
  return request({
    url: '/acl/api/dataItem/getDataItemsThree',
    method: 'GET',
    params: data
  })
}

// 获取所有病种，用于首页导航病种选择
export function allDesease () {
  return request({
    url: '/acl/api/dataItem/getDataSourceAll',
    method: 'GET'
  })
}

// 获取数据字典一级数据
export function datasDictionariesFirst () {
  return request({
    url: '/acl/api/dataItem/getDataItemsFirst',
    method: 'GET'
  })
}

// 专病库 ID
export function commitPatiId (data) {
  const { userId, id, sourceName } = data
  return request({
    url: `/acl/api/preference/savePreference/${userId}`,
    method: 'post',
    data: {
      dataSourceValue:
      JSON.stringify({ id: id, sourceName: sourceName })
    }
  })
}
