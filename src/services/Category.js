import Server from './Server'

export default{
    storeCategory(category){
        const url = '/category/store'

        return Server.post_data(url,category)
    },
    getMainCategories(){
        const url  = '/main_category/get'

        return Server.get_data(url)
    },
    getCategories(){
        const url = 'category/get'

        return Server.get_data(url)
    },
    getCategoriesByMainId(mainId){
        const params = {main_category_id:mainId}
        const url = 'category/get/'

        return Server.get_data(url,params)
    },
    getSubCategories(){
        const url = 'sub_category/get'

        return Server.get_data(url)
    }
}