<template>
  <el-container class="bg-light-100">
    <el-header>
      <!-- 导航头 -->
      <FHeader></FHeader>
    </el-header>
  </el-container>
  <el-container class="bg-light-100">
    <el-aside :width="$store.state.asideWidth">
      <!-- 侧边菜单 -->
      <FMenu></FMenu>
    </el-aside>
    <el-main>
      <!-- 主体内容 -->
      <!-- 标签页 -->
      <FTagList></FTagList>
      <!-- 路由中间内容 -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive :max="10">
            <Component :is="Component"></Component>
          </keep-alive>
        </transition>

      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import FTagList from './compoents/FTagList.vue'
import FHeader from './compoents/FHeader.vue'
import FMenu from './compoents/FMenu.vue'
</script>

<style>
.el-aside {
  transition: all 0.2s;
}

.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>