import Vue from 'vue'
import Landing from '@/page/Landing'
import Vuex from 'vuex'
import Router from 'vue-router'

describe('Landing.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Landing)
    Vue.use(Vuex)
    Vue.use(Router)
    const vm = new Constructor().$mount()
    console.log(vm.$store)
    // expect(vm.$el.querySelector('h1').textContent)
    // .to.equal('开发 Develope 创造力 Creativity 集成性 Integration 实用性 Accessibilities 想象力 Imagination 合作力 Corporative 互通性 Interoperability')
  })
})
