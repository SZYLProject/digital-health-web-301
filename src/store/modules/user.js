import { login, logout, getMenu, getUserInfo, getPreference } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import Storage from '@/utils/storage'

import { listToTree } from '@/utils/index'

const state = {
  token: getToken(),
  userId: getUserId(),
  authList: [],
  userInfo: null,
  dataSourceValue: {
    id: null, // 病种 ID
    sourceName: '' // 病种名称
  },
  show: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_AUTHLIST: (state, authList) => {
    state.authList = authList
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },

  // 存储病种 ID
  STORE_PATIENTID: (state, data) => {
    const { id, sourceName } = data
    const { sessionSet, sessionGet } = Storage
    sessionSet('pID', data)
    state.dataSourceValue = {
      id: id ?? (sessionGet('pID')?.id),
      sourceName: sourceName
    }
  },

  SET_SHOW: (state, show) => {
    state.show = show
  }

}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userItcode: username.trim(), userPassword: password }).then(response => {
        const { obj } = response
        setToken(obj.dynamicKey)
        setUserId(obj.userId)
        commit('SET_TOKEN', obj.dynamicKey)
        commit('SET_USERID', obj.userId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 一级二级菜单 用户信息 病种及偏好设置
  getInfo ({ commit, dispatch, state }) {
    return Promise.all([getMenu(state.userId), getUserInfo(state.token), getPreference(state.userId)]).then((res) => {
      const [menu, info, preference] = res
      commit('SET_AUTHLIST', listToTree(menu.obj))
      commit('SET_USERINFO', info.obj)
      const newObj = preference?.obj?.dataSourceValue
      const parseObj = JSON.parse(newObj)
      commit('STORE_PATIENTID', parseObj)
      dispatch('app/changeSetting', {
        key: 'theme',
        value: preference.obj.skin
      }, { root: true })
    }).catch(error => {
      console.log(error)
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_AUTHLIST', [])
        removeToken()
        removeUserId()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERID', '')
      commit('SET_AUTHLIST', [])
      removeToken()
      removeUserId()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
