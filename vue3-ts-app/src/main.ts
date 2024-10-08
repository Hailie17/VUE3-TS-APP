import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store, { key } from './stores'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/iconfont.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

app.use(ElementPlus, { locale: zhCn }).use(store, key).mount('#app')
