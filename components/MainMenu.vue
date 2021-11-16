<template>
  <div class="bg-gray-800 text-gray-200 min-w-48 max-w-64 relative flex-none">
    <nuxt-link
      to="/"
      class="h-16 px-4 bg-gray-900 flex items-center justify-center hover:bg-gray-900"
    >
      <div class="text-xl font-semibold">{{ $root.$options.head.title }}</div>
    </nuxt-link>
    <env-switcher />
    <div class="px-2">
      <template v-for="menu of menus">
        <nuxt-link
          :key="menu.label"
          :to="menu.path"
          class="block px-4 py-2 rounded hover:bg-gray-900"
        >
          <template>
            <icon
              :name="menu.icon || 'chart-bubble'"
              class="text-gray-400 mr-2"
            />
            <span>{{ menu.label }}</span>
          </template>
        </nuxt-link>
      </template>
    </div>
    <div
      class="bg-gray-900 text-gray-200 absolute w-full bottom-0 flex-none p-6"
    >
      <user-cell :user="user"></user-cell>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      menus: this.$nuxt.$config.menus
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
};
</script>

<style lang="scss" scoped>
a.nuxt-link-exact-active {
  @apply .bg-gray-900 .text-white;
}
</style>
