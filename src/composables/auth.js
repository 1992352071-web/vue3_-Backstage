import { useCookies } from '@vueuse/integrations/useCookies'
const tokenkey = "admin-token"
const cookies = useCookies()

//获取token方法
export function getToken() {
  return cookies.get(tokenkey)
}
//设置token方法
export function setToken(token) {
  cookies.set(tokenkey, token)
}
//清除token方法
export function clearToken() {
  cookies.remove(tokenkey)
}