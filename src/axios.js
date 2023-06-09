import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'
// axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.baseURL = 'http://192.168.211.132:8081'

// 前置拦截
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  let res = response.data
  console.log('========')
  console.log(res)

  if (res.code === 200) {
    return response
  } else {
    Element.Message.error('错了哦，这是一条错误消息')
    return Promise.reject(response.data.msg)
  }
},
error => {
  if (error.response.data) {
    error.message = error.response.data.msg
  }

  if (error.response.status === 401) {
    store.commit('REMOVE_INFO')
    router.push('/login')
  }

  Element.Message.error(error.message)
  return Promise.reject(error)
}
)
