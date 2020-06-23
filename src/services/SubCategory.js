import Server from './Server'

export default{
    storeSubCategory(subCategory){
        const url = '/sub_category/store'

        return Server.post_data(url,subCategory)
    },
    getSubCategories(){
        const url = 'sub_category/get'

        return Server.get_data(url)
    },
    getSubCategoriesByCatId(catId){
        const url = 'sub_category/get'

        const params = {category_id:catId}

        return Server.get_data(url,params)
    }
}