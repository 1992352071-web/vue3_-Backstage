<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" :click-on-click-modal="false"
    :destroy-on-close="destroyOnClose">

    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>

import { ref, defineExpose, defineProps, defineEmits } from 'vue'
import { stringifyQuery } from 'vue-router'
const showDrawer = ref(false)
const loading = ref(false)
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  }
})
//打开
const open = () => showDrawer.value = true
//关闭
const close = () => showDrawer.value = false
//提交
const emit = defineEmits(['submit'])
const submit = () => {
  emit('submit')
}
//向父组件暴露方法
defineExpose({
  open,
  close
})
</script>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>