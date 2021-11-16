<template>
  <div>
    <div class="h-16 px-6 card flex items-center justify-between">
      <h1 class="text-xl font-bold">
        <icon name="account-supervisor" class="mr-2" />
        用户管理
      </h1>
      <div class="text-gray-600 mx-4">
        共 <strong>{{ items.total || 0 }}</strong> 位用户
      </div>
    </div>
    <div class="m-6">
      <div class="flex items-center space-x-4">
        <el-input size="small" v-model="query.keyword" placeholder="关键字搜索" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
      <div class="mt-4 shadow">
        <el-table :data="items.data" :loading="loading" size="medium">
          <el-table-column label="ID" prop="id" width="180" />
          <el-table-column label="用户">
            <template v-slot:default="{ row }">
              <user-cell :user="row" />
            </template>
          </el-table-column>
          <el-table-column label="上次登陆" width="180" prop="last_active_at">
            <template v-slot:default="{ row }">
              <format-date-time :time="row.last_active_at" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180" align="center">
            <template v-slot:default="{ row }">
              <format-date-time :time="row.created_at" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex mt-4 justify-end">
        <el-pagination
          background
          @current-change="(p) => (query.page = p)"
          :total="items.total"
          :page-size.sync="query.per_page"
          jumper
          :page-size-option="[15, 20, 30, 50]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      query: Object.assign(
        {
          per_page: 15,
          page: 1,
          keyword: '',
        },
        this.$route.query || {},
      ),
      items: {
        data: [],
        last_page: 1,
        total: 0,
      },
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.loadItems()
      }
    },
    'query.keyword': {
      deep: true,
      handler(keyword, oldKeyword) {
        if (keyword !== oldKeyword) {
          this.query.page = 1
        }
      },
    },
    query: {
      deep: true,
      handler(query) {
        this.$router.replace({ query })
        this.loadItems()
      },
    },
  },
  async mounted() {
    await this.loadItems()
  },
  methods: {
    async loadItems(params) {
      this.items = await this.$axios.$get('users', {
        params: { ...this.query, ...params },
      })
      this.loading = false
    },
  },
}
</script>
