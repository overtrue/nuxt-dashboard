<template>
  <div class="flex min-h-screen">
    <main-menu class="w-64 max-w-80" />
    <nuxt class="flex-1" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },
  computed: {},
  mounted() {
    this.$store.dispatch('auth/fetchUser')
  },
}
</script>
