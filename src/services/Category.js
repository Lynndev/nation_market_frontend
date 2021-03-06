import Server from './Server'

export default{
    storeCategory(category){
        const url = '/category/store'

        return Server.post_data(url,category)
    },
    updateCategory(payload){
        const url = '/category/update'

        return Server.post_data(url,payload)
    },
    deleteCategory(catId){
        const url = '/category/delete'

        return Server.post_data(url,catId)
    },
    getCategoriesByMainId(mainId){
        const params = {main_category_id:mainId}
        const url = 'category/get?'

        return Server.get_data(url,params)
    },
    getSubCategories(){
        const url = 'sub_category/get'

        return Server.get_data(url)
    }
}