<template>
  <v-app>
    <app-bar-component></app-bar-component>
    <v-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import AppBarComponent from './components/AppBarComponent.vue'
export default {
  name: 'App',
  components: {
    AppBarComponent,
  },
}
</script>
