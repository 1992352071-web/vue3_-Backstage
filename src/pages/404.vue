<template>
  <div>
 <el-col :sm="12" :lg="6" :xl="4">
      <el-result
        icon="warning"
        title="404 Not Found"
        sub-title="页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">Back</el-button>
        </template>
      </el-result>
    </el-col>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>