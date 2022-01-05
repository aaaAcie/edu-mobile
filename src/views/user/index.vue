<template>
  <div class="user">
    <van-cell-group>
      <van-cell class="user-info" :border="false">
        <van-image
          :src="userInfo.portrait || 'https://img01.yzcdn.cn/vant/cat.jpeg'"
          round
          height="50"
          width="50"
        ></van-image>
        <div class="user-info-content">
          <h3>{{userInfo.userName}}</h3>
          <span>
            <van-icon name="edit"></van-icon>
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span class="grid-item-title">学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span class="grid-item-title">钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span class="grid-item-title">优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span class="grid-item-title">学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="分销中心" icon="friends-o" is-link value="收益200元" />
      <van-cell title="个性化设置" icon="gem-o" is-link />
      <van-cell title="我的下载" icon="down" is-link />
      <van-cell title="帮助与反馈" icon="shield-o" is-link />
      <van-cell title="关于" icon="info-o" is-link value="V2.0.0" />
    </van-cell-group>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'
export default {
  name: 'User',
  components: {
    LayoutFooter
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadInfo()
  },
  methods: {
    async loadInfo () {
      const { data } = await getInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  padding: 0;
  .van-cell__value {
    display: flex;
    background-color: #ff9700;
    padding: 30px 20px 5px;
    .user-info-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-left: 10px;
      h3 {
        font-size: 18px;
        margin: 3px;
      }
    }
  }
}

.account-info {
  background-color: #ff9700;
  margin-top: -1px;
  .van-grid {
    border-radius: 10px;
    overflow: hidden;
  }
  .grid-item-value {
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
