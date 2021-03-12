import request from '@/utils/request'
// import Qs from 'qs'
import Storage from '@/utils/storage'
const { sessionGet } = Storage
// 获取收藏列表数据
export function getListsAll () {
  const dataSourceId = sessionGet('pID')?.id ?? ''
  return request({
    url: '/crp-collection/collectionCategory/v1/listAll',
    method: 'GET',
    params: {
      categoryName: '',
      categoryType: 1, //
      dataSourceId
    }
  })
}

// 收藏列表数据确认提交

export function collectCommit (data) {
  return request({
    url: '/crp-collection/personCollection/v1/add',
    method: 'POST',
    data
  })
}
