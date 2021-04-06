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
// 删除列表接口
export function deleteLists (data) {
  const { id } = data
  return request({
    url: `/crp-project/project/v1/deleteProject/${id}`,
    method: 'get',
    params: {}
  })
}
// 完成列表接口
export function finishedAlreadys (data) {
  const { id } = data
  return request({
    url: `/crp-project/project/v1/finishProject/${id}`,
    method: 'get',
    params: {}
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
// 精确搜索
export function preciseSearch (data) {
  return request({
    url: '/crp-project/projectInEx/v1/preciseSearch',
    method: 'POST',
    timeout: 20000 * 1000,
    data
  })
}

// 纳入事件搜索
export function seniorSearch (data) {
  return request({
    url: '/crp-project/projectInEx/v1/seniorSearch',
    method: 'POST',
    timeout: 20000 * 1000,
    data
  })
}
// 纳入条件树搜索
export function treeSearch (data) {
  return request({
    url: '/crp-project/projectInEx/v1/treeSearch',
    method: 'POST',
    timeout: 20000 * 1000,
    data
  })
}
export function treeSearchAll (data) {
  return request({
    url: '/crp-project/projectInEx/v1/treeSearchAll',
    method: 'POST',
    timeout: 20000 * 1000,
    data
  })
}
// 根据用户项目id查询项目的纳排信息
export function getListByGroupId (groupId) {
  return request({
    url: `/crp-project/projectInEx/v1/getListByGroupId/${groupId}`,
    method: 'GET'
  })
}
// 确认纳入接口
export function sureInputDatas (data) {
  const { projectId, groupId } = data
  return request({
    url: `/crp-project/projectInEx/v1/bringQueue?projectId=${projectId}&groupId=${groupId}`,
    method: 'POST',
    // timeout: 20000 * 1000,
    data
  })
}

// 完成摘取数据
export function getPullDatas (data) {
  const { projectId } = data
  return request({
    url: `/crp-project/keyValueMapping/v1/extract/${projectId}`,
    method: 'GET'
  })
}

// 项目详情数据表格抽取数据
export function getListDetaileForms (data) {
  return request({
    url: '/crp-project/keyValueMapping/v1/list',
    method: 'GET',
    params: data
  })
}

// 项目导出动作记录
export function exportRecordsDatas (data) {
  return request({
    url: '/crp-project/export/record/v1/list',
    method: 'GET',
    params: data
  })
}

// 入组阶段数据导出
export function exportRecordsInput (data) {
  const { projectId } = data
  return request({
    url: `/crp-project/keyValueMapping/v1/export/${projectId}`,
    method: 'GET',
    params: data
  })
}

// 提交申请审批接口
export function commitApprover (data) { //
  return request({
    url: '/crp-project/approval/v1/addApproval',
    method: 'put',
    data: data
  })
}

// 导出记录里面的单个删除
export function deleteSingleLists (data) {
  const { recordId } = data
  return request({
    url: `/crp-project/export/record/v1/delete/${recordId}`,
    method: 'GET',
    params: data
  })
}
// 导出记录全部清空
export function deleteAllLists (data) {
  const { projectId } = data
  return request({
    url: `/crp-project/export/record/v1/deletes/${projectId}`,
    method: 'GET',
    params: data
  })
}

// 导出文件下载
export function downLoadFiles (data) {
  const { recordId } = data
  return request({
    url: `/crp-project/export/record/v1/download/${recordId}`,
    method: 'GET',
    params: {},
    responseType: 'blob'
  })
}

// 项目成员--原来数据
// export function getItemMember (data) {
//   return request({
//     url: '/acl/api/dataItem/selectAllUser',
//     method: 'GET',
//     params: {}
//   })
// }

// 项目成员-acl本地测试成功
export function getItemMember (data) {
  return request({
    url: '/crp-project/project/v1/getUsers',
    method: 'GET',
    params: data
  })
}
// // acl--重庆地址
// export function getItemMember (data) {
//   return request({
//     url: 'http://192.168.1.198:9991/acl',
//     method: 'GET',
//     params: data
//   })
// }
// http://10.131.101.5/crp-project/project/v1/getUsers?userName=刘
// http://172.16.15.66:8089/acl/api/user/getUsersByCompId?comId=5&userName=%E5%88%98

// 回显项目成员
export function getBackItemMember (data) {
  const { id } = data
  return request({
    url: `/crp-project/project/v1/getMember/${id}`,
    method: 'GET',
    params: data
  })
}

// 导出审批列表接口
export function getExportApprove (data) {
  return request({
    url: '/crp-project/approval/v1/getApprovalList',
    method: 'GET',
    params: data
  })
}

// 审批状态
export function approveStatus (data) {
  return request({
    url: '/crp-project/approval/v1/updateStatus',
    method: 'post',
    data
  })
}

// 导出记录按钮状态判断
export function exportRecordButton (data) {
  return request({
    url: '/crp-project/approval/v1/projectCurrentStatus',
    method: 'GET',
    params: data
  })
}
