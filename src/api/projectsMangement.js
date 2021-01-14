// 项目管理接口
import request from '@/utils/request'
// import Qs from 'qs'

// 获取表格数据
export function projectLists (data) {
  return request({
    url: '/crp-project/project/v1/listProject',
    method: 'get',
    params: data
  })
}

// 创建项目
export function createProjects (data) {
  return request({
    url: '/crp-project/project/v1/newProject',
    method: 'put',
    data: data
  })
}

// 文件上传接口
export function fileUploading (data) {
  return request({
    url: '/crp-project/file/v1/uploadMultipleFiles',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data,
    timeout: 600 * 1000
  })
}

// 删除上传的文件
export function deleteUploadFiles (data) {
  const { fileName, id } = data
  return request({
    url: `/crp-project/file/v1/deleteFile?fileName=${fileName}&id=${id}`,
    method: 'post',
    data: data
  })
}

// 回显上传的文件
export function comeUploadFiles (data) {
  const { projectId } = data
  return request({
    url: `/crp-project/file/v1/listFiles/${projectId}`,
    method: 'get',
    params: {}
  })
}

// 修改列表接口
export function correctProject (data) {
  return request({
    url: '/crp-project/project/v1/updateProject',
    method: 'post',
    data: data
  })
}

// 一级字典接口
export function oneDictionaryDatas (data) {
  // const { userId, dataItemName, isCommon, except } = data
  return request({
    url: '/acl/api/dataItem/getDataItemsAll',
    method: 'get',
    params: data,
    timeout: 10 * 1000
  })
}

// 获取队列的接口
export function getQueueDatas (data) { // //{version}//{}
  const { projectId } = data
  return request({
    url: `/crp-project/projectGroup/v1/list/${projectId}`,
    method: 'get'
    // params: data
    // timeout: 10 * 1000
  })
}
// 新增队列
export function addNewQueue (data) {
  return request({
    url: '/crp-project/projectGroup/v1/addGroup',
    method: 'put',
    data: data
  })
}

// 删除队列
export function deleteQueue (data) {
  const { id } = data
  return request({
    url: `/crp-project/projectGroup/v1/deleteGroup/${id}`,
    method: 'delete',
    data: data
  })
}

// 修改队列
export function correctQueue (data) {
  return request({
    url: '/crp-project/projectGroup/v1/updateGroup',
    method: 'post',
    data: data
  })
}

/**
 * 拖拽模块接口
*/

// 获取数据字典一二级标题（数据字典）
export function datasDictionariesTitle (data) {
  const { dataSourceId } = data
  return request({
    url: `/acl/api/dataItem/getDataItemsTree/${dataSourceId}`,
    method: 'GET',
    params: {}
  })
}

// 获取三级字典
export function getThreeDictionaries (data) {
  const { id } = data
  return request({
    url: `/acl/api/dataItem/getAllItem?id=${id}`,
    method: 'GET',
    params: {},
    timeout: 10 * 1000
  })
}

// 回显数据列表 /projectFields/{version}/list/74
export function allListsStateDatas (data) {
  const { projectId } = data
  return request({
    url: `/crp-project/projectFields/v1/list/${projectId}`,
    method: 'GET',
    params: {}
  })
}
// 拖拽存储
export function dragStoreDatas (data) {
  return request({
    url: '/crp-project/projectFields/v1/addField',
    method: 'post',
    data: data
  })
}

// 拖拽删除
export function delStoreDatas (data) {
  return request({
    url: '/crp-project/projectFields/v1/delField',
    method: 'post',
    data: data
  })
}

// // 获取内弹窗数据
export function getInsidePopDatas (data) {
  const { id } = data
  return request({
    url: `/acl/api/dataItem/getSearchAllItem?id=${id}`,
    method: 'GET',
    params: {},
    timeout: 10 * 1000
  })
}

// 根据数据字典数据项编码查询所属option选项
export function getDataOption (code) {
  return request({
    url: `/acl/api/dataOption/list/${code}`,
    method: 'GET'
  })
}
