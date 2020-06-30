import Server from './Server'

export default{
    storeSubCategory(subCategory){
        const url = '/sub_category/store'

        return Server.post_data(url,subCategory)
    },
    updateSubCategory(payload){
        const url = '/sub_category/update'

        return Server.post_data(url,payload)
    },
    deleteSubCategory(subCatId){
        const url = '/sub_category/delete'

        return Server.post_data(url,subCatId)
    },
    getSubCategoriesByCatId(catId){
        const url = 'sub_category/get?'

        const params = {category_id:catId}

        return Server.get_data(url,params)
    }
}