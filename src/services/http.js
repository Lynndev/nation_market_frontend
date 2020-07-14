import axios from 'axios'
import NProgress from 'nprogress'
import store from './../store'

/*
    for local backend url
   const offline = 'http://localhost:8000/api/dashboard'

  */
    
  /*
    for online backend url
    
   */
  const online = ' http://nationmarket.82206954-6-20190910110805.webstarterz.com/api/dashboard/'

const apiClient = axios.create({
    baseURL:online
})

apiClient.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    store.commit('Loading/CHANGE_LOADING')
    //Config is the object of AxiosRequestConfig which contains URL, base URL, headers request, body data, response type, timeout, etc.
    return config
  })

apiClient.interceptors.response.use(config => {
    NProgress.done()
    store.commit('Loading/CHANGE_LOADING')
    return config
  })

export default apiClient