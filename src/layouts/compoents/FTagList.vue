<template>
  <div class="f-tag-list" :style="{ left: '$store.state.asidebarWidth' }">
    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab"
      style="min-width: 100px;">
      <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.title" :name="item.path">

      </el-tab-pane>
    </el-tabs>
    <!-- 下拉菜单 -->
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">

          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: '后台首页',
    path: "/"
  },
  {
    title: '商城管理',
    path: "/goods/list"
  },

])
const addTab = (targetName) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}



</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  z-index: 100;
  height: 44px;
}

:deep(.demo-tabs) {
  @apply ml-auto;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-3;
  height: 32px;
}

:deep(.el-tabs__header) {
  @apply mb-0;
}

:deep(.el-tab__nav) {
  border: 0 !important;
}

:deep(.el-tab__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;

}

:deep(.el-tab__nav-next),
:deep(.el-tab__nav-prev) {
  line-height: 32px;
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>