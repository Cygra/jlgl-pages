export const pageConfig = (title: string) =>
  `{
  "title": "${title}"
}
`

export const pageSingle = `<template>
  <div></div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
`

export const mainJsSingle = `import Vue from 'vue'
import Page from './Page.vue'

new Vue({ render: h => h(Page) }).$mount('#app')
`

export const pageMulti = `<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
`

export const mainJsMulti = `import Vue from 'vue'
import Router from 'vue-router'
import Page from './Page.vue'

const Index = () => import(/* webpackChunkName: "Index" */'./views/Index')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true,
        title: '首页'
      }
    },
  ],
})

router.beforeEach(({ meta: { title } }, _, next) => {
  document.title = title
  next()
})

new Vue({ router, render: h => h(Page) }).$mount('#app')
`
