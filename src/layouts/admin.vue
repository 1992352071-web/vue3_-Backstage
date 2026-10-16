<template>
  <el-container>
    <el-header>
      <FHeader></FHeader>
    </el-header>
  </el-container>
  <el-container>
    <el-aside :width="$store.state.asideWidth">
      <FMenu></FMenu>
    </el-aside>
    <el-main>
      <FTagList></FTagList>
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