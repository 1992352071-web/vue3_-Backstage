import { createStore } from 'vuex'
import { Login, getinfo } from '~/api/manager.js'
import { setToken, clearToken } from '~/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    // 记录用户信息
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    //登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        Login(username, password).then(
          res => {
            setToken(res.token)
            resolve(res)
          }

        ).catch(
          err => {
            reject(err)
          })
      })
    },
    // 获取用户信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo().then(
          res => {
            commit('SET_USER', res)
            resolve(res)
          }).catch(
            err => {
              reject(err)
            })
      })

    },
    // 退出登录
    logout({ commit }) {
      //清除cookie中的token
      clearToken()
      //清除vuex中的用户信息
      commit("SET_USER", {})
    }
  }
})
export default store