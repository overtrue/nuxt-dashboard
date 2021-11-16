<template>
  <el-select
    v-model="users"
    :placeholder="placeholder"
    :multiple="multiple"
    :loading="loading"
    :data-source="items"
    :value-type="multiple ? 'data' : 'value'"
    :remote-method="onFilter"
    value-key="id"
    filterable
    remote
    @change="onChange"
  >
    <el-option v-if="!multiple" :value="null" label="无" />
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
      users: this.value,
      query: Object.assign(
        {
          keyword: '',
        },
        this.$route.query || {},
      ),
      items: [],
      loading: false,
    }
  },
  created() {
    this.users = this.multiple ? this.formatUsers(this.value) : this.value
  },
  methods: {
    onChange() {
      this.$emit('input', this.users)
      this.$emit('change')
    },
    async onFilter(user) {
      this.loading = true
      const keyword = { keyword: user }
      const response = await this.$axios.$get('/users', {
        params: { ...keyword },
      })
      this.loading = false
      this.items = response.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    },
    formatUsers(users) {
      if (users === undefined || users.length === 0) {
        return []
      }
      return users.map((user) => {
        return {
          id: user.id,
          name: user.name,
        }
      })
    },
  },
}
</script>
