<template>
  <i :class="'mdi-' + name" class="mdi"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
