<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <!-- 侧边菜单头 -->
    <el-menu :defaultActive="defaultActive" unique-opened :collapse="isCollapse" default-index-active="2"
      class="el-menu-vertical-demo border-0" collapse-transition="false" @select="handleSelect">
      <!-- 一级菜单渲染 -->
      <template v-for="(item, index) in asideMenu" :key="index">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 子（二级）菜单 -->
          <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon" />
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>

    </el-menu>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const asideMenu =
  [
    {
      "name": "后台管理",
      "icon": "help",
      "children": [
        {
          "name": "主控台",
          "frontpath": "/",
          "icon": "home-filled"
        },
      ]
    },
    {
      "name": "商城管理",
      "icon": "shopping-bag",
      "children": [
        {
          "name": "商品管理",
          "frontpath": "/goods/list",
          "icon": "shopping-cart-full"
        },
      ]
    },
  ]
//点击菜单转跳方法
// 路由器
const router = useRouter()
const handleSelect = (e) => {
  router.push(e)
}
//是否折叠计算属性
const store = useStore()
const isCollapse = computed(() => store.state.asideWidth === '64px')

//默认选中项
const route = useRoute()
const defaultActive = ref(route.path)
</script>

<style>
.f-menu {
  transition: all 0.2s;
  @apply shadow-md fixed bg-light-50;
  overflow: auto;
  top: 64px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>