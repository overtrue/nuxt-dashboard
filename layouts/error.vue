<template>
  <div class="flex h-screen flex-1 items-center justify-center">
    <error-page :code="error.statusCode" :message="error.message" />
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'plain',
}
</script>
