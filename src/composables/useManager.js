import { ref, reactive } from 'vue'
import { logout } from '~/api/manager'
import { updatePassword } from '~/api/manager'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showModal, toast } from '~/composables/util'


export function useRepassword() {
  const store = useStore()
  const router = useRouter()
  //抽屉修改密码

  const form = reactive({
    oldpassword: '',
    password: '',
    rePassword: '',
  })

  const formref = ref(null)

  const rules = {
    oldpassword: [
      { required: true, message: '旧密码不能为空', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },

    ],
    rePassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
    ],
  }
  //提交修改密码
  const formDrawerRef = ref(null)
  const onSubmit = () => {
    formref.value.validate((valid) => {
      if (!valid) {
        console.log('登录验证错误')
        return false
      }
      formDrawerRef.value.showLoading()
      //验证通过后，调用修改密码接口
      updatePassword(form)
        .then(res => {
          toast('修改密码成功,请重新登录')
          //调用退出登录方法
          store.dispatch("logout")
          //跳转登录页
          router.push('/login')

        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
          console.log('修改密码完成')
        })


    })
  }
  const openRePasswordForm = () => formDrawerRef.value.open()
  return {
    formDrawerRef,
    form,
    rules,
    onSubmit,
    formref,
    openRePasswordForm

  }
}

export function handlelogout() {
  const store = useStore()
  const router = useRouter()
  function handleLogout() {
    showModal('确定退出登录吗？').then(
      res => {
        console.log(`确定退出登录`)
        logout().finally(() => {
          //调用退出登录方法
          store.dispatch("logout")
          //跳转登录页
          router.push('/login')
          //提示成功
          toast('退出登录成功')

        })
      })
  }
  return {
    handleLogout
  }

}