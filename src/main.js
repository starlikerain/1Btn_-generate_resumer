// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vue from 'vue/dist/vue.common.js'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import i18n from './i18n/'

var locales = i18n

Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'

Object.keys(locales).forEach(function (lang) {
    Vue.locale(lang, locales[lang])
})


/* eslint-disable no-new */
let WIN_VUE = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
window.WIN_VUE = WIN_VUE
// 『在当前页引入router 所以子页面都可以使用 router』