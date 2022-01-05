<template>
  <div class="course-content-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id">
          <div>
            <img :src="item.courseImgUrl || item.image">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-discripition" v-html="item.previewFirstField"></p>
            <p class="price-container" v-if="item.courseImgUrl">
              <span>¥ {{item.discounts}}</span>
              <s>¥ {{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      refreshing: false,
      pageSize: 5
    }
  },
  methods: {
    onRefresh () {
      this.refreshing = true
      this.currentPage = 1

      // 清空列表数据
      this.list = []

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
      this.$toast('刷新成功')
      // 关闭下拉提示
      this.refreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        status: 1
      })
      console.log(data)
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      } else {
        this.finished = true
      }
      this.currentPage++
      this.loading = false
      // 数据全部加载完成
      if (data.data && data.data.records && data.data.records.length < this.pageSize) {
        this.finished = true
      } else if (data.content && data.content.length < 100) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  overflow-y: auto;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.van-cell__value {
  display: flex;
  height: 120px;
  img {
    height: 100%;
    width: 90px;
  }
  h3, p {
    margin: 0;
  }
  .course-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    .course-discripition {
      flex-grow: 1;
      overflow: hidden;
    }
    .price-container span{
      padding-right: 5px;
      color: #ff7452;
    }
  }
}
</style>
