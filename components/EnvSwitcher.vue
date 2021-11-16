<template>
  <div class="px-2 py-4 cursor-pointer">
    <el-dropdown
      class="w-full"
      trigger="click"
      @command="handleChange"
      v-if="current"
    >
      <div class="rounded flex items-center px-4 py-3 bg-gray-900 w-full">
        <div class="mr-2 flex-1">
          <div class="font-bold leading-none text-gray-600">
            {{ current.name }}
          </div>
        </div>
        <i class="el-icon-caret-bottom" />
      </div>

      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(env, index) in envs"
            :key="index"
            :command="env"
            :index="index"
            class="py-4 px-3"
          >
            <div class="leading-normal py-2">
              <div class="font-bold">
                {{ env.name }}
              </div>
              <div class="text-xs text-gray-600">
                {{ env.appBaseUri }}
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: null,
      envs: this.$nuxt.$config.environments
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      this.envs.unshift({
        name: process.env.NAME,
        baseUri: process.env.BASE_URI,
        appBaseUri: process.env.APP_BASE_URI
      });
    }
    this.loadEnv();
  },
  methods: {
    handleChange(env) {
      this.setEnv(env);
    },
    setEnv(env) {
      this.current = env;
      this.$store.dispatch("env/setCurrent", env);
      window.location.reload();
    },
    loadEnv() {
      let { current } = this.$store.state.env;

      if (!current) {
        this.setEnv(this.envs[0]);
        current = this.envs[0];
      }

      this.$axios.defaults.baseURL = current.baseUri;
      this.$axios.defaults.appBaseUri = current.appBaseUri;

      this.envs.map(e => {
        if (e.baseUri === current.baseUri) {
          this.current = e;
        }
      });
    }
  }
};
</script>
