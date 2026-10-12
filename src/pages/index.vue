<template>
  <div>
    <h1>首页说是</h1>
    <h2>{{ store.state.user.username }}</h2>
    <el-button type="primary" @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showModal, toast } from '~/composables/util'
import { logout } from '~/api/manager'


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
</script>

<style scoped></style>