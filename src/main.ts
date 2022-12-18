import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import piniaStore from './store'
import ElementPlus from 'element-plus'
import '@/style/base.scss'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(router)
app.use(piniaStore)
app.use(ElementPlus)
app.mount('#app')
