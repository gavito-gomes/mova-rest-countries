import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import FilterComponent from '@/components/FilterComponent.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('FilterComponent.vue', () => {
  let vuetify

  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Filter default prop', () => {
    const wrapper = shallowMount(FilterComponent, {
      localVue,
      router,
      vuetify,
    })
    expect(wrapper.props('filter')).toEqual({
      type: '',
      value: '',
    })
  })

  it('Should emit an event (submit) when the form is submitted', () => {
    const wrapper = mount(FilterComponent, {
      localVue,
      vuetify,
    })

    const event = jest.fn()
    const form = wrapper.find('.v-form')

    wrapper.vm.$on('submit', event)

    expect(event).toHaveBeenCalledTimes(0)

    form.trigger('submit')

    expect(event).toHaveBeenCalledTimes(1)
  })
})
