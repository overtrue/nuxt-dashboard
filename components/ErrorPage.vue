<template>
  <div class="flex-1 flex items-center justify-center text-center">
    <div class="error">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" class="mx-auto" fill="#DBE1EC" viewBox="0 0 48 48">
        <path
          d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
        />
      </svg>

      <div class="text-2xl text-gray-600 my-6">
        <div>{{ httpMessage }}</div>
        <div>{{ message }}</div>
      </div>
      <div class="flex items-center space-x-4" v-if="code === 403">
        <span>或许你需要切换环境</span>
        <env-switcher />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      default: 500,
    },
    message: String,
    httpMessage: {
      type: String,
      default() {
        return { 403: '您没有该权限', 404: '您访问的页面不存在', 500: '系统错误' }[this.code] || '系统错误'
      },
    },
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    }
  },
}
</script>
