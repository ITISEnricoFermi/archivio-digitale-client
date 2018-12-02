import axios from 'axios'
import NProgress from 'vue-nprogress'

import getUrl from './getUrl'

const env = process.env.NODE_ENV

export const v1 = axios.create({
  baseURL: `${getUrl(env)}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

export const nprogress = new NProgress({ showSpinner: false, easing: 'ease', speed: 500 })

// before a request is made start the nprogress
v1.interceptors.request.use(config => {
  nprogress.start()
  return config
})

// before a response is returned stop nprogress
v1.interceptors.response.use(response => {
  nprogress.done()
  return response
})
