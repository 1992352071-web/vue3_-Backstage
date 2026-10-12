import { ElNotification } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//成功提示
export function toast(message, type = 'success', title = '欢迎回来', dangerouslyUseHTMLString = false) {
  ElNotification({
    type,
    title,
    message,
    duration: 3000,
    dangerouslyUseHTMLString,
  })
}
//提示弹出框
export function showModal(content, type, title) {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type
    }
  )
}
//显示全局loading
export function showFullLoading() {
  nprogress.start()
}
//隐藏全局loading
export function hideFullLoading() {
  nprogress.done()
}
