<template>
  <div class="login">
      <van-nav-bar
        title="登录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.phone"
          name="phone"
          label="用户名"
          placeholder="用户名"
          :rules="[{
            required: true,
            message: '请填写手机号'
          },{
            validator: phoneCheck,
            message: '格式有误，请重新输⼊'
          }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{
            required: true,
            message: '请填写密码'
          },{
            validator: passwordCheck,
            message: '格式有误，请重新输⼊'
          }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :loading="isLoading">提交</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { getLogin } from '@/services/user'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      const { data } = await getLogin(this.form)
      console.log('submit', data)
      if (data.state === 1) {
        this.$store.commit('setUser', data.content)
        this.$toast.success('登录成功')
        // 跳转
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    passwordCheck (value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value)
    },
    onClickLeft () {
      // go() ⽤于跳转历史，-1 代表后退⼀个⻚⾯，⽤法类似 history.go()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
