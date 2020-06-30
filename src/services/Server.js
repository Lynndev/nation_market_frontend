import axios from 'axios'
import NProgress from 'nprogress'

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

    //Config is the object of AxiosRequestConfig which contains URL, base URL, headers request, body data, response type, timeout, etc.
    return config
  })

apiClient.interceptors.response.use(config => {
    NProgress.done()
    return config
  })


export default {
    async post_data(url,payload,params){

        let completeUrl = `${url}`

        if(params){
            Object.keys(params).forEach((key) => {
                completeUrl = completeUrl + `?&${key}=${params[key]}`
            })
        }
        try{

            const response = await apiClient.post(completeUrl,payload)
            return response
        }catch(error){
            console.log("Error is",error);
        }
    },
    async login(url,payload){
        try{
            const response = await apiClient.post(url,payload)

            if(response.data.success == true){
                localStorage.setItem('token', response.data.data.token);
            }

            return response
        }catch(error){
            console.log("Error is",error);
        }
    },
    async logout(url){
        try{
            const response = await apiClient.post(url)
            return response
        }catch(error){
            console.log("Error is",error);
        }
    },
    async get_data(url,params) {
        
        let completeUrl = `${url}`
        
        if(params){

            Object.keys(params).forEach((key) => {
                completeUrl =  completeUrl + `&${key}=${params[key]}`
            })
        }
        try {

            const response = await apiClient.get(completeUrl)
            return response

        } catch (error) {
            console.log("error", error);
        }
    },
}
