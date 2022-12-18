<template>
  <div class="home">我是首页</div>
  <button @click="clickAdd">{{ count }}</button>

  <br />
  <button @click="clickFull">是否全屏</button>
  <br />
  <el-button @click="goLogin">跳转路由</el-button>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Screenfull from 'screenfull'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const { count } = storeToRefs(userStore)
const router = useRouter()

const clickAdd = () => {
  userStore.add()
}

const clickFull = () => {
  Screenfull.toggle()
}

const goLogin = () => {
  router.push({ path: '/login' })
}
</script>

<style lang="scss" scoped></style>
