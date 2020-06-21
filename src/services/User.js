import Server from './Server'

export default {
    login(payload){
        
        const url = '/admin/login'

        return Server.login(url,payload)
    },
    logout(){
        const url = '/admin/logout'

        return Server.logout(url)
    },
    getadminData(){
        const url ='/admin/get'

        return Server.get_data(url)
    },
    changePassword(payload){
        const url = '/admin/changePassword'

        return Server.post_data(url,payload)
    }
}