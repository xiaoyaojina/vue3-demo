<template>
  <div class="login">
    登录页 {{ name }}

    <div><el-button @click="goHome">跳转路由</el-button></div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const { name } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()

const goHome = () => {
  router.push({ path: '/' })
  console.log(route.query)
}
</script>

<style lang="scss" scoped></style>
