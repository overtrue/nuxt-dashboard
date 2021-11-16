<template>
  <div>
    <el-form ref="form" type="default" :error-location="true" :model="model" :rules="rules" label-position="top">
      <el-form-item label="标签的名字" prop="name">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="标签ID" prop="slug">
        <el-input v-model="model.slug" placeholder="eg. tag-name" />
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" plain @click="handleSubmit"> 提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      model: this.value || {},
      rules: {
        name: [{ required: true, message: '名称不能为空' }],
      },
    }
  },
  watch: {
    model: function () {
      if (this.value !== this.model) {
        this.$emit('input', this.model)
        this.$emit('change', this.model)
      }
    },
    value: function () {
      if (this.value === null) {
        this.model = {}
      } else {
        this.model = this.value
      }
    },
  },
  methods: {
    async handleSubmit() {
      await this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            if (this.model.id) {
              await this.$axios.patch(`/tags/${this.model.id}`, this.model)
              this.$message.success('已更新')
            } else {
              await this.$axios.post('/tags', this.model)
              this.$message.success('已创建')
            }
            this.model = {}
            this.$emit('success')
          } catch (error) {}
        }
      })
    },
  },
}
</script>
