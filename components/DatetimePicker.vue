<template>
  <el-date-picker
    v-model="datetime"
    type="datetime"
    :placeholder="placeholder"
    class="w-full"
    format="yyyy-MM-dd HH:mm"
    value-format="yyyy-MM-dd HH:mm:ss"
  >
  </el-date-picker>
</template>
<script>
export default {
  props: {
    value: [String, Date],
    placeholder: {
      type: String,
      default: '选择日期时间',
    },
  },
  data() {
    return {
      datetime: this.value,
    }
  },
  mounted() {
    if (!this.datetime) {
      this.datetime = new Date()
    }
  },
  watch: {
    datetime() {
      if (this.value !== this.datetime) {
        this.$emit('input', this.datetime)
        this.$emit('change', this.datetime)
      }
    },
  },
}
</script>
