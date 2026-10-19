<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs @tab-change="changeTab" v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab"
      style="min-width: 100px;">
      <el-tab-pane :closable="item.path !== `/`" v-for="item in tabList" :key="item.path" :label="item.title"
        :name="item.path">

      </el-tab-pane>
    </el-tabs>
    <!-- 下拉菜单 -->
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">

          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px;">

  </div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList'
//解构
const { activeTab, tabList, changeTab, removeTab, handleClose } = useTabList()

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
  flex: 1;
  min-width: 0;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-3;
  height: 32px;
}

:deep(.el-tabs__header) {
  @apply mb-0;
  border: 0 !important;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;

}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allo wed;
  @apply text-gray-300;
}
</style>