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
  <div style="height: 44px;">

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()

const route = useRoute()
const router = useRouter()

let tabIndex = 2
const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: "/"
  },
  {
    title: '商城管理',
    path: "/goods/list"
  },

])
//点击标签切换页面
const changeTab = (t) => {
  router.push(t)
  activeTab.value = t
}

//刷新初始化标签导航栏
function initTabList() {
  let tabs = cookie.get(`tabList`) || [{
    title: '后台首页',
    path: "/"
  }]
  if (tabs) {
    tabList.value = tabs
  }
}
initTabList()
//添加路由方法
function addTab(tab) {
  let noTab = tabList.value.findIndex(t => t.path === tab.path)
  if (noTab === -1) {
    tabList.value.push(tab)
    cookie.set(`tabList`, tabList.value)
  }
}

//监听路由变化，添加标签
watch(() => route.path, (path) => {
  activeTab.value = path
  //添加路由
  addTab({
    title: route.meta.title,
    path
  })
})
const removeTab = (t) => {
  let tabs = tabList.value
  let a = activeTab.value
  if (a == t) {
    tabs.forEach((tab, index) => {
      if (tab.path == t) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          a = nextTab.path
        }
      }
    })
  }
  //下一个跳转
  activeTab.value = a
  //根据当前关闭的路径过滤tab列表，删除关闭项
  tabList.value = tabList.value.filter(tab => tab.path !== t)
  //刷新cookie
  cookie.set(`tabList`, tabList.value)

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
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>