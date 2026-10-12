<template>
  <el-row style="min-height:100vh;" class="login-container">
    <el-col :lg="16" :md="12" class="login-left">
      <div class="text-left">
        <div>欢迎光临</div>
        <div>这里是登录页，登录后即可进入后台管理系统</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right">
      <div class="w-full px-8" style="max-width: 360px;">
        <h2 class="title">欢迎回来</h2>
        <div class="text-center text-gray-400 text-sm mb-6">
          <span>账号密码登录</span>
        </div>
        <el-form :model="form" :rules="rules" ref="formref">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" size="large" :prefix-icon="User">
              <template #prefix>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password
              :prefix-icon="Lock">
              <template #prefix>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full" :loading="loading" size="large" round
              @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { toast } from '~/composables/util'
import { useStore } from 'vuex'

// 挂载 store
const store = useStore()

import { useRouter } from 'vue-router'
import { setToken } from '~/composables/auth'
import { onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})
const formref = ref(null)
const loading = ref(false)
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度必须在3-5位之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },

  ],
}
const onSubmit = () => {
  formref.value.validate((valid) => {
    if (!valid) {
      console.log('登录验证错误')
      return false
    }
    loading.value = true
    //验证通过后，调用登录方法
    store.dispatch("login", form)
      .then(res => {
        console.log(res)
        //提示成功
        toast('登录成功')
        //跳转后台首页
        router.push('/')
      }).finally(() => {
        loading.value = false
      })

  })
}
//回车输入登录
function onKeyup(e) {
  if (e.key === 'Enter') {
    onSubmit()
  }
}
onMounted(() => {
  // 组件挂载时，监听键盘事件
  document.addEventListener('keyup', onKeyup)
})
onBeforeUnmount(() => {
  // 组件卸载时，移除键盘事件监听
  document.removeEventListener('keyup', onKeyup)
})
</script>

<style scoped>
.login-container {
  @apply bg-indigo-500;
}

.login-left {
  @apply flex items-center justify-center;
}

.login-right {
  @apply bg-white flex items-center justify-center;
}

.login-left>div>div:first-child {
  @apply font-bold text-5x1 text-light-50 mb-4
}

.login-left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.login-right .title {
  @apply font-bold text-3xl text-gray-800 text-center mb-2;
}
</style>