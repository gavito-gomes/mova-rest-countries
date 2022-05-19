<template>
  <v-app-bar app :height="80" :elevation="2">
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          src="@/assets/logo.png"
          alt="logo"
          max-height="48"
          contain
        ></v-img>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      color="primary"
      text
      :elevation="0"
      :outlined="!isMobile"
      small
      @click="$router.go(-1)"
    >
      <v-icon>mdi-keyboard-return</v-icon>
      <span v-show="!isMobile">Voltar</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
}
</script>
