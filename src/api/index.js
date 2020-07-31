import axios from 'axios'
import { getCookie } from '../util/cookie'

import { MessageBox } from 'element-ui'

import env from '../../env.json'

const client = axios.create({
  baseURL: env.MATATAKIAPI,
  timeout: 1000 * 30,
  headers: {}
})

// Just copy from matataki-fe
client.interceptors.request.use(
  (config) => {
    if (getCookie('ACCESS_TOKEN')) {
      config.headers['x-access-token'] = getCookie('ACCESS_TOKEN')
    }
    return config
  },
  // eslint-disable-next-line arrow-body-style
  (error) => { return Promise.reject(error) }
)

client.interceptors.response.use(
  // eslint-disable-next-line arrow-body-style
  (response) => { return response.data },
  (error) => {
    // loadingInstance.close()
    console.log(error.message)

    if (error.message.includes('status code 401')) {
      MessageBox.alert({
        message: '登录状态异常,请重新登录',
        type: 'error'
      })
    }

    // 超时处理
    if (error.message.includes('timeout')) {
      // Message.closeAll()
      MessageBox.alert({
        message: '请求超时',
        type: 'error'
      })
    }
    if (error.message.includes('Network Error')) {
      MessageBox.alert({
        message: 'Network Error',
        type: 'error'
      })
    }
    // loadingInstance.close()
    return Promise.reject(error)
  }
)

export default client
