<template>
  <div class="flex items-center">
    <el-image :src="user ? user.avatar : '/default-avatar.png'" alt="" class="avatar mr-2 flex-shrink-0 h-8 w-8">
      <div slot="error">
        <img src="/default-avatar.png" alt="" />
      </div>
    </el-image>

    <div v-if="name" class="truncate">
      {{ user ? user.name : '' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    name: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
