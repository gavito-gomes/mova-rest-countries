<template>
  <div>
    <v-row class="mt-6">
      <v-col class="text-md-left">
        <p class="body-1 mb-1">
          Pesquisando por <strong>{{ currentFilterLabel }}</strong>
        </p>
        <p class="body-1 mb-1">
          Exibindo resultados para: <strong>{{ filter.value }}</strong>
        </p>
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-if="items && items.length">
      <v-col
        v-for="(item, i) in paginatedItems"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card :elevation="4">
          <flag-link-component
            :href="`/details/${item.cca2}`"
            :imgSrc="item.flags.png"
          ></flag-link-component>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="items.length && pages.total > 1">
        <v-pagination v-model="pages.num" :length="pages.total"></v-pagination>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <p class="mt-10">
          {{ error || 'Nenhum resultado encontrado.' }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getLabelFromKey } from '@/api'
import FlagLinkComponent from './FlagLinkComponent.vue'

export default {
  components: { FlagLinkComponent },
  props: {
    items: Array,
    filter: {
      type: Object,
      default: () => ({
        type: '',
        value: '',
      }),
    },
    error: String,
    loading: Boolean,
  },
  data() {
    return {
      pages: {
        num: 1,
        total: 1,
        limit: 12,
      },
    }
  },
  computed: {
    currentFilterLabel() {
      return getLabelFromKey(this.filter.type)
    },
    paginatedItems() {
      return [...this.items].splice(
        (this.pages.num - 1) * this.pages.limit,
        this.pages.limit
      )
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(val, old) {
        this.pages.num = 1
        if (val && val.length)
          this.pages.total = Math.ceil(val.length / this.pages.limit)
      },
    },
  },
}
</script>
