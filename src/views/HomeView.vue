<template>
  <v-container>
    <filter-component
      :filter="filter"
      :filtersOptions="filterOptions"
      @submit="search"
    ></filter-component>
    <list-countries-component
      :items="countries"
      :filter="filter"
      :error="error"
      :loading="loading"
    ></list-countries-component>
  </v-container>
</template>

<script>
import {
  defaultFilterOptions,
  filters,
  formatOptions,
  getAllCountries,
  getCountries,
} from '@/api'
import FilterComponent from '@/components/FilterComponent.vue'
import ListCountriesComponent from '@/components/ListCountriesComponent.vue'

export default {
  name: 'HomeView',
  props: {
    filterProp: Object,
  },
  components: { FilterComponent, ListCountriesComponent },
  data() {
    return {
      countries: [],
      filter: this.filterProp || {
        type: filters.name.key,
        value: '',
      },
      error: '',
      filterOptions: defaultFilterOptions,
      loading: false,
    }
  },
  methods: {
    search(filter = {}) {
      const { type, value } = filter
      if (!value) return
      this.filter = filter
      this.findCountries(type, value)
    },
    findCountries: async function (type, value) {
      this.loading = true
      try {
        let res = await getCountries(type, value)
        this.countries = res.data
      } catch (err) {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error)
        this.error = 'Algo deu errado. Tente novamente mais tarde.'
      }
      this.loading = false
    },
  },
  watch: {
    filterProp(curr, old) {
      console.log('filter', curr)
      this.filter = this.filterProp
    },
    $route(curr, old) {
      console.log('aqui de novo')
      this.search(this.filter)
    },
  },
  created() {
    getAllCountries()
      .then((res) => {
        this.filterOptions = formatOptions(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
