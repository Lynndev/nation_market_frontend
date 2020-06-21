import Server from './Server'

export default{
    getMainCategories(){
        const url  = '/main_category/get'

        return Server.get_data(url)
    },
}