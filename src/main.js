import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { router } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index.js'





const app = createApp(App)

// 挂载 store
app.use(store)
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'virtual:windi.css'
// 引入全局前置守卫
import './permissions.js'
import "nprogress/nprogress.css"
app.mount('#app')
