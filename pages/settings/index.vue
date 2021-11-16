<template>
  <div>
    <div class="h-16 px-6 card flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-xl font-bold">
          <icon name="cogs" class="mr-2" />
          系统设置
        </h1>
      </div>
    </div>
    <div class="m-6 max-w-6xl mx-auto">
      <div class="mt-4 shadow bg-white rounded">
        <div class="px-6 py-4 bg-gray-100 border-b"><h2 class="font-semibold">SEO 设置</h2></div>
        <div class="p-6">
          <el-form label-position="top">
            <el-form-item label="标题" prop="title">
              <el-input v-model="seo.title" maxlength="80" placeholder="eg: 腾讯设计云" />
            </el-form-item>
            <el-form-item label="关键字" prop="keywords">
              <el-input v-model="seo.keywords" maxlength="120" placeholder="eg: 设计,学习..." />
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="seo.description"
                type="textarea"
                maxlength="300"
                placeholder="eg: 腾讯设计云是腾讯... ..."
              />
            </el-form-item>

            <el-button type="primary" plain @click="handleSaveSettings('seo')">保存</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seo: {
        title: '腾讯设计云',
      },
    }
  },
  async mounted() {
    await this.loadSettings()
  },
  methods: {
    async loadSettings() {
      this.seo = await this.$axios.$get('settings/seo').catch(() => this.seo)
    },

    async handleSaveSettings(key) {
      await this.$axios.patch(`settings/${key}`, this.$data[key])
      this.$message.success('已保存')
    },
  },
}
</script>
