import axios from 'axios'

import getUrl from './getUrl'
import nprogress from '@/utils/nprogress'

const env = process.env.NODE_ENV

const v1 = axios.create({
  baseURL: `${getUrl(env)}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

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

export default v1
