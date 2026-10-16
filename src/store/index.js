import { createStore } from 'vuex'
import { Login, getinfo } from '~/api/manager.js'
import { setToken, clearToken } from '~/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
      //侧边宽度
      asideWidth: `250px`,
      //侧边菜单数组
      menus: [],
      //权限
      ruleNames: []
    }
  },
  mutations: {
    // 记录用户信息
    SET_USER(state, user) {
      state.user = user
    },
    //展开/收起侧边栏宽度
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth === `250px` ? `64px` : `250px`

    },
    //设置侧边菜单数组
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    //设置权限
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames
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
            //设置侧边菜单数组
            commit(`SET_MENUS`, res.menus)
            //设置权限
            commit(`SET_RULENAMES`, res.ruleNames)
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