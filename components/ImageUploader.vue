<template>
  <div class="image-uploader flex flex-col">
    <el-upload
      :action="action"
      :on-success="handleImageUploaded"
      :show-file-list="false"
      accept="image/png, image/jpeg, image/gif, image/bmp"
      :headers="{
        ...(node_env === 'development' ? { 'X-Acting-As': 'astrolv' } : {}),
      }"
      class="
        text-gray-400
        border border-dashed
        rounded-md
        flex-1 flex flex-col
        hover:bg-gray-200 hover:text-gray-600
        h-full
        w-full
      "
    >
      <div v-if="image" class="flex justify-center flex-1 relative">
        <el-image :src="imageUrl" class="flex-1" :fit="fit" />
        <div class="p-4 absolute bottom-0 mx-auto">
          <el-button class="" plain size="mini">重新选择</el-button>
        </div>
      </div>
      <div v-else class="p-8 text-center flex flex-col items-center justify-center flex-1">
        <i class="mdi mdi-image-plus text-4xl"></i>
        <div class="text-sm">将文件拖到此处，或点击上传</div>
        <div class="text-sm text-gray-400">只能上传 jpg/png 文件，且不超过500kb</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {
    value: [String, Object],
    strategy: String,
    fit: {
      type: String,
      default: 'contain',
    },
    mode: {
      type: String,
      default: 'url',
    },
  },
  data() {
    return {
      node_env: process.env.NODE_ENV,
      image: this.value,
    }
  },
  computed: {
    imageUrl() {
      return this.mode == 'object' ? this.image.url : this.image
    },
    action() {
      return this.$store.state.env.current.baseUri + 'files/upload?strategy=' + (this.strategy || 'image')
    },
  },
  watch: {
    image() {
      this.$emit('input', this.image)
      this.$emit('change', this.image)
      this.$emit('imageUploaded', this.image)
    },
    value() {
      if (this.value !== this.image) {
        this.image = this.value
      }
    },
  },
  methods: {
    handleImageUploaded(response) {
      this.image = this.mode == 'object' ? response : response.url
    },
  },
}
</script>

<style lang="scss">
.flex-col .el-upload {
  height: 100%;
  display: flex;
}
</style>
