import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5e24285a = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _abaa0d4c = () => interopDefault(import('..\\pages\\link\\index.vue' /* webpackChunkName: "pages_link_index" */))
const _1d25beb6 = () => interopDefault(import('..\\pages\\liveMessage\\index.vue' /* webpackChunkName: "pages_liveMessage_index" */))
const _33d4f632 = () => interopDefault(import('..\\pages\\article\\_id.vue' /* webpackChunkName: "pages_article__id" */))
const _405a6c94 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5e24285a,
    name: "about"
  }, {
    path: "/link",
    component: _abaa0d4c,
    name: "link"
  }, {
    path: "/liveMessage",
    component: _1d25beb6,
    name: "liveMessage"
  }, {
    path: "/article/:id?",
    component: _33d4f632,
    name: "article-id"
  }, {
    path: "/",
    component: _405a6c94,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
