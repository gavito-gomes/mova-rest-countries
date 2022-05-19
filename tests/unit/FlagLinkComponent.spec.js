import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import FlagLinkComponent from '@/components/FlagLinkComponent.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('FlagLinkComponent.vue', () => {
  let vuetify

  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Renders a card with a link', () => {
    const wrapper = mount(FlagLinkComponent, {
      localVue,
      router,
      vuetify,
      propsData: { imgSrc: '', href: '' },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Receives href correctly', () => {
    const href = '#/details/BR'
    const wrapper = mount(FlagLinkComponent, {
      localVue,
      router,
      vuetify,
      propsData: { imgSrc: '', href },
    })

    const link = wrapper.find('a')

    expect(link.element.href).toMatch(href)
  })

  it('Redirect correctly when clicked', () => {
    const href = '/some/path'
    const wrapper = mount(FlagLinkComponent, {
      localVue,
      router,
      vuetify,
      propsData: { imgSrc: '', href },
    })

    const link = wrapper.find('a')

    link.trigger('click')

    expect(router.currentRoute.path).toBe(href)
  })
})
