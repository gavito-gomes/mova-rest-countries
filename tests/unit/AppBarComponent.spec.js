import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import AppBarComponent from '@/components/AppBarComponent.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('AppBarComponent.vue', () => {
  let vuetify

  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Renders an app-bar', () => {
    const wrapper = shallowMount(AppBarComponent, {
      localVue,
      router,
      vuetify,
    })
    const appBar = wrapper.find('v-app-bar')

    expect(appBar).toBeTruthy()
  })

  it('Redirect correctly to home when logo is clicked', () => {
    const wrapper = mount(AppBarComponent, {
      localVue,
      router,
      vuetify,
    })

    const link = wrapper.find('a')

    link.trigger('click')

    expect(router.currentRoute.path).toBe('/')
  })
})
