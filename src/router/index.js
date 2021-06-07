import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StuInfo from '../views/StuInfo.vue'
import Record from '../views/Record.vue'
import LogInfo from '../views/LogInfo.vue'
import ChartInfo from '../views/ChartInfo.vue'
import LogDetail from '../views/LogDetail.vue'
import LogTimeDetail from '../views/LogTimeDetail.vue'
import LogStackDetail from '../views/LogStackDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stu-info',
    name: 'StuInfo',
    component: StuInfo
  },
  {
    path: '/ope-record',
    name: 'Record',
    component: Record
  },
  {
    path: '/log-info',
    name: 'LogInfo',
    component: LogInfo
  },
  {
    path: '/chart-info',
    name: 'ChartInfo',
    component: ChartInfo
  },
  {
    path: '/log-detail',
    name: 'LogDetail',
    component: LogDetail
  },
  {
    path: '/log-time-detail',
    name: 'LogTimeDetail',
    component: LogTimeDetail
  },
  {
    path: '/log-stack-detail',
    name: 'LogStackDetail',
    component: LogStackDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
