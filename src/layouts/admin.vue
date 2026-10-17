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
      <router-view></router-view>
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
</style>