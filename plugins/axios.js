import Vue from 'vue';

/* eslint-disable radix */
export default function ({ $axios, error, redirect }) {
  $axios.onRequest((config) => {
    if (process.env != null && process.env.NODE_ENV !== 'production') {
      console.log('Making request to ' + config.url)
    }
  })

  $axios.onResponse(() => { })

  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)

    if (code === 422) {
      Vue.prototype.$message.error(err.response.data.message)
    }

    return Promise.reject(err)
  })
}
