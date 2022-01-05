<template>
  <div class="course-content">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAds" :key="item.id">
        <img :src="item.img" :alt="item.name">
      </van-swipe-item>
    </van-swipe>
    <course-content-list :fetchData="fetchData"></course-content-list>
  </div>
</template>

<script>
import CourseContentList from '@/components/CourseContentList'
import { getAllAds, getQueryCourses } from '@/services/course'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      adsList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    async fetchData (option) {
      return getQueryCourses(option)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      this.adsList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAds () {
      // console.log(this.adsList)
      return this.adsList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
  img {
    height: 190px;
  }
}
.my-swipe .van-swipe-item {
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.course-content-list {
  top: 242px;
  bottom: 50px;
}
</style>
