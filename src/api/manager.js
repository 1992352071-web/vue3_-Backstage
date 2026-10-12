import axios from '~/axios'
// 登录方法
export function Login(username, passwword) {
  return axios.post("/admin/login", {
    username,
    password: passwword
  })

}
export function getinfo() {
  return axios.post("/admin/getinfo")

}
// 退出登录
export function logout() {
  return axios.post("/admin/logout")
}
// 修改密码
export function updatePassword(newPassword) {
  return axios.post("/admin/updatepassword",
    newPassword
  )
}
