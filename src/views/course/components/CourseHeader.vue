<template>
  <div class="course-header">
      <van-image fit="scale-down" src="https://img01.yzcdn.cn/vant/cat.jpeg"></van-image>
  </div>
</template>

<script>
export default {
  name: 'CourseHeader'
}
</script>

<style lang="scss" scoped>
.course-header {
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.van-image {
    width: 20%;
}
</style>
