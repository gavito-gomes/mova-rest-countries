<template>
  <v-form @submit.prevent="submit">
    <v-row justify="center">
      <v-col cols="12" md="3" offset-md="1">
        <v-select
          v-model="filterType"
          item-text="label"
          item-value="key"
          :items="filterTypeOptions"
          label="Filtrar por"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="filterValue"
          :items="filterValueOptions"
          :label="`Pesquisar ${currentFilterLabel}`"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3" class="d-flex align-center justify-center">
        <v-btn color="primary" type="submit">
          <v-icon>mdi-magnify</v-icon>
          <span>Pesquisar</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { filtersArr, getLabelFromKey } from '@/api'
export default {
  props: {
    filter: {
      type: Object,
      default: () => ({
        type: '',
        value: '',
      }),
    },
    filtersOptions: Object,
  },
  data() {
    return {
      filterType: this.filter.type,
      filterValue: this.filter.value,
    }
  },
  computed: {
    currentFilterLabel() {
      return getLabelFromKey(this.filterType)
    },
    filterTypeOptions() {
      return filtersArr
    },
    filterValueOptions() {
      let options = this.filter.type && this.filtersOptions[this.filterType]
      return options
        ? options.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
        : []
    },
  },
  methods: {
    submit() {
      this.$emit('submit', { type: this.filterType, value: this.filterValue })
    },
  },
  watch: {
    filtersOptions: {
      immediate: true,
      handler() {
        // console.log('filter', this.filtersOptions)
      },
    },
    filter(val, old) {
      this.filterType = val.type
      this.filterValue = val.value
    },
  },
}
</script>
