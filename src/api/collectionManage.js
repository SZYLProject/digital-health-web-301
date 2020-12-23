import request from '@/utils/request'
// import Qs from 'qs'

// 获取表格数据
export function formDatas (data) {
  return request({
    url: '/crp-collection/collectionCategory/v1/listAllPage',
    method: 'get',
    params: data
  })
}

// 编辑列表数据
export function editLists (data) {
  return request({
    url: '/crp-collection/collectionCategory/v1/updateBean',
    method: 'post',
    data: data
  })
}

// 新建列表数据
export function newBuildLists (data) {
  return request({
    url: '/crp-collection/collectionCategory/v1/saveBean',
    method: 'put',
    data: data
  })
}

// 删除列表数据
export function deleteLists (data) {
  const { id } = data
  return request({
    url: `/crp-collection/collectionCategory/v1/deleteById/${id}`,
    method: 'delete',
    params: {}
  })
}
