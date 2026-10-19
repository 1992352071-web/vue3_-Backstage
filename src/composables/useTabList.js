import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
export function useTabList() {
  const cookie = useCookies()

  const route = useRoute()
  const router = useRouter()

  let tabIndex = 2
  const activeTab = ref(route.path)
  const tabList = ref([
    {
      title: '后台首页',
      path: "/"
    },
    {
      title: '商城管理',
      path: "/goods/list"
    },

  ])
  //点击标签切换页面
  const changeTab = (t) => {
    router.push(t)
    activeTab.value = t
  }

  //刷新初始化标签导航栏
  function initTabList() {
    let tabs = cookie.get(`tabList`) || [{
      title: '后台首页',
      path: "/"
    }]
    if (tabs) {
      tabList.value = tabs
    }
  }
  initTabList()
  //添加路由方法
  function addTab(tab) {
    let noTab = tabList.value.findIndex(t => t.path === tab.path)
    if (noTab === -1) {
      tabList.value.push(tab)
      cookie.set(`tabList`, tabList.value)
    }
  }

  //监听路由变化，添加标签
  watch(() => route.path, (path) => {
    activeTab.value = path
    //添加路由
    addTab({
      title: route.meta.title,
      path
    })
  })
  const removeTab = (t) => {
    let tabs = tabList.value
    let a = activeTab.value
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }
    //下一个跳转
    activeTab.value = a
    //根据当前关闭的路径过滤tab列表，删除关闭项
    tabList.value = tabList.value.filter(tab => tab.path !== t)
    //刷新cookie
    cookie.set(`tabList`, tabList.value)

  }
  const handleClose = (c) => {

    if (c === 'clearAll') {
      //切换回首页
      activeTab.value = "/"
      //过滤只剩下首页
      tabList.value = [{
        title: '后台首页',
        path: "/"
      }]
    } else if (c === 'clearOther') {
      //过滤其他标签,保留当前标签和首页
      tabList.value = tabList.value.filter(tab => tab.path === `/` || tab.path == activeTab.value)
    }
    //刷新cookie
    cookie.set(`tabList`, tabList.value)
  }
  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  }
}


