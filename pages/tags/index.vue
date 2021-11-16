<template>
  <div>
    <div class="h-16 px-6 card flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-xl font-bold">
          <icon name="tag" class="mr-2" />
          标签管理
        </h1>
        <div class="text-gray-600 mx-4">
          共 <strong>{{ items.total || 0 }}</strong> 个标签
        </div>
      </div>
    </div>
    <div class="m-6">
      <div class="flex items-center space-x-4">
        <div class="flex items-center mr-2">
          <el-button size="small" type="primary" plain icon="el-icon-plus" @click="handleCreate"> 新建标签 </el-button>
          <el-button
            size="small"
            :plain="query.isPopular === ''"
            @click="query.isPopular = query.isPopular === 'true' ? '' : 'true'"
          >
            <icon name="fire"></icon>
            热门标签
          </el-button>
        </div>
        <el-input size="small" class="flex-1" v-model="query.keyword" placeholder="关键字搜索" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
      <div class="mt-4 shadow">
        <el-table :data="items.data" :loading="loading">
          <el-table-column label="ID" prop="id" width="180" />
          <el-table-column label="名称" prop="name">
            <template v-slot:default="{ row }">
              <el-tag size="mini" type="warning" v-if="row.is_popular">热门</el-tag>
              <a :href="`${appBaseUri}/tags/${row.slug}`" target="_blank" class="text-blue-500 visited:text-blue-500">
                {{ row.name }}
                <div class="text-gray-400 leading-none">
                  <small>{{ `/tags/${row.slug}` }} </small>
                </div>
              </a>
            </template>
          </el-table-column>
          <el-table-column label="最后修改" width="180" align="center">
            <template v-slot:default="{ row }">
              <format-date-time :time="row.updated_at" />
            </template>
          </el-table-column>
          <el-table-column label="热门" width="120">
            <template v-slot:default="{ row }">
              <el-button size="small" type="primary" plain @click="handleSwitchPopular(row)">
                <icon name="candle"></icon>
                {{ row.is_popular ? '取消热门' : '标记为热门' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="200">
            <template v-slot:default="{ row }">
              <el-button size="small" plain icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" plain icon="el-icon-delete" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    <el-dialog :visible.sync="tagFormVisible" :title="title" hide-footer width="600px" @closed="tagFormVisible = false">
      <tag-form :value="current" @success="handleFormCompleted" />
    </el-dialog>
  </div>
</template>

<script>
import TagForm from '~/pages/tags/form'

export default {
  components: { TagForm },
  data() {
    return {
      loading: true,
      tagFormVisible: false,
      current: null,
      title: '',
      appBaseUri: this.$store.state.env.current.appBaseUri,
      query: {
        per_page: 15,
        page: 1,
        keyword: '',
        include: '',
        isPopular: '',
      },
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
  created() {
    const routerQueryData = this.$route.query
    if (routerQueryData) {
      const changeType = ['only_tapd', 'per_page', 'page', 'hidden_sample']
      Object.keys(routerQueryData).forEach((item) => {
        if (changeType.includes(item)) {
          return (this.query[item] = JSON.parse(routerQueryData[item]))
        }
        this.query[item] = routerQueryData[item]
      })
    }
  },
  async mounted() {
    await this.loadItems()
  },
  methods: {
    async loadItems(params) {
      this.items = await this.$axios.$get('/tags', {
        params: { ...this.query, ...params },
      })
      this.loading = false
    },
    handleCreate() {
      this.title = '新建标签'
      this.tagFormVisible = true
      this.current = null
    },
    handleEdit(tag) {
      this.title = '编辑标签'
      this.tagFormVisible = true
      this.current = tag
    },
    handleFormCompleted() {
      this.current = null
      this.tagFormVisible = false
      this.loadItems()
    },
    async handleSwitchPopular(tag) {
      await this.$axios.$post(`/tags/${tag.id}/popular`)
      await this.loadItems()
      this.$message.success({
        type: 'info',
        message: '已更新',
      })
    },
    handleDelete(tag) {
      this.$confirm(`确认要删除标签「${tag.name}」？`, '删除提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(async () => {
        await this.$axios.$delete(`/tags/${tag.id}`)
        await this.loadItems()
        this.$message.success({
          type: 'info',
          message: '已删除',
        })
      })
    },
  },
}
</script>
