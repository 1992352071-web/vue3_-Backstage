<template>
  <div class="f-header ">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      帝莎编程
    </span>
    <el-icon class="icon-btn">
      <Fold />
    </el-icon>
    <!-- 刷新按钮 -->
    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
      <span class="icon-btn" @click="handleRefresh">
        <el-icon>
          <Refresh />
        </el-icon>
      </span>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn">
        <Monitor />
      </el-icon>
      <!-- 全屏按钮 -->
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <span class="icon-btn" @click="handleFullScreen">
          <el-icon>
            <FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </span>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}

          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>


          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
  <el-drawer v-model="showDrawer" title="修改密码" size="45%" :click-on-click-modal="false">

    <el-form :model="form" :rules="rules" ref="formref" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码" size="large" :prefix-icon="User">

        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password
          :prefix-icon="Lock">

        </el-input>
      </el-form-item>
      <el-form-item prop="rePassword" label="确认密码">

        <el-input v-model="form.rePassword" type="password" placeholder="请输入确认密码" size="large" :prefix-icon="User">

        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-full" :loading="loading" size="large" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { useFullscreen } from '@vueuse/core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showModal, toast } from '~/composables/util'
import { logout } from '~/api/manager'
import { updatePassword } from '~/api/manager'

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
function handleCommand(c) {
  switch (c) {
    case 'logout':
      handleLogout()
      break;
    case 'rePassword':
      //打开修改密码抽屉
      showDrawer.value = true
      break;

  }
}
//刷新
function handleRefresh() {
  window.location.reload()
}

//全屏
const { isFullscreen, toggle } = useFullscreen()
function handleFullScreen() {
  toggle()
}
//抽屉修改密码
const showDrawer = ref(false)

const form = reactive({
  oldpassword: '',
  password: '',
  rePassword: '',
})

const formref = ref(null)
const loading = ref(false)
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
const onSubmit = () => {
  formref.value.validate((valid) => {
    if (!valid) {
      console.log('登录验证错误')
      return false
    }
    loading.value = true
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
        loading.value = false
      })


  })
}
</script>

<style scoped>
.f-header {
  @apply flex items-center bg-indigo-600 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl;
}

.icon-btn {
  @apply flex items-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-500;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex items-center justify-center mr-10;
}
</style>
