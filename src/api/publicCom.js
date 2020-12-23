import request from '@/utils/request'
// import Qs from 'qs'

// 获取收藏列表数据
export function getListsAll () {
  return request({
    url: '/crp-collection/collectionCategory/v1/listAll',
    method: 'GET',
    params: {
      categoryName: '',
      categoryType: 1 //
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
