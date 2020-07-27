import Vue from 'vue'
import Home from '@/page/Home'

describe('.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.').textContent)
      .to.equal('')
  })
})
