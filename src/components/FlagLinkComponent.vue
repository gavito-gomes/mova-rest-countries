<template>
  <v-card :elevation="4">
    <router-link :to="href">
      <v-img :src="imgSrc" :aspect-ratio="16 / 9"></v-img>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
}
</script>
