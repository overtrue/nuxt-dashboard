<template>
  <el-select
    v-model="selected"
    :placeholder="placeholder"
    :loading="loading"
    :data-source="items"
    :multiple="multiple"
    filterable
    value-key="id"
    @change="onChange"
  >
    <el-option v-for="item in items" :key="item.id" :value="item.id" :label="item.name" :data="item" />
  </el-select>
</template>

<script>
export default {
  props: {
    value: [String, Number, Array, Object, null],
    multiple: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      selected: this.value ? this.value.map((i) => i.id) : [],
      items: [],
      loading: false,
    }
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    onChange() {
      this.$emit('input', this.selected)
      this.$emit('change')
    },
    async loadItems() {
      this.loading = true
      const response = await this.$axios.$get('/tags')
      this.loading = false
      this.items = response.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    },
  },
}
</script>
