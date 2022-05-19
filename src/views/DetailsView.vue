<template>
  <v-container class="px-6 pt-6 px-md-16">
    <v-row v-if="loading">
      <v-col class="my-16">
        <v-progress-circular
          indeterminate
          color="primary lighten-2"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else-if="country">
      <v-col cols="12" sm="7" md="6">
        <v-img :src="country.flags.png" :aspect-ratio="16 / 9"></v-img>
      </v-col>
      <v-col cols="12" sm="5" md="6" class="text-left">
        <p class="title">
          <strong>Nome: {{ country.name.common }}</strong>
        </p>
        <p>Capital: {{ country.capital[0] }}</p>
        <p>
          Região:
          <a href="" @click.prevent="findRegion">{{ country.region }}</a>
        </p>
        <p>Sub-região: {{ country.subregion }}</p>
        <p>População: {{ country.population }}</p>
        <p>Linguas: {{ Object.values(country.languages).join(', ') }}</p>
      </v-col>
      <v-col cols="12" class="text-left">
        <p><strong>Países vizinhos:</strong></p>
        <v-row v-if="neighbours && neighbours.length > 0">
          <v-col v-for="(item, i) in paginatedNeighbours" :key="i" cols="2">
            <flag-link-component
              :href="`/details/${item.cca2}`"
              :imgSrc="item.flags.png"
            ></flag-link-component>
          </v-col>

          <v-col
            cols="12"
            v-if="neighbours.length && neighboursPages.total > 1"
          >
            <v-pagination
              v-model="neighboursPages.num"
              :length="neighboursPages.total"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <p>
              {{
                neighboursError
                  ? neighboursError
                  : 'Este país não tem vizinhos.'
              }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <p>{{ error }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { filters, getCountriesByCode, getCountryInfo } from '@/api'
import FlagLinkComponent from '@/components/FlagLinkComponent.vue'

export default {
  name: 'DetailsView',
  props: {
    code: String,
  },
  components: {
    FlagLinkComponent,
  },
  data() {
    return {
      loading: true,
      country: undefined,
      error: '',
      neighbours: [],
      neighboursError: '',
      neighboursPages: {
        num: 1,
        total: 1,
        limit: 6,
      },
    }
  },
  computed: {
    paginatedNeighbours() {
      return [...this.neighbours].splice(
        (this.neighboursPages.num - 1) * this.neighboursPages.limit,
        this.neighboursPages.limit
      )
    },
  },
  methods: {
    getInfo: async function () {
      try {
        let res = await getCountryInfo(this.code)
        this.country = res.data[0]
        return this.country
      } catch (err) {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error)
        if (error.code == 'ERR_BAD_REQUEST')
          this.error = `País com código ${this.code} não encontrado.`
        else this.error = 'Algo deu errado. Tente novamente mais tarde.'
      }
    },
    getNeighbours: async function () {
      if (!this.country.borders) return (this.neighbours = [])
      try {
        let res = await getCountriesByCode(this.country.borders)
        this.neighbours = res.data
      } catch (err) {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error)
        this.neighboursError = `Erro ao carregar países vizinhos.`
      }
    },
    findRegion() {
      this.$router.push({
        name: 'home',
        params: {
          filterProp: {
            type: filters.region.key,
            value: this.country.region,
          },
        },
      })
    },
  },
  watch: {
    code: {
      immediate: true,
      handler() {
        this.getInfo()
          .then(() => this.getNeighbours())
          .finally(() => {
            this.loading = false
          })
      },
    },
    neighbours: {
      immediate: true,
      handler(val, old) {
        this.neighboursPages.num = 1
        if (val && val.length) {
          console.log('update')
          this.neighboursPages.total = Math.ceil(
            val.length / this.neighboursPages.limit
          )
        }
      },
    },
  },
}
</script>
