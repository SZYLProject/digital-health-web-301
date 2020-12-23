import request from '@/utils/request'
import Qs from 'qs'

export function login (data) {
  return request({
    url: '/acl/api/sso/verifyLoginByUser',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)// userItcode,userPassword
  })
}
// 一级和二级菜单
export function getMenu (userId) {
  return request({
    url: '/acl/api/role/getChildMenusToSystem',
    method: 'GET',
    params: {
      userId,
      systemCode: 'fP596jbezE' // 系统编码
    }
  })
}

// 退出登录
export function logout (token) {
  return request({
    url: '/acl/api/sso/loginOut',
    method: 'GET',
    params: {
      dynamicKey: token
    }
  })
}
// 用户信息
export function getUserInfo (token) {
  return request({
    url: '/acl/api/user/getUserDataByDynamicKey',
    method: 'GET',
    params: {
      dynamicKey: token
    }
  })
}
// 忘记密码
export function findPwdByEmail (email) {
  return request({
    url: '/acl/api/user/resetPwd/findPwdByEmail',
    method: 'GET',
    params: {
      email
    }
  })
}
export function checkExpire (expireCode) {
  return request({
    url: '/acl/api/user/resetPwd/checkExpire',
    method: 'GET',
    params: {
      expireCode
    }
  })
}
// 重置密码
export function reSetPassWord (userPassword, expireCode) {
  return request({
    url: '/acl/api/user/resetPwd/reSetPassWord',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify({
      userPassword,
      expireCode
    })
  })
}
// 修改密码
export function updatePassword (data) {
  return request({
    url: '/acl/api/user/updatePassword',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}
// 修改皮肤
export function updateSkin (data) {
  return request({
    url: `/acl/api/preference/savePreferenceSkin/${data.userId}`,
    method: 'POST',
    data: {
      skin: data.skin
    }
  })
}
// 获取用户选择的病种及偏好设置
export function getPreference (userId) {
  return request({
    url: `/acl/api/preference/getPreference/${userId}`,
    method: 'GET'
  })
}
